import React, {Component} from 'react';
import {load} from 'decorators';
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

@load(({match}) => `/addresses/${match.params.hash}`)
export default class Address extends Component {
    getAmountKey() {
        return this.props.data.type === 'FA' ? 'amount' : 'ec_amount';
    }

    getAmountUnit() {
        return this.props.data.type === 'FA' ? 'FCT' : 'EC';
    }

    getAmount(row) {
        return row[this.getAmountKey()] * (row.type === 'output' ? -1 : 1);
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
                                columns={[
                                    'TRANSACTION ID',
                                    'AMOUNT (BALANCE CHANGE)',
                                    `CREATED TIME (${currentTimezone()})`,
                                ]}
                                rows={items}
                                ellipsis={0}
                                type='secondary'>
                                {row => (
                                    <tr key={row.tx_id}>
                                        <td><Hash type='tx'>{row.tx_id}</Hash></td>
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
