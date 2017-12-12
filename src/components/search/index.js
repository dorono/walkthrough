import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {autobind} from 'core-decorators';
import classNames from 'classnames';
import {trackPageView} from 'analytics';
import {request} from 'api';
import {reverse} from 'routes';
import styles from './styles.css';

const urls = {
    directory_block: data => reverse('dblock', {hash: data.keymr}),
    admin_block: data => reverse('ablock', {hash: data.keymr}),
    entry_credit_block: data => reverse('ecblock', {hash: data.keymr}),
    factoid_block: data => reverse('fblock', {hash: data.keymr}),
    entry_block: data => reverse('eblock', {hash: data.keymr}),
    transaction: data => reverse('tx', {hash: data.tx_id}),
    address: data => reverse('address', {hash: data.user_address}),
    chain: data => reverse('chain', {hash: data.chain_id}),
    entry: data => reverse('entry', {hash: data.entry_hash, chain: data.chain.chain_id}),
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
            const response = await request(`/search?stages=factom,bitcoin&term=${query}`);
            if (!this.state.searching) return;
            const url = urls[response.type](response.data);
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
