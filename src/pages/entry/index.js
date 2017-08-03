import React, {Component} from 'react';
import {load} from 'decorators';
import {currentTimezone, formatDateLong} from 'utils/date';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import Label from 'components/label';
import Hash from 'components/hash';

@load(({match}) => `/entries/${match.params.hash}`)
export default class Entry extends Component {
    render() {
        return (
            <Container primary title='Entry'>
                <Vertical>
                    <Box type='outline'>
                        <Label>HASH</Label>
                        <Hash type='eblock'>{this.props.data.hash}</Hash>
                    </Box>
                    <Box type='fill'>
                        <Label>CHAIN</Label>
                        <Hash type='chain'>{this.props.data.chain.chain_id}</Hash>
                    </Box>
                    <Box>
                        <Label>CREATED ({currentTimezone()})</Label>
                        {formatDateLong(this.props.data.created_at)}
                    </Box>
                    <Box>
                        <Label>CONTENT</Label>
                        {window.atob(this.props.data.content)}
                    </Box>
                </Vertical>
            </Container>
        );
    }
}
