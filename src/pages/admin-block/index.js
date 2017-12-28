import React, {Component} from 'react';
import {load} from 'decorators';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import EntriesTable from 'components/entries-table';
import Label from 'components/label';
import Hash from 'components/hash';
import Monospaced from 'components/monospaced';
import DirectoryBlockLink from 'components/directory-block-link';

@load(({match}) => `/ablocks/${match.params.hash}`, {ignoreQueryString: true})
export default class AdminBlock extends Component {
    renderEntryContent(row) {
        return (
            <div>
                <strong>IdentityAdminChainID</strong>: <Monospaced>{row.content.identityadminchainid}</Monospaced>
                <br />
                <strong>Pub</strong>: <Monospaced>{row.content.prevdbsig.pub}</Monospaced>
                <br />
                <strong>Sig</strong>: <Monospaced>{row.content.prevdbsig.sig}</Monospaced>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Container primary title='Admin block'>
                    <Vertical>
                        <Box type='outline'>
                            <Label>HASH</Label>
                            <Hash type='ablock'>{this.props.data.hash}</Hash>
                        </Box>
                        <Box type='fill'>
                            <Label>PARENT DIRECTORY BLOCK</Label>
                            <DirectoryBlockLink>{this.props.data.dblock}</DirectoryBlockLink>
                        </Box>
                    </Vertical>
                </Container>
                <EntriesTable
                    entriesUrl={`/ablocks/${this.props.data.hash}/entries?stages=factom,bitcoin`}
                    pageParams={this.props.location.search}
                    contentColumnName='CONTENT'
                    renderContent={this.renderEntryContent}
                />
            </div>
        );
    }
}
