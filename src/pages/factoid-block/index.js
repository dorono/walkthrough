import React, {Component} from 'react';
import {dataLoader} from 'decorators';
import {currentTimezone, formatDate} from 'utils/date';
import Container from 'components/container';
import Sortable, {sortOptions} from 'components/sortable';
import {Horizontal, Vertical, Box} from 'components/layout';
import Table from 'components/table';
import Label from 'components/label';
import Hash from 'components/hash';
import DirectoryBlockLink from 'components/directory-block-link';
import Amount from 'components/amount';

@dataLoader(({match}) => `/fblocks/${match.params.hash}`)
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
                                        <Amount unit='FCT'>{this.props.data.fct_total_inputs}</Amount>
                                    </div>
                                    <div>
                                        <Label>OUTPUTS</Label>
                                        <Amount unit='FCT'>{this.props.data.fct_total_outputs}</Amount>
                                    </div>
                                    <div>
                                        <Label>ECS CREATED</Label>
                                        <Amount unit='EC'>{this.props.data.ec_total_created}</Amount>
                                    </div>
                                </Vertical>
                            </Box>
                        </Vertical>
                        <Vertical>
                            <Box type='outline'>
                                <Label>KEYMR</Label>
                                <Hash type='fblock'>{this.props.data.keymr}</Hash>
                            </Box>
                            <Box type='fill'>
                                <Label>PARENT DIRECTORY BLOCK</Label>
                                <DirectoryBlockLink>{this.props.data.dblock}</DirectoryBlockLink>
                            </Box>
                        </Vertical>
                    </Horizontal>
                </Container>
                <Sortable
                    items={this.props.data.transactions}
                    sortOptions={[
                        sortOptions.newestFirst,
                        sortOptions.oldestFirst,
                        {label: 'Highest input first', func: (a, b) => b.fct_total_inputs - a.fct_total_inputs},
                        {label: 'Lowest input first', func: (a, b) => a.fct_total_inputs - b.fct_total_inputs},
                        {label: 'Highest output first', func: (a, b) => b.fct_total_outputs - a.fct_total_outputs},
                        {label: 'Lowest output first', func: (a, b) => a.fct_total_outputs - b.fct_total_outputs},
                        {label: 'Highest ECs first', func: (a, b) => b.ec_created - a.ec_created},
                        {label: 'Lowest ECs first', func: (a, b) => a.ec_created - b.ec_created},
                        {label: 'Highest fee first', func: (a, b) => b.fct_fee - a.fct_fee},
                        {label: 'Lowest fee first', func: (a, b) => a.fct_fee - b.fct_fee},
                    ]}>
                    {(items, sortDropdown) => (
                        <Container title='Transactions' count={items.length} actions={sortDropdown}>
                            <Table
                                columns={[
                                    `CREATED (${currentTimezone()})`,
                                    'TRANSACTION ID',
                                    'INPUTS',
                                    'OUTPUTS',
                                    'ECS CREATED',
                                    'FEE',
                                ]}
                                rows={items}
                                ellipsis={1}
                                fixedWidth={{start: 2, width: 110}}
                                type='secondary'>
                                {row => (
                                    <tr key={row.tx_id}>
                                        <td>{formatDate(row.created_at)}</td>
                                        <td><Hash type='tx'>{row.tx_id}</Hash></td>
                                        <td><Amount unit='FCT'>{row.fct_total_inputs}</Amount></td>
                                        <td><Amount unit='FCT'>{row.fct_total_outputs}</Amount></td>
                                        <td><Amount unit='EC'>{row.ec_created}</Amount></td>
                                        <td><Amount unit='FCT'>{row.fct_fee}</Amount></td>
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
