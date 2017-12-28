import React, {Component} from 'react';
import {load} from 'decorators';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import EntriesTable from 'components/entries-table';
import Label from 'components/label';
import Hash from 'components/hash';
import ExternlIds from 'components/external-ids';

@load(({match}) => `/chains/${match.params.hash}?stages=factom,bitcoin`, {ignoreQueryString: true})
export default class Chain extends Component {
    render() {
        return (
            <div>
                <Container primary title='Chain'>
                    <Vertical>
                        <Box type='outline'>
                            <Label>CHAIN ID</Label>
                            <Hash type='chain'>{this.props.data.chain_id}</Hash>
                        </Box>
                        <Box>
                            <Label>EXTERNAL IDS</Label>
                            <ExternlIds>{this.props.data.external_ids.map(window.atob)}</ExternlIds>
                        </Box>
                    </Vertical>
                </Container>
                <EntriesTable
                    entriesUrl={`/chains/${this.props.data.chain_id}/entries?stages=factom,bitcoin`}
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
