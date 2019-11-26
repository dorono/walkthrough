import React, {Component, Fragment} from 'react';
import {dataLoader} from 'hocs/data-loader';
import {
    getPegnetTransactionName,
    getTransactionStatus,
    generateTransactionList,
    getOutputAmount,
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
                                        <Hash
                                            type='address'
                                            key={`hash-${idx}`}
                                            extraArgs={{unit: row.unit}}>
                                            {row.user_address}
                                        </Hash>
                                    </Monospaced>
                                </td>
                                <td>
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
        const pegnetDTransactionData = {
            ...this.props.data.jsonRPC[0].actions[0],
            ...this.props.data.jsonRPC[1],
        };

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

export default dataLoader(({match}) => buildJsonRPCData(match.params.hash))(TransactionPage);
