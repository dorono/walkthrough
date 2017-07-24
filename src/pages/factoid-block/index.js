import React, {Component} from 'react';
import {load} from 'decorators';
import Container from 'components/container';
import {Horizontal, Vertical, Box} from 'components/layout';
import Table from 'components/table';
import DateDisplay from 'components/date-display';
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
                            <Box style='outline'>
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
                            <Box style='outline'>
                                <Label>HASH</Label>
                                <Hash type='ablock'>{this.props.data.hash}</Hash>
                            </Box>
                            <Box style='fill'>
                                <Label>PARENT DIRECTORY BLOCK</Label>
                                <Hash type='dblock'>{this.props.data.dblock.keymr}</Hash>
                            </Box>
                        </Vertical>
                    </Horizontal>
                </Container>
                <Container title='Transactions' count={this.props.data.transactions.length}>
                    <Table
                        columns={['CREATED', 'HASH', 'INPUTS', 'OUTPUTS', 'TOTAL ECS']}
                        rows={this.props.data.transactions}
                        ellipsis={1}
                        style='secondary'>
                        {row => (
                            <tr key={row.tx_id}>
                                <td><DateDisplay>{row.created_at}</DateDisplay></td>
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
