import React, {Component} from 'react';
import {load} from 'decorators';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import EntriesTable from 'components/entries-table';
import Label from 'components/label';
import Hash from 'components/hash';
import Monospaced from 'components/monospaced';
import DirectoryBlockLink from 'components/directory-block-link';

@load(({match}) => `/ecblocks/${match.params.hash}`, {ignoreQueryString: true})
export default class EntryCreditBlock extends Component {
    render() {
        return (
            <div>
                <Container primary title='Entry credit block'>
                    <Vertical>
                        <Box type='outline'>
                            <Label>HASH</Label>
                            <Hash type='ecblock'>{this.props.data.hash}</Hash>
                        </Box>
                        <Box type='fill'>
                            <Label>PARENT DIRECTORY BLOCK</Label>
                            <DirectoryBlockLink>{this.props.data.dblock}</DirectoryBlockLink>
                        </Box>
                    </Vertical>
                </Container>
                <EntriesTable
                    entriesUrl={`/ecblocks/${this.props.data.hash}/entries?stages=factom,bitcoin`}
                    pageParams={this.props.location.search}
                    renderContent={row => <Monospaced>{row.hash}</Monospaced>}
                    hasLink={false}
                />
            </div>
        );
    }
}
