import React, {Component, Fragment} from 'react';
import classNames from 'classnames';
import {dataLoader} from 'hocs/data-loader';
import {currentTimezone, formatDate} from 'utils/date';
import Container from 'components/container';
import Sortable, {sortOptions} from 'components/sortable';
import {Horizontal, Vertical, Box} from 'components/layout';
import Table from 'components/table';
import Label from 'components/label';
import Hash from 'components/hash';
import Dropdown from 'components/dropdown';
import Pagination from 'components/pagination';
import Amount from 'components/amount';
import globalStyles from 'styles/index.css';
import {TRANSACTIONS} from 'constants/transactions';
import styles from './styles.css';

const columns = [
    'TRANSACTION ID',
    'AMOUNT (BALANCE CHANGE)',
    `CREATED TIME (${currentTimezone()})`,
    'TYPE',
];

const FCT_CONVERSION = 100000000;

const buildJsonRPCData = address => {
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
            pagination: true,
            location: location.search,
        },
    ];
};
@dataLoader(({match}) => buildJsonRPCData(match.params.hash))
export default class Address extends Component {
    state = {
        assetsBalances: [],
        transactions: [],
        selectedAsset: null,
        selectedTransaction: null,
        limit: null,
        count: null,
        offset: null,
    };

    componentWillMount() {
        this.getAssetsBalances();
        this.getPaginationData();
    }

    getAmountKey = () => this.state.selectedAsset.alias;

    getAddress = () => this.props.match.params.hash;

    getAmount = row => {
        const transactionType = row.txaction;
        if (transactionType === TRANSACTIONS.TYPE.TRANSFER ||
            (transactionType === TRANSACTIONS.TYPE.CONVERSION &&
            row.fromasset === this.state.selectedAsset.alias)) {
            return row.fromamount * (-1);
        }
        return row.fromamount;
    }

    getTransactionName = row => {
        const transactionType = row.txaction;
        if (transactionType === TRANSACTIONS.TYPE.TRANSFER) {
            return 'Transfer';
        } else if (transactionType === TRANSACTIONS.TYPE.COINBASE) {
            return 'Coinbase';
        } else if (transactionType === TRANSACTIONS.TYPE.CONVERSION) {
            return 'Conversion';
        }
        return 'Burn';
    }

    getPaginationData = () => {
        const transactionsAPI = this.props.data.jsonRPC[1];
        const {count, nextoffset} = transactionsAPI;
        let offset = nextoffset;
        if (nextoffset !== 0) offset = nextoffset - 50;
        return this.setState({
            count,
            limit: 50,
            offset,
        });
    }

    getAssetsBalances = () => {
        const assetsBalancesAPI = this.props.data.jsonRPC[0];
        const assets = [];
        Object.keys(assetsBalancesAPI).forEach(property => {
            const balance = assetsBalancesAPI[property];
            const value = balance / FCT_CONVERSION;
            const asset = {
                label: `${property} - ${value}`,
                value: balance,
                alias: property,
            };
            assets.push(asset);
        });
        let filteredAssets = assets.sort((a, b) => a.label.localeCompare(b.label));
        filteredAssets = filteredAssets.sort((a, b) => b.value - a.value);
        this.setState({
            assetsBalances: filteredAssets,
            selectedAsset: assets.find(asset => asset.label.substring(0, 3) === 'PEG'),
            selectedTransaction: this.handleTransactionChange('PEG'),
        });
    }

    handleChangeSelection = selectedAsset =>
        this.setState({
            selectedAsset,
            selectedTransaction: this.handleTransactionChange(selectedAsset.alias),
        });

    handleTransactionChange = asset => {
        const transactionsAPI = this.props.data.jsonRPC[1];
        return transactionsAPI.actions.filter(transaction =>
            transaction.fromasset === asset || transaction.toasset === asset);
    };

    render() {
        const amountKey = this.getAmountKey();
        const sortOpt = sortOptions('timestamp');
        const {assetsBalances, selectedAsset, selectedTransaction, limit, count, offset} = this.state;
        return (
            <Fragment>
                <Container primary title='Address'>
                    <Horizontal>
                        <Vertical>
                            <Box type='outline'>
                                <Vertical>
                                    <div>
                                        <Label>Asset</Label>
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
                                <Hash type='address'>{this.getAddress()}</Hash>
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
                                        <td><Amount unit={this.getAmountKey()}>{this.getAmount(row)}</Amount></td>
                                        <td>{formatDate(row.timestamp)}</td>
                                        <td>{this.getTransactionName(row)}</td>
                                    </tr>
                                )}
                            </Table>
                            <Pagination count={count} limit={limit} offset={offset} />
                        </Container>
                    )}
                </Sortable>
            </Fragment>
        );
    }
}
