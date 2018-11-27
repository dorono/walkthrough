import React, {Component} from 'react';
import {dataLoader} from 'decorators';
import {STAGE_PENDING, STAGE_PENDING_CHAIN_TEXT} from 'stages';

import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import EntriesTable from 'components/entries-table';
import Label from 'components/label';
import Hash from 'components/hash';
import ExternalIdList from 'components/external-id-list';

import globalStyles from 'styles/index.css';

@dataLoader(({match}) => `/chains/${match.params.hash}`, {ignoreQueryString: true})
export default class Chain extends Component {
    render() {
        const isPending = this.props.data.stage === STAGE_PENDING;
        return (
            <div>
                <Container
                    primary
                    title='Chain'
                    showFullWidthBanner={isPending}
                    fullWidthBannerText={STAGE_PENDING_CHAIN_TEXT}>
                    <Vertical>
                        <Box type='outline'>
                            <Label>IMMUTABILITY STAGE</Label>
                            <span className={globalStyles.capitalized}>
                                {this.props.data.stage}
                            </span>
                        </Box>
                        <Box type='outline'>
                            <Label>CHAIN ID</Label>
                            <Hash type='chain'>{this.props.data.chain_id}</Hash>
                        </Box>
                        <Box>
                            <Label>EXTERNAL IDS</Label>
                            <ExternalIdList externalIds={this.props.data.external_ids} />
                        </Box>
                    </Vertical>
                </Container>
                <EntriesTable
                    entriesUrl={`/chains/${this.props.data.chain_id}/entries`}
                    pageParams={this.props.location.search}
                    renderContent={row => (
                        <Hash type='entry' extraArgs={{chain: this.props.data.chain_id}}>
                            {row.entry_hash}
                        </Hash>
                    )}
                />
            </div>
        );
    }
}
