import React, {Component} from 'react';
import {load} from 'decorators';
import {currentTimezone, formatDate} from 'utils/date';
import Container from 'components/container';
import {Horizontal, Vertical, Box} from 'components/layout';
import Table from 'components/table';
import Label from 'components/label';
import Hash from 'components/hash';
import Monospaced from 'components/monospaced';

@load('/data/fblock.json')
export default class FactoidBlock extends Component {
    render() {
        return (
            <div>
                <Container primary title='Factoid block'>
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
                                        <Label>TOTAL ECS</Label>
                                        <Monospaced>{this.props.data.total_ecs}</Monospaced>
                                    </div>
                                    <div>
                                        <Label>ECS CREATED</Label>
                                        <Monospaced>{this.props.data.ec_created}</Monospaced>
                                    </div>
                                    <div>
                                        <Label>ECS DESTROYED</Label>
                                        <Monospaced>{this.props.data.ec_destroyed}</Monospaced>
                                    </div>
                                </Vertical>
                            </Box>
                        </Vertical>
                        <Vertical>
                            <Box type='outline'>
                                <Label>HASH</Label>
                                <Hash type='ablock'>{this.props.data.hash}</Hash>
                            </Box>
                            <Box type='fill'>
                                <Label>PARENT DIRECTORY BLOCK</Label>
                                <Hash type='dblock'>{this.props.data.dblock.keymr}</Hash>
                            </Box>
                        </Vertical>
                    </Horizontal>
                </Container>
                <Container title='Transactions' count={this.props.data.transactions.length}>
                    <Table
                        columns={[`CREATED (${currentTimezone()})`, 'HASH', 'INPUTS', 'OUTPUTS', 'TOTAL ECS']}
                        rows={this.props.data.transactions}
                        ellipsis={1}
                        type='secondary'>
                        {row => (
                            <tr key={row.tx_id}>
                                <td>{formatDate(row.created_at)}</td>
                                <td><Hash type='tx'>{row.tx_id}</Hash></td>
                                <td>{row.total_inputs}</td>
                                <td>{row.total_outputs}</td>
                                <td>{row.total_ecs}</td>
                            </tr>
                        )}
                    </Table>
                </Container>
            </div>
        );
    }
}
