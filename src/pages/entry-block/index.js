import React, {Component} from 'react';
import {dataLoader} from 'decorators';
import {currentTimezone, formatDateLong} from 'utils/date';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import EntriesTable from 'components/entries-table';
import Label from 'components/label';
import Hash from 'components/hash';
import DirectoryBlockLink from 'components/directory-block-link';

export class EntryBlockPage extends Component {
    render() {
        return (
            <div>
                <Container primary title='Entry block'>
                    <Vertical>
                        <Box type='fill'>
                            <Label>NEXT ENTRY BLOCK</Label>
                            <Hash type='eblock'>{this.props.data.next && this.props.data.next.keymr}</Hash>
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
                            <DirectoryBlockLink>{this.props.data.dblock}</DirectoryBlockLink>
                        </Box>
                        <Box>
                            <Label>STARTED ({currentTimezone()})</Label>
                            {formatDateLong(this.props.data.started_at)}
                        </Box>
                    </Vertical>
                </Container>
                <EntriesTable
                    entriesUrl={`/eblocks/${this.props.data.keymr}/entries`}
                    pageParams={this.props.location.search}
                    renderContent={row => (
                        <Hash type='entry' extraArgs={{chain: this.props.data.chain.chain_id}} key={row.entry_hash}>
                            {row.entry_hash}
                        </Hash>
                    )}
                />
            </div>
        );
    }
}

export default dataLoader(
    ({match}) => `/eblocks/${match.params.hash}`,
    {ignoreQueryString: true},
)(EntryBlockPage);
