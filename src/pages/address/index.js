import React, {Component} from 'react';
import {load} from 'decorators';
import {currentTimezone, formatDate} from 'utils/date';
import Container from 'components/container';
import {Horizontal, Vertical, Box} from 'components/layout';
import Table from 'components/table';
import Label from 'components/label';
import Hash from 'components/hash';
import Monospaced from 'components/monospaced';

@load('/data/address.json')
export default class Address extends Component {
    render() {
        return (
            <div>
                <Container primary title='Address'>
                    <Horizontal>
                        <Vertical>
                            <Box style='outline'>
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
                            <Box style='outline'>
                                <Label>HASH</Label>
                                <Hash type='address'>{this.props.data.address}</Hash>
                            </Box>
                        </Vertical>
                    </Horizontal>
                </Container>
                <Container
                    title='Transactions'
                    subtitle='(involving this address)'
                    count={this.props.data.transactions.length}>
                    <Table
                        columns={['TRANSACTION ID', 'AMOUNT (BALANCE CHANGE)', `CREATED TIME (${currentTimezone()})`]}
                        rows={this.props.data.transactions}
                        ellipsis={0}
                        style='secondary'>
                        {row => (
                            <tr key={row.tx_id}>
                                <td><Hash type='tx'>{row.tx_id}</Hash></td>
                                <td><Monospaced>{row.amount}</Monospaced></td>
                                <td>{formatDate(row.created_at)}</td>
                            </tr>
                        )}
                    </Table>
                </Container>
            </div>
        );
    }
}
