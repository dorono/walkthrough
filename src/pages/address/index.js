import React, {Component} from 'react';
import {dataLoader} from 'hocs/data-loader';
import {currentTimezone, formatDate} from 'utils/date';
import Container from 'components/container';
import Sortable, {sortOptions} from 'components/sortable';
import {Horizontal, Vertical, Box} from 'components/layout';
import Table from 'components/table';
import Label from 'components/label';
import Hash from 'components/hash';
import Dropdown from 'components/dropdown';
import Amount from 'components/amount';
import globalStyles from 'styles/index.css';
import classNames from 'classnames';
import styles from './styles.css';
import {TRANSACTIONS} from 'constants/transactions';

/* const addressTypes = {
    FA: 'Factoid Address',
    EC: 'Entry Credit Address',
}; */

const columns = [
    'TRANSACTION ID',
    'AMOUNT (BALANCE CHANGE)',
    `CREATED TIME (${currentTimezone()})`,
    'TYPE',
];

const buildJsonRPCData = (address) => {
    return [
        {
            method: 'get-pegnet-balances',
            params: {
                address,
            },
        },
        {
            method: 'get-transactions',
            params: {
                address,
            },
        },
    ];
};
//TODO: Prevent rerender

@dataLoader([({match}) => `/addresses/${match.params.hash}`, ({match}) => buildJsonRPCData(match.params.hash)])
export default class Address extends Component {
    state = {
        assetsBalances: [],
        transactions: [],
        selectedAsset: null,
        selectedTransaction: null,
    };

    componentWillMount() {
        this.getAssetsBalances();
    }

    handleChangeSelection = option => {
        this.setState({
            selectedAsset: option,
            selectedTransaction: this.handleTransactionChange(option.alias),
        });
    }

    getAmountKey() {
        return this.state.selectedAsset.alias;
    }

    getAmountUnit() {
        return this.state.selectedAsset.alias;
    }

    getAmount(row) {
        const transactionType = row.txaction;
        // IF it's transfer, always fromamount would be an discount
        if(transactionType === TRANSACTIONS.TYPE.TRANSFER) {
            return row.fromamount * (-1);
        } else if(transactionType === TRANSACTIONS.TYPE.COINBASE) {
            return row.toamount * (1);
        } else if(transactionType === TRANSACTIONS.TYPE.CONVERSION) {
            if(row.toasset === this.state.selectedAsset.alias) {
                return row.toamount * (1);
            } else if(row.fromasset === this.state.selectedAsset.alias) {
                return row.fromamount * (-1);
            }
        } else {
            return row.toamount * (1);
        }
    }

    getTransactionName(row) {
        const transactionType = row.txaction;
        if(transactionType === TRANSACTIONS.TYPE.TRANSFER) {
            return 'Transfer';
        } else if(transactionType === TRANSACTIONS.TYPE.COINBASE) {
            return 'Coinbase';
        } else if(transactionType === TRANSACTIONS.TYPE.CONVERSION) {
            return 'Conversion';
        } else {
            return 'Burn';
        }
    }

    getAssetsBalances = () => {
        const assetsBalancesAPI = this.props.data.jsonRPC[0];
        const assets = [];
        for (const property in assetsBalancesAPI) {
            const balance = assetsBalancesAPI[property];
            const asset = {
                label: `${property} - ${balance}`,
                value: balance,
                alias: property,
            };
            assets.push(asset);
        }
        const filteredAssets = assets.sort((a, b) => b.value - a.value);
        this.setState({
            assetsBalances: filteredAssets,
            selectedAsset: assets.find(asset => asset.label.substring(0, 3) === 'PEG'),
            selectedTransaction: this.handleTransactionChange('PEG'),
        });
    }

    handleTransactionChange = (asset) => {
        const transactionsAPI = this.props.data.jsonRPC[1];
        return transactionsAPI.actions.filter(transaction => (transaction.txaction === 1 || transaction.txaction === 3 || transaction.txaction === 2) && transaction.fromasset === asset || transaction.toasset === asset);
    };

    render() {
        const amountKey = this.getAmountKey();
        const sortOpt = sortOptions('timestamp');
        const {assetsBalances, selectedAsset, selectedTransaction} = this.state;
        return (
            <div>
                <Container primary title='Address'>
                    <Horizontal>
                        <Vertical>
                            <Box type='outline'>
                                <Vertical>
                                    <div>
                                        <Label>Type</Label>
                                        <Dropdown
                                            options={assetsBalances}
                                            onOptionClick={this.handleChangeSelection}
                                            selected={selectedAsset}
                                            className={styles.dropdown}
                                            headerClassName={classNames(styles.dropdownHeader, styles.formInput)}
                                            optionsClassName={styles.dropdownOptions}
                                            selectedClassName={globalStyles.selectedOption}
                                            arrowColor='blue'
                                            optionsAlias
                                        />
                                    </div>
                                    <div>
                                        <Label>Balance</Label>
                                        <Amount>{selectedAsset.value}</Amount>
                                    </div>
                                </Vertical>
                            </Box>
                        </Vertical>
                        <Vertical>
                            <Box type='outline'>
                                <Label>Address</Label>
                                <Hash type='address'>{this.props.data.user_address}</Hash>
                            </Box>
                        </Vertical>
                    </Horizontal>
                </Container>
                <Sortable
                    items={selectedTransaction}
                    sortOptions={[
                        sortOpt.newestFirst,
                        sortOpt.oldestFirst,
                        {label: 'Highest amount first', func: (a, b) => b[amountKey] - a[amountKey]},
                        {label: 'Lowest amount first', func: (a, b) => a[amountKey] - b[amountKey]},
                    ]}>
                    {(items, sortDropdown) => (
                        <Container
                            title='Transactions'
                            subtitle='(involving this address)'
                            count={items.length}
                            actions={sortDropdown}>
                            <Table
                                columns={columns}
                                rows={items}
                                ellipsis={0}
                                type='secondary'>
                                {(row, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Hash
                                                type='tx'
                                                key={row.txid}>
                                                {row.txid}
                                            </Hash>
                                        </td>
                                        <td><Amount unit={this.getAmountUnit()}>{this.getAmount(row)}</Amount></td>
                                        <td>{formatDate(row.timestamp)}</td>
                                        <td>{this.getTransactionName(row)}</td>
                                    </tr>
                                )}
                            </Table>
                        </Container>
                    )}
                </Sortable>
            </div>
        );
    }
}
