import React, {Component} from 'react';
import {load} from 'decorators';
import {addPaginationParams} from 'api';

import Container from 'components/container';
import Table from 'components/table';
import Pagination from 'components/pagination';
import Hash from 'components/hash';
import ExternalIdList from 'components/external-id-list';

@load(({location}) => addPaginationParams('/chains?stages=factom,bitcoin', location.search))
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
                            <td><ExternalIdList externalIds={row.external_ids} showDefaultEncoding fadeOut /></td>
                        </tr>
                    )}
                </Table>
                <Pagination count={this.props.count} limit={this.props.limit} offset={this.props.offset} />
            </Container>
        );
    }
}
