import React, {Component} from 'react';
import {load} from 'decorators';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import EntriesTable from 'components/entries-table';
import Label from 'components/label';
import Hash from 'components/hash';

@load('/data/ecblock.json')
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
                            <Hash type='dblock'>{this.props.data.dblock.keymr}</Hash>
                        </Box>
                    </Vertical>
                </Container>
                <Container title='Entries' count={this.props.data.entries.length}>
                    <EntriesTable entries={this.props.data.entries} />
                </Container>
            </div>
        );
    }
}
