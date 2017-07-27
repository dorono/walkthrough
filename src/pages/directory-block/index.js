import React, {Component} from 'react';
import classNames from 'classnames';
import {load} from 'decorators';
import {currentTimezone, formatDate} from 'utils/date';
import Container from 'components/container';
import {Horizontal, Vertical, Box} from 'components/layout';
import Label from 'components/label';
import Hash from 'components/hash';
import BlockHeight from 'components/block-height';
import styles from './styles.css';

@load('/data/dblock.json')
export default class DirectoryBlock extends Component {
    getBlocks() {
        const {ablock, ecblock, fblock, eblocks} = this.props.data;

        const hashes = [
            {type: 'ablock', label: 'ADMIN BLOCK', value: ablock.hash},
            {type: 'ecblock', label: 'ENTRY CREDIT BLOCK', value: ecblock.hash},
            {type: 'fblock', label: 'FACTOID BLOCK', value: fblock.hash},
        ];

        eblocks.forEach(eblock => {
            hashes.push(
                {type: 'eblock', label: 'ENTRY BLOCK', value: eblock.hash, merge: true},
                {type: 'chain', label: 'CHAIN', value: eblock.chain.chain_id},
            );
        });

        return hashes;
    }

    render() {
        const blockCount = this.props.data.eblocks.length + 3; // 3 == admin, entry credit, factoid blocks
        return (
            <div>
                <Container primary title='Directory block'>
                    <Horizontal>
                        <Vertical>
                            <BlockHeight>
                                {this.props.data.height}
                            </BlockHeight>
                            <div>
                                <Label>START TIME ({currentTimezone()})</Label>
                                {formatDate(this.props.data.started_at)}
                            </div>
                        </Vertical>
                        <Vertical>
                            <Box style='fill'>
                                <Label>NEXT DIRECTORY BLOCK</Label>
                                <Hash type='dblock'>{this.props.data.next.keymr}</Hash>
                            </Box>
                            <Box style='outline'>
                                <Label>KEYMR</Label>
                                <Hash type='dblock'>{this.props.data.keymr}</Hash>
                            </Box>
                            <Box style='fill'>
                                <Label>PREVIOUS DIRECTORY BLOCK</Label>
                                <Hash type='dblock'>{this.props.data.prev.keymr}</Hash>
                            </Box>
                            <Box style='fill'>
                                <Label>BTC TRANSACTION</Label>
                                <Hash type='btc'>{this.props.data.btc_transaction}</Hash>
                            </Box>
                            <Box style='fill'>
                                <Label>BTC ANCHOR ENTRY</Label>
                                <Hash type='entry'>{this.props.data.btc_anchor_entry}</Hash>
                            </Box>
                        </Vertical>
                    </Horizontal>
                </Container>
                <Container title='Blocks' subtitle='(included in this directory block)' count={blockCount}>
                    {this.getBlocks().map(hash => (
                        <div key={hash.value} className={classNames(styles.block, {[styles.merge]: hash.merge})}>
                            <Label>{hash.label}</Label>
                            <Hash type={hash.type}>{hash.value}</Hash>
                        </div>
                    ))}
                </Container>
            </div>
        );
    }
}
