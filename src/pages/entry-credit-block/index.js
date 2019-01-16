import React, {Component} from 'react';
import {dataLoader} from 'hocs/data-loader';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import EntriesTable from 'components/entries-table';
import Label from 'components/label';
import Hash from 'components/hash';
import Monospaced from 'components/monospaced';
import DirectoryBlockLink from 'components/directory-block-link';

export class EntryCreditBlockPage extends Component {
    render() {
        return (
            <div>
                <Container primary title='Entry credit block'>
                    <Vertical>
                        <Box
                            type='outline'
                            key='outline'>
                            <Label>HASH</Label>
                            <Hash type='ecblock'>{this.props.data.hash}</Hash>
                        </Box>
                        <Box
                            type='fill'
                            key='fill'>
                            <Label>PARENT DIRECTORY BLOCK</Label>
                            <DirectoryBlockLink>{this.props.data.dblock}</DirectoryBlockLink>
                        </Box>
                    </Vertical>
                </Container>
                <EntriesTable
                    entriesUrl={`/ecblocks/${this.props.data.hash}/entries`}
                    pageParams={this.props.location.search}
                    renderContent={row => <Monospaced>{row.hash}</Monospaced>}
                    hasLink={false}
                />
            </div>
        );
    }
}

export default dataLoader(
    ({match}) => `/ecblocks/${match.params.hash}`,
    {ignoreQueryString: true},
)(EntryCreditBlockPage);
