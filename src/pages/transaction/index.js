import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';

import classNames from 'classnames';
import {dataLoader} from 'hocs/data-loader';
import {
    getPegnetTransactionName,
    getTransactionStatus,
    generateTransactionList,
    getOutputAmount,
    isPartialConversion,
} from 'utils/transactions';
import Container from 'components/container';
import {Vertical, Box, VerticalToHorizontal} from 'components/layout';
import Table from 'components/table';
import Label from 'components/label';
import Hash from 'components/hash';
import Amount from 'components/amount';
import BlockLink from 'components/block-link';
import Monospaced from 'components/monospaced';
import TransactionAlerts from 'components/transaction-alerts';
import {TRANSACTIONS} from 'constants/transactions';
import globalStyles from 'styles/index.css';
import {mockPartialConversion} from './mockTransactions';
import styles from './styles.css';

export const buildJsonRPCData = txid => {
    return [
        {
            method: 'get-transaction',
            params: {
                txid,
            },
        },
        {
            method: 'get-sync-status',
        },
    ];
};

export class TransactionPage extends Component {
    renderTransactions = (title, transactionData) => {
        const transactions = generateTransactionList(title, transactionData);
        return (
            <Container
                title={title}
                subtitle='(included in this transaction)'
                count={transactions.length}>
                <Table
                    columns={['ADDRESS', 'AMOUNT']}
                    rows={transactions}
                    ellipsis={0}
                    type='secondary'>
                    {(row, idx) => {
                        return (
                            <tr key={`${row.address}-${idx}`}>
                                <td>
                                    <Monospaced type='address'>
                                        {row.isPartialConversion && (
                                            <span
                                                id='returned-difference'
                                                className={classNames(
                                                    globalStyles.highlightAll,
                                                    styles.partialConversionNotice,
                                                )}>
                                                {TRANSACTIONS.PARTIAL_CONVERSION_DIFFERENCE_LABEL}
                                            </span>
                                        )}
                                        <Hash
                                            type='address'
                                            key={`hash-${idx}`}
                                            extraArgs={{unit: row.unit, address: row.user_address}}>
                                            {row.user_address}
                                        </Hash>
                                    </Monospaced>
                                </td>
                                <td
                                    id={row.isPartialConversion ? 'returned-val' : ''}
                                    className={classNames({
                                        [globalStyles.highlightAll]: row.isPartialConversion,
                                    })}>
                                    <Amount unit={row.unit} key={`amt-${idx}`}>
                                        {row.amount || 0}
                                    </Amount>
                                </td>
                            </tr>
                        );
                    }}
                </Table>
            </Container>
        );
    };

    render() {
        let pegnetDTransactionData = {};
        // TODO: remove this condition once HAR-1437 is complete
        // and only execute what's in the "else" block. Can also
        // get rid of withRouter decorator
        if (
            CONFIG.debugPartialConversion &&
            this.props.location.pathname.includes(
                '0-1c39dc93c7fd058a50faded6f0932eb592b8cc6d1576b09ed8dc3672549571af',
            )
        ) {
            pegnetDTransactionData = mockPartialConversion.jsonRPC[0].actions[0];
        } else {
            pegnetDTransactionData = {
                ...this.props.data.jsonRPC[0].actions[0],
                ...this.props.data.jsonRPC[1],
            };
        }

        const transactionStatus = getTransactionStatus(pegnetDTransactionData);

        return (
            <Fragment>
                <Container
                    primary
                    title='Transaction'
                    alertBarType={transactionStatus}
                    alertBarComponent={<TransactionAlerts transactionType={transactionStatus} />}>
                    <VerticalToHorizontal verticalUpTo='small'>
                        <Vertical>
                            <Box type='outline'>
                                <Vertical>
                                    <div id='transaction-type'>
                                        <Label>TYPE</Label>
                                        <Monospaced>
                                            {getPegnetTransactionName(
                                                pegnetDTransactionData.txaction,
                                            )}
                                        </Monospaced>
                                    </div>
                                    {pegnetDTransactionData.txaction !==
                                        TRANSACTIONS.TYPE.COINBASE.NUMBER && (
                                        <div>
                                            <Label>INPUTS</Label>
                                            <Amount unit={pegnetDTransactionData.fromasset}>
                                                {pegnetDTransactionData.fromamount}
                                            </Amount>
                                        </div>
                                    )}
                                    <div>
                                        <Label>OUTPUTS</Label>
                                        <Amount
                                            unit={
                                                pegnetDTransactionData.toasset ||
                                                pegnetDTransactionData.fromasset
                                            }>
                                            {getOutputAmount(pegnetDTransactionData)}
                                        </Amount>
                                        {isPartialConversion(
                                            pegnetDTransactionData.txaction,
                                            pegnetDTransactionData.outputs,
                                        ) && (
                                            <div id='returned-amount' className={globalStyles.highlightAll}>
                                                <Amount unit={pegnetDTransactionData.fromasset}>
                                                    {pegnetDTransactionData.outputs[0].amount}
                                                </Amount>
                                            </div>
                                        )}
                                    </div>
                                </Vertical>
                            </Box>
                        </Vertical>
                        <Vertical>
                            <Box type='outline'>
                                <Label>TRANSACTION ID</Label>
                                <Hash type='tx'>{pegnetDTransactionData.txid}</Hash>
                            </Box>
                            <Box type='fill'>
                                <Label>COMPLETED</Label>
                                <BlockLink type={TRANSACTIONS.PEGNET_COMPLETED} isLink>
                                    {pegnetDTransactionData}
                                </BlockLink>
                            </Box>
                            <Box type='fill'>
                                <Label>RECORDED</Label>
                                <BlockLink type={TRANSACTIONS.PEGNET_RECORDED} isLink>
                                    {pegnetDTransactionData}
                                </BlockLink>
                            </Box>
                        </Vertical>
                    </VerticalToHorizontal>
                </Container>
                <VerticalToHorizontal verticalUpTo='small'>
                    {this.renderTransactions(TRANSACTIONS.TITLE.INPUTS, pegnetDTransactionData)}
                    {this.renderTransactions(TRANSACTIONS.TITLE.OUTPUTS, pegnetDTransactionData)}
                </VerticalToHorizontal>
            </Fragment>
        );
    }
}

export default withRouter(
    dataLoader(({match}) => buildJsonRPCData(match.params.hash))(TransactionPage),
);
