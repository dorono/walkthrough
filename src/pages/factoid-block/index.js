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
                                <Hash type='fblock'>{this.props.data.hash}</Hash>
                            </Box>
                            <Box type='fill'>
                                <Label>PARENT DIRECTORY BLOCK</Label>
                                <Hash type='dblock'>{this.props.data.dblock.keymr}</Hash>
                            </Box>
                        </Vertical>
                    </Horizontal>
                </Container>
                <Sortable
                    items={this.props.data.transactions}
                    sortOptions={[
                        {label: 'Newest first', func: (a, b) => b.created_at.localeCompare(a.created_at)},
                        {label: 'Oldest first', func: (a, b) => a.created_at.localeCompare(b.created_at)},
                        {label: 'Highest input first', func: (a, b) => b.total_inputs - a.total_inputs},
                        {label: 'Lowest input first', func: (a, b) => a.total_inputs - b.total_inputs},
                        {label: 'Highest output first', func: (a, b) => b.total_outputs - a.total_outputs},
                        {label: 'Lowest output first', func: (a, b) => a.total_outputs - b.total_outputs},
                        {label: 'Highest fee first', func: (a, b) => b.fee - a.fee},
                        {label: 'Lowest fee first', func: (a, b) => a.fee - b.fee},
                        {label: 'Highest ECs first', func: (a, b) => b.total_ecs - a.total_ecs},
                        {label: 'Lowest ECs first', func: (a, b) => a.total_ecs - b.total_ecs},
                    ]}>
                    {(items, sortDropdown) => (
                        <Container title='Transactions' count={items.length} actions={sortDropdown}>
                            <Table
                                columns={[
                                    `CREATED (${currentTimezone()})`,
                                    'HASH',
                                    'INPUTS',
                                    'OUTPUTS',
                                    'FEE',
                                    'TOTAL ECS',
                                ]}
                                rows={items}
                                ellipsis={1}
                                type='secondary'>
                                {row => (
                                    <tr key={row.tx_id}>
                                        <td>{formatDate(row.created_at)}</td>
                                        <td><Hash type='tx'>{row.tx_id}</Hash></td>
                                        <td><Monospaced>{row.total_inputs}</Monospaced></td>
                                        <td><Monospaced>{row.total_outputs}</Monospaced></td>
                                        <td><Monospaced>{row.fee}</Monospaced></td>
                                        <td><Monospaced>{row.total_ecs}</Monospaced></td>
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
