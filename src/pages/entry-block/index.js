import React, {Component} from 'react';
import {load} from 'decorators';
import {currentTimezone, formatDate} from 'utils/date';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import HashList from 'components/hash-list';
import Label from 'components/label';
import Hash from 'components/hash';

@load('/data/eblock.json')
export default class EntryBlock extends Component {
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
                <Container primary title='Entry block'>
                    <Vertical>
                        <Box style='fill'>
                            <Label>NEXT ENTRY BLOCK</Label>
                            <Hash type='eblock'>{this.props.data.next.keymr}</Hash>
                        </Box>
                        <Box style='outline'>
                            <Label>KEYMR</Label>
                            <Hash type='eblock'>{this.props.data.keymr}</Hash>
                        </Box>
                        <Box style='fill'>
                            <Label>PREVIOUS ENTRY BLOCK</Label>
                            <Hash type='eblock'>{this.props.data.prev.keymr}</Hash>
                        </Box>
                        <Box style='fill'>
                            <Label>CHAIN</Label>
                            <Hash type='chain'>{this.props.data.chain.chain_id}</Hash>
                        </Box>
                        <Box style='fill'>
                            <Label>PARENT DIRECTORY BLOCK</Label>
                            <Hash type='dblock'>{this.props.data.dblock.keymr}</Hash>
                        </Box>
                        <Box>
                            <Label>STARTED ({currentTimezone()})</Label>
                            {formatDate(this.props.data.started_at)}
                        </Box>
                    </Vertical>
                </Container>
                <Container title='Entries' count={this.props.data.entries.length}>
                    <HashList hashes={this.getEntries()} />
                </Container>
            </div>
        );
    }
}
