import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {autobind} from 'core-decorators';
import classNames from 'classnames';
import {trackPageView} from 'analytics';
import {request} from 'api';
import {reverse} from 'routes';
import styles from './styles.css';

const reverseInfo = {
    directory_block: {urlName: 'dblock', paramNames: {hash: 'keymr'}},
    admin_block: {urlName: 'ablock', paramNames: {hash: 'keymr'}},
    entry_credit_block: {urlName: 'ecblock', paramNames: {hash: 'keymr'}},
    factoid_block: {urlName: 'fblock', paramNames: {hash: 'hash'}},
    entry_block: {urlName: 'eblock', paramNames: {hash: 'keymr'}},
    transaction: {urlName: 'tx', paramNames: {hash: 'tx_id'}},
    address: {urlName: 'address', paramNames: {hash: 'user_address'}},
    chain: {urlName: 'chain', paramNames: {hash: 'chain_id'}},
    entry: {urlName: 'entry', paramNames: {hash: 'hash', chain: 'chain_id'}},
};

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
        return 'You can search by: Block Height, Hash, KeyMR, Chain ID, Transaction ID, or Address';
    }

    setInputRef(ref) {
        this.input = ref;
    }

    async search() {
        this.setState({searching: true});

        const query = this.state.query.trim();
        const state = {
            searching: false,
            error: '',
        };

        trackPageView(`/search?q=${query}`);

        try {
            const response = await request(`/search?term=${query}`);
            if (!this.state.searching) return;
            const {urlName, paramNames} = reverseInfo[response.type];
            const params = {};
            Object.entries(paramNames).forEach(([name, responseKey]) => params[name] = response.data[responseKey]);
            const url = reverse(urlName, params);
            this.props.history.push(url);
        } catch (error) {
            if (!this.state.searching) return;
            if (error.statusCode === 404) {
                state.error = 'No results found';
                if (this.state.query.length < 64) state.error += ', maybe try with the full hash';
            } else {
                state.error = 'Internal server error, please try again';
            }
        }

        this.setState(state);
        if (state.error) this.input.focus();
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
