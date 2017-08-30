import React, {Component} from 'react';
import {load} from 'decorators';
import {currentTimezone, formatDate} from 'utils/date';
import Container from 'components/container';
import Sortable from 'components/sortable';
import {Horizontal, Vertical, Box} from 'components/layout';
import Table from 'components/table';
import Label from 'components/label';
import Hash from 'components/hash';
import Monospaced from 'components/monospaced';

@load(({match}) => `/addresses/${match.params.hash}`)
export default class Address extends Component {
    render() {
        return (
            <div>
                <Container primary title='Address'>
                    <Horizontal>
                        <Vertical>
                            <Box type='outline'>
                                <Vertical>
                                    <div>
                                        <Label>Type</Label>
                                        {this.props.data.type}
                                    </div>
                                    <div>
                                        <Label>Balance</Label>
                                        <Monospaced>{this.props.data.balance}</Monospaced>
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
                        {label: 'Newest first', func: (a, b) => b.created_at.localeCompare(a.created_at)},
                        {label: 'Oldest first', func: (a, b) => a.created_at.localeCompare(b.created_at)},
                        {label: 'Highest amount first', func: (a, b) => b.amount - a.amount},
                        {label: 'Lowest amount first', func: (a, b) => a.amount - b.amount},
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
                                        <td><Monospaced>{row.amount}</Monospaced></td>
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
