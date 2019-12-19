import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {autobind} from 'core-decorators';
import classNames from 'classnames';
import {
    isValidPrivateAddress,
    isValidPrivateEcAddress,
    isValidPrivateFctAddress,
} from 'factom/dist/factom-struct';
// TODO (maybe?): set up Google Analytics for this search
// import {trackPageView} from 'utils/analytics';
import {REGEX} from 'constants/regex';
import {requestJSONRPC} from 'api';
import {
    isKey,
    isProbablyAKey,
    PRIVATE_KEY_PREFIX_EC,
    PUBLIC_KEY_PREFIX_EC,
    PUBLIC_KEY_PREFIX_FC,
} from 'utils/key';
import {SEARCH} from 'constants/search';
import {ADDRESSES} from 'constants/addresses';
import {TRANSACTIONS} from 'constants/transactions';

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

    getHelpText = () => {
        if (this.state.searching) return 'Searching...';
        if (this.state.error) return this.state.error;
        return 'You can search by: Address or Transaction ID';
    }

    setInputRef = (ref) => {
        this.input = ref;
    }

    /**
     * Return an informative message when no results are found.
     * @param query
     * @returns {string}
     */
    getErrorMessage = (errorType, query) => {
        const errorMessage = SEARCH.ERROR_MESSAGES.NO_RESULTS_FOUND;
        switch (errorType) {
            case ADDRESSES.IS_PRIVATE_KEY:
                return `${errorMessage} ${SEARCH.ERROR_MESSAGES.IS_PRIVATE_KEY}
                ${
                    query.startsWith(PRIVATE_KEY_PREFIX_EC)
                        ? PUBLIC_KEY_PREFIX_EC
                        : PUBLIC_KEY_PREFIX_FC
                }.`;
            case ADDRESSES.IS_PROBABLY_A_KEY:
                return `${errorMessage} ${SEARCH.ERROR_MESSAGES.IS_PROBABLY_A_KEY}`;
            case ADDRESSES.IS_KEY:
                return `${errorMessage} ${SEARCH.ERROR_MESSAGES.IS_KEY}`;
            default:
                return errorMessage;
        }
    };

    isPrivateAddress = (query = '', updatedState) => {
        if (
            isValidPrivateAddress(query) ||
            isValidPrivateEcAddress(query) ||
            isValidPrivateFctAddress(query)
        ) {
            updatedState.errorStatus = ADDRESSES.IS_PRIVATE_KEY;
            return true;
        } else if (isProbablyAKey(query)) {
            updatedState.errorStatus = ADDRESSES.IS_PROBABLY_A_KEY;
            return true;
        }

        return false;
    };

    async search() {
        const noPegnetResults = SEARCH.ERROR_MESSAGES.NO_RESULTS_FOUND;
        this.setState({searching: true});

        const query = this.state.query.trim();
        const updatedState = {
            searching: false,
            error: '',
            errorStatus: false,
        };

        // TODO (maybe?): set up Google Analytics for this search
        // trackPageView(`/search?q=${query}`);

        // don't even try to hit the API if it's a private key
        if (!this.isPrivateAddress(query, updatedState)) {
            try {
                const response = await this.searchPegnet(query);
                const targetPath =
                    `/${response.parentRoute}/${query}` === this.props.location.pathname
                        ? this.props.location.pathname
                        : `/${response.parentRoute}/${query}`;
                if (response.error) {
                    updatedState.error = noPegnetResults;
                    throw this.getErrorMessage();
                }
                this.props.history.push(targetPath);
            } catch (error) {
                if (!this.state.searching) return;
                if (updatedState.error === noPegnetResults) {
                    updatedState.error = this.getErrorMessage();
                } else if (error.statusCode === 404) {
                    if (isKey(this.state.query)) {
                        updatedState.error = this.getErrorMessage(ADDRESSES.IS_KEY, query);
                    } else {
                        updatedState.error = this.getErrorMessage();
                    }
                } else {
                    updatedState.error = SEARCH.ERROR_MESSAGES.NO_RESULTS_FOUND;
                }
            }
        // handle the particular private key errors
        } else {
            updatedState.error = this.getErrorMessage(updatedState.errorStatus, query);
        }

        this.setState(updatedState);
        if (updatedState.error) {
            this.input.focus();
        }
    }

    async executeGetTransactions(query, type) {
        let parentRoute;
        const pegnetData = await requestJSONRPC('get-transactions', {
            // if searching transactions, convert query to lower case
            [type]: type === SEARCH.SEARCH_KEYS.TXID ? query.toLowerCase() : query,
        });

        switch (type) {
            case SEARCH.SEARCH_KEYS.ADDRESS:
                parentRoute = TRANSACTIONS.PEGNET_PARENT_ROUTES.ADDRESSES;
                break;
            default:
                parentRoute = TRANSACTIONS.PEGNET_PARENT_ROUTES.TRANSACTIONS;
        }

        // return a combination of api response + other data needed for determining
        // which API call to make
        return Object.assign({}, pegnetData, {query}, {parentRoute});
    }

    async searchPegnet(query) {
        const splitQuery = query.includes('-') ? query.split('-')[1] : undefined;
        // create an array of searches starting with an address search
        const requestArray = [await this.executeGetTransactions(query, SEARCH.SEARCH_KEYS.ADDRESS)];

        // if it's a valid sha-256, search for entryhash first, otherwise
        // skip this search, def not a transaction id
        if (
            // only validating part of TxId after the TxIndex
            splitQuery &&
            REGEX.VALIDATE.SHA_256.test(splitQuery.toLowerCase())
        ) {
            // since it's a valid sha-256, make this the first search we do
            requestArray.unshift(
                await this.executeGetTransactions(query.toLowerCase(), SEARCH.SEARCH_KEYS.TXID),
            );
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

        return pegnetResponse.result.actions[0].txid === query.toLowerCase();
    };

    handleChange = (event) => {
        this.setState({
            query: event.target.value,
            error: '',
        });
    }

    handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            this.search();
        }
    }

    handleFocus = () => {
        this.setState({hasFocus: true});
    }

    handleBlur = () => {
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
                    <div
                        className={classNames(styles.help, {
                            [styles.visible]: this.state.hasFocus,
                        })}>
                        {this.getHelpText()}
                    </div>
                </div>
            </div>
        );
    }
}
