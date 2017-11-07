import React, {Component} from 'react';
import {load} from 'decorators';
import {currentTimezone, formatDateLong} from 'utils/date';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import EntriesTable from 'components/entries-table';
import Label from 'components/label';
import Hash from 'components/hash';
import ExternlIds from 'components/external-ids';
import Wrapped from 'components/wrapped';

@load(({match}) => `/chains/${match.params.hash}?stages=factom,bitcoin`)
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
                        <Box>
                            <Label>CREATED ({currentTimezone()})</Label>
                            {formatDateLong(this.props.data.entries[0].created_at)}
                        </Box>
                        <Box>
                            <Label>CONTENT</Label>
                            <Wrapped>{window.atob(this.props.data.content)}</Wrapped>
                        </Box>
                    </Vertical>
                </Container>
                <EntriesTable entries={this.props.data.entries} hashExtraArgs={{chain: this.props.data.chain_id}} />
            </div>
        );
    }
}
