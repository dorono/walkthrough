import React, {Component} from 'react';
import {load} from 'decorators';
import {currentTimezone, formatDateLong} from 'utils/date';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import Label from 'components/label';
import Hash from 'components/hash';
import ExternlIds from 'components/external-ids';
import Wrapped from 'components/wrapped';

@load(({match}) => `/chains/${match.params.chain}/entries/${match.params.hash}`)
export default class Entry extends Component {
    render() {
        return (
            <Container primary title='Entry'>
                <Vertical>
                    <Box type='outline'>
                        <Label>HASH</Label>
                        <Hash type='entry' extraArgs={{chain: this.props.data.chain.chain_id}}>
                            {this.props.data.hash}
                        </Hash>
                    </Box>
                    <Box type='fill'>
                        <Label>CHAIN</Label>
                        <Hash type='chain'>{this.props.data.chain.chain_id}</Hash>
                    </Box>
                    <Box>
                        <Label>EXTERNAL IDS</Label>
                        <ExternlIds>{this.props.data.external_ids.map(window.atob)}</ExternlIds>
                    </Box>
                    <Box>
                        <Label>CREATED ({currentTimezone()})</Label>
                        {formatDateLong(this.props.data.created_at)}
                    </Box>
                    <Box>
                        <Label>CONTENT</Label>
                        <Wrapped>{window.atob(this.props.data.content)}</Wrapped>
                    </Box>
                </Vertical>
            </Container>
        );
    }
}
