import React, { Component } from 'react';
import { dataLoader } from 'hocs/data-loader';
import { currentTimezone, formatDateLong } from 'utils/date';
import { getPegnetTransactionType } from 'utils/pegnet';
import Container from 'components/container';
import { Vertical, Box, VerticalToHorizontal } from 'components/layout';
import Table from 'components/table';
import Label from 'components/label';
import Hash from 'components/hash';
import DirectoryBlockLink from 'components/directory-block-link';
import FactoidBlockLink from 'components/factoid-block-link';
import Amount from 'components/amount';
import BlockLink from 'components/block-link';
import Monospaced from 'components/monospaced';
import {TRANSACTIONS} from 'constants/transactions';
const buildJsonRPCData = txid => {
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
    isTransfer = (transaction) => {
        return transaction.txaction === 1
        && Array.isArray(transaction.outputs);
    }

    getOutputAmount = (transaction) => {
        if (this.isTransfer(transaction)) {
            return transaction.outputs.reduce((accumulator, outputAmt) => accumulator + outputAmt.amount, 0);
        }

        return transaction.toamount;
    }

    generateTransactionList = (title, transactionData) => {
        // convert that data into an array for looping purposes
        let transactions = [transactionData];

        // for transfers, make sure that the list of outputs come from
        // the "outputs" property of the transaction response
        if (title === TRANSACTIONS.TITLE.OUTPUTS) {
            if (this.isTransfer(transactions[0])) {
                transactions = transactions[0].outputs
                .map((output, idx) => {
                    return {
                        user_address: output.address,
                        amount: output.amount,
                        unit: transactions[idx].fromasset,
                    };
                });
            } else {
                transactions = [{
                    user_address: transactions[0].toaddress || transactions[0].fromaddress,
                    amount: transactions[0].toamount,
                    unit: transactions[0].toasset,
                }];
            }
        } else {
            transactions = [{
                user_address: transactions[0].fromaddress,
                amount: transactions[0].fromamount,
                unit: transactions[0].fromasset,
            }];
        }

        return transactions;
    }

    renderTransactions= (title, transactionData) => {
        const transactions = this.generateTransactionList(title, transactionData);

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
                    {row => {
                        return (
                            <tr key={row.address + row.amount}>
                                <td>
                                    <Monospaced type='address' key={row.user_address}>
                                        <Hash type='address'>{row.user_address}</Hash>
                                    </Monospaced>
                                </td>
                                <td>
                                    <Amount unit={row.unit}>{row.amount}</Amount>
                                </td>
                            </tr>
                        );
                    }}
                </Table>
            </Container>
        );
    }

    render() {
        const pegnetDTransactionData = {
            ...this.props.data.jsonRPC[0].actions[0],
            ...this.props.data.jsonRPC[1],
        };

        return (
            <div>
                <Container primary title='Transaction'>
                    <VerticalToHorizontal verticalUpTo='small'>
                        <Vertical>
                            <Box type='outline'>
                                <Vertical>
                                    <div>
                                        <Label>TYPE</Label>
                                        <Monospaced>
                                            {getPegnetTransactionType(pegnetDTransactionData.txaction)}
                                        </Monospaced>
                                    </div>
                                    {pegnetDTransactionData.txaction !== 3 &&
                                    <div>
                                        <Label>INPUTS</Label>
                                        <Amount unit={pegnetDTransactionData.fromasset}>
                                            {pegnetDTransactionData.fromamount}
                                        </Amount>
                                    </div>
                                    }
                                    <div>
                                        <Label>OUTPUTS</Label>
                                        <Amount unit={pegnetDTransactionData.toasset || pegnetDTransactionData.fromasset}>
                                            {this.getOutputAmount(pegnetDTransactionData)}
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
                                <BlockLink
                                    type={TRANSACTIONS.PEGNET_COMPLETED}
                                    isLink>
                                    {pegnetDTransactionData}
                                </BlockLink>
                            </Box>
                            <Box type='fill'>
                                <Label>RECORDED</Label>
                                <BlockLink
                                    type={TRANSACTIONS.PEGNET_RECORDED}
                                    isLink>
                                    {pegnetDTransactionData}
                                </BlockLink>
                            </Box>
                        </Vertical>
                    </VerticalToHorizontal>
                </Container>
                <VerticalToHorizontal verticalUpTo='small'>
                    {this.renderTransactions(TRANSACTIONS.TITLE.INPUTS, pegnetDTransactionData)}
                    {this.renderTransactions(
                        TRANSACTIONS.TITLE.OUTPUTS, pegnetDTransactionData)}
                </VerticalToHorizontal>
            </div>
        );
    }
}

export default dataLoader(({match}) => buildJsonRPCData(match.params.hash))(TransactionPage);
