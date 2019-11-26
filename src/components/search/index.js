import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {autobind} from 'core-decorators';
import classNames from 'classnames';
// TODO (maybe?): set up Google Analytics for this search
// import {trackPageView} from 'utils/analytics';
import {REGEX} from 'constants/regex';
import {requestJSONRPC} from 'api';

import {
    isPrivateKey,
    isProbablyAKey,
    PRIVATE_KEY_PREFIX_EC,
    PUBLIC_KEY_PREFIX_EC,
    PUBLIC_KEY_PREFIX_FC,
} from 'utils/key';
import {TRANSACTIONS} from '../../constants/transactions';

import styles from './styles.css';

@withRouter
@autobind
export default class Search extends Component {
    state = {
        query: '',
        error: '',
        hasFocus: false,
        searching: false,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.key !== this.props.location.key) {
            this.setState({
                query: '',
                error: '',
                hasFocus: false,
                searching: false,
            });
        }
    }

    getHelpText() {
        if (this.state.searching) return 'Searching...';
        if (this.state.error) return this.state.error;
        return 'You can search by: Address or Transaction ID';
    }

    setInputRef(ref) {
        this.input = ref;
    }

    /**
     * Return an informative message when no results are found.
     * @param query
     * @returns {string}
     */
    getErrorMessage(query = '') {
        const errorMessage = 'No results found.';
        if (isPrivateKey(query)) {
            return `${errorMessage} If you're searching for an address, never expose your private
                key and try again with your public key beginning with
                ${query.startsWith(PRIVATE_KEY_PREFIX_EC) ?
                    PUBLIC_KEY_PREFIX_EC : PUBLIC_KEY_PREFIX_FC}.`;
        }
        if (isProbablyAKey(query)) {
            return `${errorMessage} It appears you might be searching for an address but have
                provided an invalid value, please check for typos.`;
        }
        return errorMessage;
    }

    async search() {
        const noPegnetResults = 'noPegnetResults';
        this.setState({searching: true});

        const query = this.state.query.trim();
        const state = {
            searching: false,
            error: '',
        };

        // TODO (maybe?): set up Google Analytics for this search
        // trackPageView(`/search?q=${query}`);

        try {
            const response = await this.searchPegnet(query);
            const targetPath = `/${response.parentRoute}/${query}` === this.props.location.pathname
                ? this.props.location.pathname
                : `/${response.parentRoute}/${query}`;
            if (response.error) {
                state.error = noPegnetResults;
                throw this.getErrorMessage();
            }
            this.props.history.push(targetPath);
        } catch (error) {
            if (!this.state.searching) return;
            if (state.error === noPegnetResults) {
                state.error = this.getErrorMessage();
            } else if (error.statusCode === 404) {
                state.error = this.getErrorMessage(this.state.query);
            } else {
                state.error = 'Internal server error, please try again';
            }
        }

        this.setState(state);
        if (state.error) {
            this.input.focus();
        }
    }

    async executeGetTransactions(query, type) {
        let parentRoute;
        const pegnetData = await requestJSONRPC('get-transactions', {
            [type]: query,
        });

        switch (type) {
            case 'address':
                parentRoute = TRANSACTIONS.PEGNET_PARENT_ROUTES.ADDRESSES;
                break;
            default:
                parentRoute = TRANSACTIONS.PEGNET_PARENT_ROUTES.TRANSACTIONS;
        }

        const pegnetDataWithRouting = Object.assign({},
            pegnetData,
            {query},
            {parentRoute},
        );

        return pegnetDataWithRouting;
    }

    async searchPegnet(query) {
        const splitQuery = query.includes('-') ? query.split('-')[1] : undefined;
        const requestArray = [
            await this.executeGetTransactions(query, 'address'),
        ];

        // if it's a valid sha-256, search for entryhash first, otherwise
        // skip this search, def not a transaction id
        if (
            // only validating part of TxId after the TxIndex
            splitQuery
            && REGEX.VALIDATE.SHA_256.test(splitQuery)
        ) {
            requestArray.unshift(await this.executeGetTransactions(query, 'txid'));
        }

        const searchResultResponse = await Promise.all(requestArray);
        // find the first instance of a response with a result
        const finalResult = searchResultResponse.find(pegnetResponse => {
            return !!pegnetResponse.result && this.isMatchingTransaction(pegnetResponse, query);
        });
        // if we didn't find a matching result, return the first item with
        // the error response
        return finalResult || searchResultResponse.find(pegnetResponse => !!pegnetResponse.error);
    }

    isMatchingTransaction = (pegnetResponse, query) => {
        if (pegnetResponse.parentRoute !== TRANSACTIONS.PEGNET_PARENT_ROUTES.TRANSACTIONS) {
            return true;
        }

        return pegnetResponse.result.actions[0].txid === query;
    }

    handleChange(event) {
        this.setState({
            query: event.target.value,
            error: '',
        });
    }

    handleKeyDown(event) {
        if (event.keyCode === 13) {
            this.search();
        }
    }

    handleFocus() {
        this.setState({hasFocus: true});
    }

    handleBlur() {
        this.setState({hasFocus: false});
    }

    render() {
        return (
            <div className={styles.root}>
                <div className={styles.input}>
                    <input
                        type='text'
                        placeholder='Search'
                        value={this.state.query}
                        disabled={this.state.searching}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        ref={this.setInputRef}
                    />
                    <div className={classNames(styles.help, {[styles.visible]: this.state.hasFocus})}>
                        {this.getHelpText()}
                    </div>
                </div>
            </div>
        );
    }
}
