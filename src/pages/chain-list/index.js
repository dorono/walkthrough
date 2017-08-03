import React, {Component} from 'react';
import {load} from 'decorators';
import Container from 'components/container';
import Table from 'components/table';
import Pagination from 'components/pagination';
import Hash from 'components/hash';
import TagList from 'components/tag-list';

@load('/data/chains.json')
export default class ChainList extends Component {
    render() {
        return (
            <Container primary title='Chains'>
                <Table
                    columns={['CHAIN ID', 'EXTERNAL IDS']}
                    rows={this.props.data}
                    ellipsis={1}>
                    {row => (
                        <tr key={row.chain_id}>
                            <td><Hash type='chain'>{row.chain_id}</Hash></td>
                            <td><TagList>{row.external_ids}</TagList></td>
                        </tr>
                    )}
                </Table>
                <Pagination />
            </Container>
        );
    }
}
