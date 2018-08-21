import React, {Component} from 'react';
import {load} from 'decorators';
import {currentTimezone, formatDateLong} from 'utils/date';
import Container from 'components/container';
import {Horizontal, Vertical, Box} from 'components/layout';
import Table from 'components/table';
import Label from 'components/label';
import Hash from 'components/hash';
import DirectoryBlockLink from 'components/directory-block-link';
import FactoidBlockLink from 'components/factoid-block-link';
import Amount from 'components/amount';

@load(({match}) => `/transactions/${match.params.hash}`)
export default class Transaction extends Component {
    getTransactionAmount(transaction) {
        let amount;
        let unit;
        if (transaction.fct_amount) {
            amount = transaction.fct_amount;
            unit = 'FCT';
        } else if (transaction.ec_amount) {
            amount = transaction.ec_amount;
            unit = 'EC';
        }
        return {amount, unit};
    }

    renderTransactions(title, transactions) {
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
                        const {amount, unit} = this.getTransactionAmount(row);
                        return (
                            <tr key={row.address + amount}>
                                <td><Hash type='address'>{row.user_address}</Hash></td>
                                <td><Amount unit={unit}>{amount}</Amount></td>
                            </tr>
                        );
                    }}
                </Table>
            </Container>
        );
    }

    render() {
        return (
            <div>
                <Container primary title='Factoid Transaction'>
                    <Horizontal>
                        <Vertical>
                            <Box type='outline'>
                                <Vertical>
                                    <div>
                                        <Label>INPUTS</Label>
                                        <Amount unit='FCT'>{this.props.data.fct_total_inputs}</Amount>
                                    </div>
                                    <div>
                                        <Label>OUTPUTS</Label>
                                        <Amount unit='FCT'>{this.props.data.fct_total_outputs}</Amount>
                                    </div>
                                    <div>
                                        <Label>ECS CREATED</Label>
                                        <Amount unit='EC'>{this.props.data.ec_created}</Amount>
                                    </div>
                                    <div>
                                        <Label>FEE</Label>
                                        <Amount unit='FCT'>{this.props.data.fct_fee}</Amount>
                                    </div>
                                </Vertical>
                            </Box>
                        </Vertical>
                        <Vertical>
                            <Box type='outline'>
                                <Label>TRANSACTION ID</Label>
                                <Hash type='tx'>{this.props.data.tx_id}</Hash>
                            </Box>
                            <Box type='fill'>
                                <Label>PARENT FACTOID BLOCK</Label>
                                <FactoidBlockLink>{this.props.data.fblock}</FactoidBlockLink>
                            </Box>
                            <Box type='fill'>
                                <Label>PARENT DIRECTORY BLOCK</Label>
                                <DirectoryBlockLink>{this.props.data.dblock}</DirectoryBlockLink>
                            </Box>
                            <Box>
                                <Label>CREATED ({currentTimezone()})</Label>
                                {formatDateLong(this.props.data.created_at)}
                            </Box>
                        </Vertical>
                    </Horizontal>
                </Container>
                <Horizontal>
                    {this.renderTransactions('Inputs', this.props.data.inputs)}
                    {this.renderTransactions('Outputs', this.props.data.outputs)}
                </Horizontal>
            </div>
        );
    }
}
