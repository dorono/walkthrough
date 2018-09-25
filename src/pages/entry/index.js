import React, {Component} from 'react';
import {dataLoader} from 'decorators';
import {currentTimezone, formatDateLong} from 'utils/date';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import Label from 'components/label';
import Hash from 'components/hash';
import ExternalIdList from 'components/external-id-list';
import EntryBlockLink from 'components/entry-block-link';
import EntryContent from 'components/entry-content/index';

import styles from './styles.css';

@dataLoader(({match}) => `/chains/${match.params.chain}/entries/${match.params.hash}?stages=factom,bitcoin`)
export default class Entry extends Component {
    render() {
        return (
            <Container primary title='Entry'>
                <Vertical>
                    <Box type='outline'>
                        <Label>HASH</Label>
                        <Hash type='entry' extraArgs={{chain: this.props.data.chain.chain_id}}>
                            {this.props.data.entry_hash}
                        </Hash>
                    </Box>
                    <Box type='fill'>
                        <Label>CHAIN</Label>
                        <Hash type='chain'>{this.props.data.chain.chain_id}</Hash>
                    </Box>
                    <Box type='fill'>
                        <Label>PARENT ENTRY BLOCK</Label>
                        <EntryBlockLink>{this.props.data.eblock}</EntryBlockLink>
                    </Box>
                    <Box>
                        <Label>CREATED ({currentTimezone()})</Label>
                        {formatDateLong(this.props.data.created_at)}
                    </Box>
                    <Box>
                        <Label>EXTERNAL IDS</Label>
                        <ExternalIdList externalIds={this.props.data.external_ids} />
                    </Box>
                    <Box>
                        <Label className={styles.contentTitle}>CONTENT</Label>
                        <EntryContent data={this.props.data.content} />
                    </Box>
                </Vertical>
            </Container>
        );
    }
}
