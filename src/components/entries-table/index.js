import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {addPaginationParams} from 'api';
import {dataLoader} from 'decorators';

import {STAGE_PENDING_ENTRY_TEXT, STAGE_PENDING, STAGE_PENDING_DATE} from 'stages';

import Container from 'components/container';
import Pagination from 'components/pagination';
import Table from 'components/table';
import PendingItem from 'components/pending-item';
import PendingLegend from 'components/pending-legend';

import {currentTimezone, formatDate} from 'utils/date';
import {displayPendingContent} from 'utils/pending-items';
import globalStyles from 'styles/index.css';

@dataLoader(({entriesUrl, pageParams}) => addPaginationParams(entriesUrl, pageParams))
export default class EntriesTable extends Component {
    static propTypes = {
        renderContent: PropTypes.func.isRequired,
        contentColumnName: PropTypes.string,
        hasLink: PropTypes.bool,
    };

    static defaultProps = {
        contentColumnName: 'HASH',
        hasLink: true,
    };

    render() {
        return (
            <Container title='Entries' count={this.props.count}>
                <Table
                    columns={[`CREATED (${currentTimezone()})`, this.props.contentColumnName]}
                    rows={this.props.data}
                    ellipsis={1}
                    type='secondary'
                    interactive={this.props.hasLink}>
                    {(row, index) => {
                        const isPending = row.stage === STAGE_PENDING;
                        return (
                            <tr key={index}>
                                <td>
                                    <PendingItem stage={row.stage} enableTooltip={false} />
                                    <span
                                        className={classNames({
                                            [globalStyles.disabledText]: isPending,
                                        })}>
                                        {isPending ? STAGE_PENDING_DATE : formatDate(row.created_at)}
                                    </span>
                                </td>
                                <td>{this.props.renderContent(row)}</td>
                            </tr>
                        );
                    }}
                </Table>
                <PendingLegend
                    show={displayPendingContent(this.props.data)}
                    fullWidthBannerText={STAGE_PENDING_ENTRY_TEXT}
                />
                {this.props.count > this.props.limit && (
                    <Pagination count={this.props.count} limit={this.props.limit} offset={this.props.offset} />
                )}
            </Container>
        );
    }
}
