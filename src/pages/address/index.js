import React, {Component, Fragment} from 'react';
import classNames from 'classnames';
import queryString from 'query-string';
import {
    getPegnetTransactionName,
    getPropertyLabel,
    getPegnetLabel,
    isPartialConversion,
    getOutputReplacementText,
} from 'utils/transactions';
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
import {requestJSONRPC} from 'api';
import Spinner from 'components/spinner';
import {mockPartialConversion} from 'mocks/mockTransactions';
import styles from './styles.css';

const columns = [
    `RECORDED (${currentTimezone()})`,
    'TRANSACTION ID',
    'AMOUNT (BALANCE CHANGE)',
    'TYPE',
];

export const buildJsonRPCData = address => {
    return [
        {
            method: 'get-pegnet-balances',
            params: {
                address,
            },
        },
    ];
};
export class AddressPage extends Component {
    state = {
        assetsBalances: [],
        transactions: [],
        selectedAsset: null,
        selectedTransactions: null,
        limit: 50,
        count: null,
        offset: null,
        assetApiResponse: null,
        showLoader: true,
    };

    componentWillMount() {
        this.getAssetsBalances();
    }

    componentDidMount() {
        this.getApiInfo();
    }

    // TODO: Refactor this method.
    getApiInfo = async selectedAsset => {
        try {
            // Handle Pagination offset
            const {page} = queryString.parse(this.props.location.search);
            const offset = page * this.state.limit - 50;
            const asset = getPropertyLabel(this.getAssetFromQueryParam());

            /**
             * Make Request to pegnetd API
             * If it returns a result key, the request was succesfully correct
             * otherwise, it will return an error key,
             * (when the asset doesn't have transactions, it will thrown an error)
             */
            const assetName = selectedAsset ? selectedAsset.alias : asset;
            const pegnetData = await requestJSONRPC('get-transactions', {
                address: this.getAddress(),
                asset: getPegnetLabel(assetName),
                offset,
                desc: true,
            });

            // TODO: remove this condition once HAR-1437 is complete
            if (CONFIG.debugPartialConversion) {
                pegnetData.result.actions.push(mockPartialConversion.jsonRPC[0].actions[0]);
            }

            const transactionsWithOutputs = this.setTransactionOutputs(pegnetData);
            if (!pegnetData.error) {
                this.getPaginationData(pegnetData.result.count, pegnetData.result.nextoffset);
                // transform transfer outputs to rows
                if (selectedAsset) {
                    // If this method is executed by a change on the Dropdown.
                    return this.setState({
                        selectedAsset,
                        assetApiResponse: pegnetData.result,
                        showLoader: false,
                        selectedTransactions: this.handleTransactionChange(
                            asset,
                            transactionsWithOutputs,
                        ),
                    });
                }
                return this.setState({
                    assetApiResponse: pegnetData.result,
                    showLoader: false,
                    selectedTransactions: this.handleTransactionChange(
                        asset,
                        transactionsWithOutputs,
                    ),
                    count: pegnetData.result.count,
                });
            }
            return this.setState({
                showLoader: false,
                selectedTransactions: this.handleTransactionChange(asset, []),
                count: 0,
                offset: 0,
            });
        } catch (error) {
            return this.setState({showLoader: false});
        }
    };

    getAddress = () => this.props.match.params.hash;

    getTransactionOutputData = transaction => {
        // If they're the same address, all the outputs will be negative and they're related to this address,
        // so, we don't need to filter them,
        if (transaction.fromaddress === this.getAddress()) {
            return transaction.outputs.map(output => {
                return {
                    ...transaction,
                    fromamount: output.amount,
                };
            });
        }
        // If they're different address, we need to filter the actual address to the address
        // that are from the outputs
        return transaction.outputs
            .filter(output => output.address === this.getAddress())
            .map(filteredOutput => {
                return {
                    ...transaction,
                    fromamount: filteredOutput.amount,
                };
            });
    };

    setTransactionOutputs = pegnetData => {
        if (!pegnetData.result) return pegnetData;
        const {actions} = pegnetData.result;
        let transactionOutputs = [];
        for (let i = 0; i < actions.length; i++) {
            // If it's transfer, get all the outputs
            if (actions[i].txaction === 1) {
                transactionOutputs = [
                    ...transactionOutputs,
                    ...this.getTransactionOutputData(actions[i]),
                ];
            } else {
                transactionOutputs = [...transactionOutputs, ...[actions[i]]];
            }
        }
        return transactionOutputs;
    };

    getAmount = ({txaction, fromamount, fromaddress, toamount, toasset, fromasset, outputs}) => {
        const transactionType = txaction;
        if (transactionType === TRANSACTIONS.TYPE.TRANSFER.NUMBER) {
            if (fromaddress === this.getAddress()) {
                return fromamount * -1;
            }
            return fromamount * 1;
        } else if (transactionType === TRANSACTIONS.TYPE.COINBASE.NUMBER) {
            return toamount;
        } else if (transactionType === TRANSACTIONS.TYPE.CONVERSION.NUMBER) {
            // Transaction failed
            if (!toamount) return 0;
            if (toasset === getPegnetLabel(this.state.selectedAsset.alias)) {
                return toamount;
            } else if (fromasset === getPegnetLabel(this.state.selectedAsset.alias)) {
                if (isPartialConversion(txaction, outputs)) {
                    return fromamount - outputs[0].amount;
                }
                return fromamount * -1;
            }
        }
        return toamount;
    }

