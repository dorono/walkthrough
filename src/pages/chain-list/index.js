import React, {Component} from 'react';
import {dataLoader} from 'decorators';
import {addPaginationParams} from 'api';

import Container from 'components/container';
import Table from 'components/table';
import Pagination from 'components/pagination';
import Hash from 'components/hash';
import ExternalIdList from 'components/external-id-list';
import PendingItem from 'components/pending-item';
import PendingLegend from 'components/pending-legend';

import {STAGE_PENDING_CHAIN_TEXT} from 'stages';
import {displayPendingContent} from 'utils/pending-items';

import styles from './styles.css';

@dataLoader(({location}) => addPaginationParams('/chains', location.search))
export default class ChainList extends Component {
    render() {
        return (
            <Container primary title='Chains'>
                <Table
                    columns={['CHAIN ID', 'EXTERNAL IDS']}
                    rows={this.props.data}
                    ellipsis={1}
                    responsive>
                    {row => (
                        <tr key={row.chain_id}>
                            <td className={styles.chain}>
                                <PendingItem stage={row.stage} />
                                <Hash type='chain'>{row.chain_id}</Hash>
                            </td>
                            <td>
                                <ExternalIdList
                                    externalIds={row.external_ids}
                                    showDefaultEncoding
                                    className={styles.fadeOut}
                                />
                            </td>
                        </tr>
                    )}
                </Table>
                <PendingLegend
                    show={displayPendingContent(this.props.data)}
                    fullWidthBannerText={STAGE_PENDING_CHAIN_TEXT}
                />
                <Pagination count={this.props.count} limit={this.props.limit} offset={this.props.offset} />
            </Container>
        );
    }
}
