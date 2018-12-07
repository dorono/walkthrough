import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {autobind} from 'core-decorators';

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
import styles from './styles.css';

export class EntriesTable extends Component {
    static propTypes = {
        renderContent: PropTypes.func.isRequired,
        contentColumnName: PropTypes.string,
        hasLink: PropTypes.bool,
    };

    static defaultProps = {
        contentColumnName: 'HASH',
        hasLink: true,
    };

    static getDerivedStateFromProps(props) {
        return {
            hasPendingEntries: displayPendingContent(props.data),
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            hasPendingEntries: false,
        };
    }

    @autobind
    setClassName(isPending) {
        // if there are one or more pending entries...
        if (this.state.hasPendingEntries) {
            // if this row is NOT a pending entry, then give lots of padding
            if (!isPending) {
                return styles.tableLeftContentPaddingIconAlign;
            }

            // if this row IS a pending entry, then no padding necessary here
            return styles.tableLeftNoPadding;
        }

        // if there are no pending entries in this table, then use default padding
        return styles.tableLeftContentPadding;
    }

    render() {
        return (
            <Container title='Entries' count={this.props.count}>
                <Table
                    columns={[`CREATED (${currentTimezone()})`, this.props.contentColumnName]}
                    rows={this.props.data}
                    ellipsis={1}
                    leftPadding={0}
                    type='secondary'
                    interactive={this.props.hasLink}>
                    {(row, index) => {
                        const isPending = row.stage === STAGE_PENDING;
                        return (
                            <tr key={index}>
                                <td className={this.setClassName(isPending)}>
                                    {isPending &&
                                    <PendingItem
                                        stage={row.stage}
                                        enableTooltip={false}
                                    />
                                    }
                                    <span className={classNames({
                                        [globalStyles.disabledText]: isPending})}>
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

export default dataLoader(
    ({entriesUrl, pageParams}) => addPaginationParams(entriesUrl, pageParams),
)(EntriesTable);
