import React, {Component} from 'react';
import {load} from 'decorators';
import {currentTimezone, formatDateLong} from 'utils/date';
import Container from 'components/container';
import {Horizontal, Vertical, Box} from 'components/layout';
import Table from 'components/table';
import Label from 'components/label';
import Hash from 'components/hash';
import Monospaced from 'components/monospaced';

@load('/data/tx.json')
export default class Transaction extends Component {
    renderTransactions(title, transactions) {
        return (
            <Container
                title={title}
                subtitle='(included in this transaction)'
                count={transactions.length}>
                <Table
                    columns={['ADDRESS', 'AMOUNT']}
                    rows={transactions}
                    ellipsis={0}
                    type='secondary'>
                    {row => (
                        <tr key={row.address + row.amount}>
                            <td><Hash type='address'>{row.address}</Hash></td>
                            <td><Monospaced>{row.amount}</Monospaced></td>
                        </tr>
                    )}
                </Table>
            </Container>
        );
    }

    render() {
        return (
            <div>
                <Container primary title='Factoid Transaction'>
                    <Horizontal>
                        <Vertical>
                            <Box type='outline'>
                                <Vertical>
                                    <div>
                                        <Label>INPUTS</Label>
                                        <Monospaced>{this.props.data.total_inputs}</Monospaced>
                                    </div>
                                    <div>
                                        <Label>OUTPUTS</Label>
                                        <Monospaced>{this.props.data.total_outputs}</Monospaced>
                                    </div>
                                    <div>
                                        <Label>FEE</Label>
                                        <Monospaced>{this.props.data.fee}</Monospaced>
                                    </div>
                                </Vertical>
                            </Box>
                        </Vertical>
                        <Vertical>
                            <Box type='outline'>
                                <Label>HASH</Label>
                                <Hash type='eblock'>{this.props.data.tx_id}</Hash>
                            </Box>
                            <Box type='fill'>
                                <Label>PARENT DIRECTORY BLOCK</Label>
                                <Hash type='dblock'>{this.props.data.dblock.keymr}</Hash>
                            </Box>
                            <Box>
                                <Label>CREATED ({currentTimezone()})</Label>
                                {formatDateLong(this.props.data.created_at)}
                            </Box>
                        </Vertical>
                    </Horizontal>
                </Container>
                {this.renderTransactions('Inputs', this.props.data.inputs)}
                {this.renderTransactions('Outputs', this.props.data.outputs)}
            </div>
        );
    }
}
