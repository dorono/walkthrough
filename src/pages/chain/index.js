import React, {Component} from 'react';
import {load} from 'decorators';
import {formatDate} from 'format';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import HashList from 'components/hash-list';
import Label from 'components/label';
import Hash from 'components/hash';

@load('/data/chain.json')
export default class Chain extends Component {
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
                <Container primary title='Chain'>
                    <Vertical>
                        <Box style='outline'>
                            <Label>CHAIN ID</Label>
                            <Hash type='chain'>{this.props.data.chain_id}</Hash>
                        </Box>
                        <Box>
                            <Label>EXTERNAL IDS</Label>
                            {this.props.data.external_ids.join(' / ')}
                        </Box>
                        <Box>
                            <Label>CONTENT</Label>
                            {this.props.data.content}
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
