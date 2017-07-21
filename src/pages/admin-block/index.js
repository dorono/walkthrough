import React, {Component} from 'react';
import {load} from 'decorators';
import {formatDate} from 'format';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import HashList from 'components/hash-list';
import Label from 'components/label';
import Hash from 'components/hash';

@load('/data/ablock.json')
export default class AdminBlock extends Component {
    getEntries() {
        return this.props.data.entries.map(entry => ({
            type: 'entry',
            label: formatDate(entry.created_at),
            value: entry.hash,
        }));
    }

    render() {
        return (
            <div>
                <Container primary title='Admin block'>
                    <Vertical>
                        <Box style='outline'>
                            <Label>HASH</Label>
                            <Hash type='ablock'>{this.props.data.hash}</Hash>
                        </Box>
                        <Box style='fill'>
                            <Label>PARENT DIRECTORY BLOCK</Label>
                            <Hash type='dblock'>{this.props.data.dblock.keymr}</Hash>
                        </Box>
                    </Vertical>
                </Container>
                <Container title='Entries' count={this.props.data.entries.length}>
                    <HashList hashes={this.getEntries()} />
                </Container>
            </div>
        );
    }
}
