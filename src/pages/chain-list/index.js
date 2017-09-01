import React, {Component} from 'react';
import {load} from 'decorators';
import {addPaginationParams} from 'api';
import {reverse} from 'routes';
import Container from 'components/container';
import Table from 'components/table';
import Pagination from 'components/pagination';
import Hash from 'components/hash';
import ExternlIds from 'components/external-ids';

@load(({location}) => addPaginationParams('/chains', location.search))
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
                            <td><ExternlIds fadeOut>{row.external_ids.map(window.atob)}</ExternlIds></td>
                        </tr>
                    )}
                </Table>
                <Pagination
                    baseUrl={reverse('chains')}
                    count={this.props.count}
                    limit={this.props.limit}
                    offset={this.props.offset}
                />
            </Container>
        );
    }
}
