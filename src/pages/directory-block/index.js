import React, {Component} from 'react';
import classNames from 'classnames';
import {dataLoader} from 'decorators';
import {currentTimezone, formatDateLong} from 'utils/date';
import Container from 'components/container';
import {Vertical, Box, VerticalToHorizontal} from 'components/layout';
import Label from 'components/label';
import Hash from 'components/hash';
import DirectoryBlockLink from 'components/directory-block-link';
import BlockHeight from 'components/block-height';
import styles from './styles.css';

@dataLoader(({match}) => `/dblocks/${match.params.hash}`)
export default class DirectoryBlock extends Component {
    getBlocks() {
        const {ablock, ecblock, fblock, eblocks} = this.props.data;

        const hashes = [
            {type: 'ablock', label: 'ADMIN BLOCK', value: ablock.hash},
            {type: 'ecblock', label: 'ENTRY CREDIT BLOCK', value: ecblock.hash},
            {type: 'fblock', label: 'FACTOID BLOCK', value: fblock.keymr},
        ];

        eblocks.forEach(eblock => {
            hashes.push(
                {type: 'eblock', label: 'ENTRY BLOCK', value: eblock.keymr, merge: true},
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
                    <VerticalToHorizontal verticalUpTo='medium'>
                        <Vertical>
                            <BlockHeight>
                                {this.props.data.height}
                            </BlockHeight>
                            <div>
                                <Label>START TIME ({currentTimezone()})</Label>
                                {formatDateLong(this.props.data.started_at)}
                            </div>
                        </Vertical>
                        <Vertical>
                            <Box type={this.props.data.next ? 'fill' : 'disabled'}>
                                <Label>NEXT DIRECTORY BLOCK</Label>
                                <DirectoryBlockLink>{this.props.data.next}</DirectoryBlockLink>
                            </Box>
                            <Box type='outline'>
                                <Label>KEYMR</Label>
                                <Hash type='dblock'>{this.props.data.keymr}</Hash>
                            </Box>
                            <Box type='fill'>
                                <Label>PREVIOUS DIRECTORY BLOCK</Label>
                                <DirectoryBlockLink>{this.props.data.prev}</DirectoryBlockLink>
                            </Box>
                            <Box type={this.props.data.btc_transaction ? 'fill' : 'disabled'}>
                                <Label>BTC TRANSACTION</Label>
                                <Hash type='btc'>{this.props.data.btc_transaction}</Hash>
                            </Box>
                            <Box type={this.props.data.btc_anchor_entry ? 'fill' : 'disabled'}>
                                <Label>BTC ANCHOR ENTRY</Label>
                                {this.props.data.btc_anchor_entry
                                    ? (
                                        <Hash
                                            type='entry'
                                            extraArgs={{chain: this.props.data.btc_anchor_entry.chain.chain_id}}>
                                            {this.props.data.btc_anchor_entry.entry_hash}
                                        </Hash>
                                    )
                                    : <Hash />
                                }
                            </Box>
                        </Vertical>
                    </VerticalToHorizontal>
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
