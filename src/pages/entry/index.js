import React, {Component} from 'react';
import {load} from 'decorators';
import {currentTimezone, formatDate} from 'utils/date';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import Label from 'components/label';
import Hash from 'components/hash';

@load('/data/entry.json')
export default class Entry extends Component {
    render() {
        return (
            <div>
                <Container primary title='Entry'>
                    <Vertical>
                        <Box style='outline'>
                            <Label>HASH</Label>
                            <Hash type='eblock'>{this.props.data.hash}</Hash>
                        </Box>
                        <Box style='fill'>
                            <Label>CHAIN</Label>
                            <Hash type='chain'>{this.props.data.chain.chain_id}</Hash>
                        </Box>
                        <Box>
                            <Label>CREATED ({currentTimezone()})</Label>
                            {formatDate(this.props.data.created_at)}
                        </Box>
                        <Box>
                            <Label>CONTENT</Label>
                            {this.props.data.content}
                        </Box>
                    </Vertical>
                </Container>
            </div>
        );
    }
}