import React, {Component} from 'react';
import {load} from 'decorators';
import {currentTimezone, formatDate} from 'utils/date';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import Table from 'components/table';
import Label from 'components/label';
import Hash from 'components/hash';

@load('/data/chain.json')
export default class Chain extends Component {
    render() {
        return (
            <div>
                <Container primary title='Chain'>
                    <Vertical>
                        <Box style='outline'>
                            <Label>CHAIN ID</Label>
                            <Hash type='chain'>{this.props.data.chain_id}</Hash>
                        </Box>
                        <Box>
                            <Label>EXTERNAL IDS</Label>
                            {this.props.data.external_ids.join(' / ')}
                        </Box>
                        <Box>
                            <Label>CONTENT</Label>
                            {this.props.data.content}
                        </Box>
                    </Vertical>
                </Container>
                <Container title='Entries' count={this.props.data.entries.length}>
                    <Table
                        columns={[`CREATED (${currentTimezone()})`, 'HASH']}
                        rows={this.props.data.entries}
                        ellipsis={1}
                        style='secondary'>
                        {row => (
                            <tr key={row.hash}>
                                <td>{formatDate(row.created_at)}</td>
                                <td><Hash type='entry'>{row.hash}</Hash></td>
                            </tr>
                        )}
                    </Table>
                </Container>
            </div>
        );
    }
}
