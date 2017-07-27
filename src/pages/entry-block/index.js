import React, {Component} from 'react';
import {load} from 'decorators';
import {currentTimezone, formatDateLong} from 'utils/date';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import EntriesTable from 'components/entries-table';
import Label from 'components/label';
import Hash from 'components/hash';

@load('/data/eblock.json')
export default class EntryBlock extends Component {
    render() {
        return (
            <div>
                <Container primary title='Entry block'>
                    <Vertical>
                        <Box type='fill'>
                            <Label>NEXT ENTRY BLOCK</Label>
                            <Hash type='eblock'>{this.props.data.next.keymr}</Hash>
                        </Box>
                        <Box type='outline'>
                            <Label>KEYMR</Label>
                            <Hash type='eblock'>{this.props.data.keymr}</Hash>
                        </Box>
                        <Box type='fill'>
                            <Label>PREVIOUS ENTRY BLOCK</Label>
                            <Hash type='eblock'>{this.props.data.prev.keymr}</Hash>
                        </Box>
                        <Box type='fill'>
                            <Label>CHAIN</Label>
                            <Hash type='chain'>{this.props.data.chain.chain_id}</Hash>
                        </Box>
                        <Box type='fill'>
                            <Label>PARENT DIRECTORY BLOCK</Label>
                            <Hash type='dblock'>{this.props.data.dblock.keymr}</Hash>
                        </Box>
                        <Box>
                            <Label>STARTED ({currentTimezone()})</Label>
                            {formatDateLong(this.props.data.started_at)}
                        </Box>
                    </Vertical>
                </Container>
                <Container title='Entries' count={this.props.data.entries.length}>
                    <EntriesTable entries={this.props.data.entries} />
                </Container>
            </div>
        );
    }
}
