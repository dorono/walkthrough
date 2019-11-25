import React, {Component, Fragment} from 'react';
import classNames from 'classnames';
import queryString from 'query-string';
import {getPegnetTransactionName, getPropertyLabel, getPegnetLabel} from 'utils/transactions';
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
import styles from './styles.css';

const columns = [
    'TRANSACTION ID',
    'AMOUNT (BALANCE CHANGE)',
    `CREATED TIME (${currentTimezone()})`,
    'TYPE',
];

const FCT_CONVERSION = 100000000;

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
        selectedTransaction: null,
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
            const asset = this.getAssetFromQueryParam();

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
            });
            if (!pegnetData.error) {
                this.getPaginationData(pegnetData.result.count, pegnetData.result.nextoffset);
                if (selectedAsset) {
                    // If this method is executed by a change on the Dropdown.
                    return this.setState({
                        selectedAsset,
                        assetApiResponse: pegnetData.result,
                        showLoader: false,
                        selectedTransaction: this.handleTransactionChange(
                            asset,
                            pegnetData.result.actions,
                        ),
                    });
                }
                return this.setState({
                    assetApiResponse: pegnetData.result,
                    showLoader: false,
                    selectedTransaction: this.handleTransactionChange(
                        asset,
                        pegnetData.result.actions,
                    ),
                    count: pegnetData.result.count,
                });
            }
            return this.setState({
                showLoader: false,
                selectedTransaction: this.handleTransactionChange(asset, []),
                count: 0,
                offset: 0,
            });
        } catch (error) {
            return this.setState({showLoader: false});
        }
    };

    getAddress = () => this.props.match.params.hash;

    getAmount = row => {
        const transactionType = row.txaction;
        if (transactionType === TRANSACTIONS.TYPE.TRANSFER.NUMBER) {
            if (row.fromaddress === this.getAddress()) {
                return row.fromamount * -1;
            }
            return row.fromamount * 1;
        } else if (transactionType === TRANSACTIONS.TYPE.COINBASE.NUMBER) {
            return row.toamount;
        } else if (transactionType === TRANSACTIONS.TYPE.CONVERSION.NUMBER) {
            // Transaction failed
            if (!row.toamount) return 0;
            if (row.toasset === getPegnetLabel(this.state.selectedAsset.alias)) {
                return row.toamount;
            } else if (row.fromasset === getPegnetLabel(this.state.selectedAsset.alias)) {
                return row.fromamount * -1;
            }
        }
        return row.toamount;
    };

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
        const asset = this.getAssetFromQueryParam();
        const assets = [];
        Object.keys(assetsBalancesAPI).forEach(property => {
            const propertyLabel = getPropertyLabel(property);
            const balance = assetsBalancesAPI[property];
            const value = balance / FCT_CONVERSION;
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

    handleChangeSelection = selectedAsset =>
        this.props.history.push(`${this.props.location.pathname}?asset=${selectedAsset.alias}`);

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
            selectedTransaction,
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
                                            onOptionClick={this.handleChangeSelection}
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
                                <Hash type='address'>{this.getAddress()}</Hash>
                            </Box>
                        </Vertical>
                    </Horizontal>
                </Container>
                {showLoader ? (
                    <Spinner />
                ) : (
                    <Sortable
                        items={selectedTransaction}
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
                                count={items.length}
                                actions={sortDropdown}>
                                <Table columns={columns} rows={items} ellipsis={0} type='secondary'>
                                    {(row, index) => (
                                        <tr key={index}>
                                            <td>
                                                <Hash type='tx' key={row.txid}>
                                                    {row.txid}
                                                </Hash>
                                            </td>
                                            <td>
                                                <Amount unit={selectedAsset.alias}>
                                                    {this.getAmount(row)}
                                                </Amount>
                                            </td>
                                            <td>{formatDate(row.timestamp)}</td>
                                            <td>{getPegnetTransactionName(row.txaction)}</td>
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