    getPaginationData = (count, nextoffset) => {
        let offset = nextoffset;
        if (nextoffset !== 0) offset = nextoffset - 50;
        return this.setState({
            count,
            offset,
        });
    };

    getAssetFromQueryParam = () => {
        let {asset} = queryString.parse(this.props.location.search);
        if (!asset) asset = 'PEG';
        return asset;
    };

    getAssetsBalances = () => {
        const assetsBalancesAPI = this.props.data.jsonRPC[0];
        const asset = getPropertyLabel(this.getAssetFromQueryParam());
        const assets = [];
        Object.keys(assetsBalancesAPI).forEach(property => {
            const propertyLabel = getPropertyLabel(property);
            const balance = assetsBalancesAPI[property];
            const value = balance / TRANSACTIONS.FCT_CONVERSION;
            const assetInfo = {
                label: `${propertyLabel} - ${value}`,
                value: balance,
                alias: propertyLabel,
            };
            assets.push(assetInfo);
        });
        let filteredAssets = assets.sort((a, b) => a.label.localeCompare(b.label));
        filteredAssets = filteredAssets.sort((a, b) => b.value - a.value);
        this.setState({
            assetsBalances: filteredAssets,
            selectedAsset: assets.find(a => a.alias === asset),
        });
    };

    getTypeValue = ({txaction, fromasset, toasset}) => {
        const pegnetTransactionName = getPegnetTransactionName(txaction);
        if (pegnetTransactionName === TRANSACTIONS.TYPE.CONVERSION.NAME) {
            if (toasset !== getPegnetLabel(this.state.selectedAsset.alias)) {
                return (
                    <div>
                        {pegnetTransactionName} ({fromasset} {'-> '}
                        <a className={styles.link} onClick={() => this.goToAssetParam(toasset)}>
                            {getPropertyLabel(toasset)}
                        </a>
                        )
                    </div>
                );
            }
            return (
                <div>
                    {pegnetTransactionName}
                    {' ('}
                    <a className={styles.link} onClick={() => this.goToAssetParam(fromasset)}>
                        {getPropertyLabel(fromasset)}
                    </a>{' '}
                    {'→ '}
                    {toasset})
                </div>
            );
        } else if (pegnetTransactionName === TRANSACTIONS.TYPE.BURN.NAME) {
            return `${pegnetTransactionName} (${fromasset} -> ${toasset})`;
        }
        return pegnetTransactionName;
    };

    goToAssetParam = asset =>
        this.props.history.push(`${this.props.location.pathname}?asset=${asset}`);

    handleChangeSelectionDropdown = selectedAsset => this.goToAssetParam(selectedAsset.alias);

    handleTransactionChange = (asset, apiResponse) =>
        apiResponse.filter(
            transaction =>
                transaction.fromasset === getPegnetLabel(asset) ||
                transaction.toasset === getPegnetLabel(asset),
        );

    render() {
        const sortOpt = sortOptions('timestamp');
        const {
            assetsBalances,
            selectedAsset,
            selectedTransactions,
            limit,
            count,
            offset,
            showLoader,
        } = this.state;
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
                                            onOptionClick={this.handleChangeSelectionDropdown}
                                            selected={selectedAsset}
                                            className={styles.dropdown}
                                            headerClassName={classNames(
                                                styles.dropdownHeader,
                                                styles.formInput,
                                            )}
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
                                <Hash type='default'>{this.getAddress()}</Hash>
                            </Box>
                        </Vertical>
                    </Horizontal>
                </Container>
                {showLoader ? (
                    <Spinner />
                ) : (
                    <Sortable
                        items={selectedTransactions}
                        sortOptions={[
                            sortOpt.newestFirst,
                            sortOpt.oldestFirst,
                            {
                                label: 'Highest amount first',
                                func: (a, b) => this.getAmount(b) - this.getAmount(a),
                            },
                            {
                                label: 'Lowest amount first',
                                func: (a, b) => this.getAmount(a) - this.getAmount(b),
                            },
                        ]}>
                        {(items, sortDropdown) => (
                            <Container
                                title='Transactions'
                                subtitle='(involving this address)'
                                actions={sortDropdown}
                                count={count}>
                                <Table columns={columns} rows={items} ellipsis={1} type='secondary'>
                                    {(row, index) => (
                                        <tr
                                            key={index}
                                            className={classNames({
                                                [styles.noAvailable]: row.executed === -1,
                                            })}>
                                            <td>{formatDate(row.timestamp)}</td>
                                            <td>
                                                <Hash type='tx' key={row.txid}>
                                                    {row.txid}
                                                </Hash>
                                            </td>
                                            <td>
                                                <Amount
                                                    iconName='InfoOutlined'
                                                    displayIcon={
                                                        row.executed < 1 && row.txaction === 2
                                                    }
                                                    hoverText={
                                                        getOutputReplacementText(row.executed).tooltip
                                                    }
                                                    unit={selectedAsset.alias}>
                                                    {row.executed < 1 && row.txaction === 2
                                                        ? getOutputReplacementText(row.executed).message
                                                        : this.getAmount(row, index)}
                                                </Amount>
                                            </td>
                                            <td>{this.getTypeValue(row)}</td>
                                        </tr>
                                    )}
                                </Table>
                                <Pagination count={count} limit={limit} offset={offset} />
                            </Container>
                        )}
                    </Sortable>
                )}
            </Fragment>
        );
    }
}

export default dataLoader(({match}) => buildJsonRPCData(match.params.hash))(AddressPage);
