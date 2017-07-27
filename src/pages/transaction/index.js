import React, {Component} from 'react';
import {load} from 'decorators';
import {currentTimezone, formatDate, formatDateLong} from 'utils/date';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import Table from 'components/table';
import Label from 'components/label';
import Hash from 'components/hash';

@load('/data/tx.json')
export default class Transaction extends Component {
    getEntries() {
        return this.props.data.entries.map(entry => ({
            type: 'entry',
            label: formatDate(entry.created_at),
            value: entry.hash,
        }));
    }

    render() {
        return (
            <div>
                <Container primary title='Factoid Transaction'>
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
                </Container>
                <Container
                    title='Inputs'
                    subtitle='(included in this transaction)'
                    count={this.props.data.inputs.length}>
                    <Table
                        columns={['ADDRESS', 'AMOUNT']}
                        rows={this.props.data.inputs}
                        ellipsis={0}
                        type='secondary'>
                        {row => (
                            <tr key={row.address + row.amount}>
                                <td><Hash type='address'>{row.address}</Hash></td>
                                <td>{row.amount}</td>
                            </tr>
                        )}
                    </Table>
                </Container>
                <Container
                    title='Outputs'
                    subtitle='(included in this transaction)'
                    count={this.props.data.outputs.length}>
                    <Table
                        columns={['ADDRESS', 'AMOUNT']}
                        rows={this.props.data.outputs}
                        ellipsis={0}
                        type='secondary'>
                        {row => (
                            <tr key={row.address + row.amount}>
                                <td><Hash type='address'>{row.address}</Hash></td>
                                <td>{row.amount}</td>
                            </tr>
                        )}
                    </Table>
                </Container>
            </div>
        );
    }
}
