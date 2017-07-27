import React, {Component} from 'react';
import {load} from 'decorators';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import EntriesTable from 'components/entries-table';
import Label from 'components/label';
import Hash from 'components/hash';
import Tag from 'components/tag';

@load('/data/chain.json')
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
                            {this.props.data.external_ids.map(externalId => <Tag key={externalId}>{externalId}</Tag>)}
                        </Box>
                        <Box>
                            <Label>CONTENT</Label>
                            {this.props.data.content}
                        </Box>
                    </Vertical>
                </Container>
                <EntriesTable entries={this.props.data.entries} />
            </div>
        );
    }
}
