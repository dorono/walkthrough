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

const addressTypes = {
    FA: 'Factoid Address',
    EC: 'Entry Credit Address',
};

const columns = [
    'TRANSACTION ID',
    'AMOUNT (BALANCE CHANGE)',
    `CREATED TIME (${currentTimezone()})`,
];

const buildJsonRPCData = (address) => {
    return {
        method: 'get-pegnet-balances',
        params: {
            address,
        },
    };
};

@dataLoader([({match}) => `/addresses/${match.params.hash}`, ({match}) => buildJsonRPCData(match.params.hash)])
export default class Address extends Component {
    state = {
        selected: '',
        assetsBalances: [],
    };

    componentWillMount() {
        this.getAssetsBalances();
    }

    getAmountKey() {
        return this.props.data.type === 'FA' ? 'fct_amount' : 'ec_amount';
    }

    getAmountUnit() {
        return this.props.data.type === 'FA' ? 'FCT' : 'EC';
    }

    getAmount(row) {
        return row[this.getAmountKey()] * (row.type === 'output' ? 1 : -1);
    }

    handleChangeSelection() {
        return null;
    }

    getAssetsBalances = () => {
        console.log("wtfff")
        const assets = [];
        for (let property in this.props.data.jsonRPC) {
            const asset = {
                name: property,
                balance: this.props.data.jsonRPC[property],
            };
            assets.push(asset);
        }
        this.setState({assetsBalances: assets});
    }

    render() {
        const amountKey = this.getAmountKey();
        console.log(this.state.assetsBalances);
        return (
            <div>
                <Container primary title='Address'>
                    <Horizontal>
                        <Vertical>
                            <Box type='outline'>
                                <Vertical>
                                    <div>
                                        <Label>Type</Label>
                                        {
                                            /**<Dropdown
                                            options={data}
                                            onOptionClick={this.handleChangeSelection}
                                            selected={this.state.selected}
                                            arrowColor='white'
                                        /> */
                                        }
                                    </div>
                                    <div>
                                        <Label>Balance</Label>
                                        <Amount unit={this.getAmountUnit()}>{this.props.data.balance}</Amount>
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
                    items={this.props.data.transactions}
                    sortOptions={[
                        sortOptions.newestFirst,
                        sortOptions.oldestFirst,
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
                                                key={row.tx_id}>
                                                {row.tx_id}
                                            </Hash>
                                        </td>
                                        <td><Amount unit={this.getAmountUnit()}>{this.getAmount(row)}</Amount></td>
                                        <td>{formatDate(row.created_at)}</td>
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
