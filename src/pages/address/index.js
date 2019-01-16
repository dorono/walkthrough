import React, {Component} from 'react';
import {dataLoader} from 'hocs/data-loader';
import {currentTimezone, formatDate} from 'utils/date';
import Container from 'components/container';
import Sortable, {sortOptions} from 'components/sortable';
import {Horizontal, Vertical, Box} from 'components/layout';
import Table from 'components/table';
import Label from 'components/label';
import Hash from 'components/hash';
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

@dataLoader(({match}) => `/addresses/${match.params.hash}`)
export default class Address extends Component {
    getAmountKey() {
        return this.props.data.type === 'FA' ? 'fct_amount' : 'ec_amount';
    }

    getAmountUnit() {
        return this.props.data.type === 'FA' ? 'FCT' : 'EC';
    }

    getAmount(row) {
        return row[this.getAmountKey()] * (row.type === 'output' ? 1 : -1);
    }

    render() {
        const amountKey = this.getAmountKey();
        return (
            <div>
                <Container primary title='Address'>
                    <Horizontal>
                        <Vertical>
                            <Box type='outline'>
                                <Vertical>
                                    <div>
                                        <Label>Type</Label>
                                        {addressTypes[this.props.data.type]}
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
