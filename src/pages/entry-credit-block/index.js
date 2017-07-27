import React, {Component} from 'react';
import {load} from 'decorators';
import {currentTimezone, formatDate} from 'utils/date';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import Table from 'components/table';
import Label from 'components/label';
import Hash from 'components/hash';

@load('/data/ablock.json')
export default class EntryCreditBlock extends Component {
    render() {
        return (
            <div>
                <Container primary title='Entry credit block'>
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
