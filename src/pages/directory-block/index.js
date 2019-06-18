import React, {Component} from 'react';
import classNames from 'classnames';
import {dataLoader} from 'hocs/data-loader';
import {currentTimezone, formatDateLong} from 'utils/date';
import Container from 'components/container';
import {Vertical, Box, VerticalToHorizontal} from 'components/layout';
import Label from 'components/label';
import Hash from 'components/hash';
import DirectoryBlockLink from 'components/directory-block-link';
import BlockHeight from 'components/block-height';
import Button from 'components/button';
import JsonPopup from 'components/json-popup';
import styles from './styles.css';

@dataLoader([({match}) => `/dblocks/${match.params.hash}`, ({match}) => `/anchors/${match.params.hash}`])
export default class DirectoryBlockPage extends Component {
    state = {
        showJsonPopup: false,
    };
    getBlocks() {
        const {ablock, ecblock, fblock, eblocks} = this.props.data;

        const hashes = [
            {type: 'ablock', label: 'ADMIN BLOCK', value: ablock.hash},
            {type: 'ecblock', label: 'ENTRY CREDIT BLOCK', value: ecblock.hash},
            {type: 'fblock', label: 'FACTOID BLOCK', value: fblock.keymr},
        ];

        eblocks.forEach(eblock => {
            hashes.push(
                {type: 'eblock', label: 'ENTRY BLOCK', value: eblock.keymr, merge: true, key: eblock.keymr},
                {type: 'chain', label: 'CHAIN', value: eblock.chain.chain_id, key: eblock.chain.chain_id},
            );
        });

        return hashes;
    }

    render() {
        const {data} = this.props;
        const blockCount = data.eblocks.length + 3; // 3 == admin, entry credit, factoid blocks
        const network = data.anchors[0].network === 'factom' ? 'public factom' : 'bitcoin';
        return (
            <div>
                <Container primary title='Directory block'>
                    <VerticalToHorizontal verticalUpTo='medium'>
                        <Vertical>
                            <BlockHeight>
                                {data.height}
                            </BlockHeight>
                            <div>
                                <Label>START TIME ({currentTimezone()})</Label>
                                {formatDateLong(data.started_at)}
                            </div>
                        </Vertical>
                        <Vertical>
                            <Box type={data.next ? 'fill' : 'disabled'}>
                                <Label>NEXT DIRECTORY BLOCK</Label>
                                <DirectoryBlockLink>{data.next}</DirectoryBlockLink>
                            </Box>
                            <Box type='outline'>
                                <Label>KEYMR</Label>
                                <Hash type='dblock'>{data.keymr}</Hash>
                            </Box>
                            <Box type='fill'>
                                <Label>PREVIOUS DIRECTORY BLOCK</Label>
                                <DirectoryBlockLink>{data.prev}</DirectoryBlockLink>
                            </Box>
                            <div className={styles.anchorBlock}>
                                <Label>{(`Anchor - ${network}`).toUpperCase()}</Label>
                                <Button
                                    disabled={data.anchors[0].status === 'pending'}
                                    title={'View JSON'}
                                    className={styles.blockchainButton}
                                    onClick={() => this.setState({showJsonPopup: true})}
                                />
                            </div>
                            {
                                data.anchors[0].network === 'factom' &&
                                    <React.Fragment>
                                        <Box type={data.anchors[0].status === 'confirmed' ? 'fill' : 'disabled'}>
                                            <Label>PARENT DIRECTORY BLOCK</Label>
                                            <DirectoryBlockLink isLink={false}>
                                                {data.anchors[0].dblock}
                                            </DirectoryBlockLink>
                                        </Box>
                                        <Box type={data.anchors[0].status === 'confirmed' ? 'fill' : 'disabled'}>
                                            <Label>PARENT ENTRY BLOCK</Label>
                                            <DirectoryBlockLink type='eblock' isLink={false}>
                                                {data.anchors[0].eblock}
                                            </DirectoryBlockLink>
                                        </Box>
                                        <Box type={data.anchors[0].status === 'confirmed' ? 'outline' : 'disabled'}>
                                            <Label>ANCHOR</Label>
                                            <DirectoryBlockLink type='anchor'>
                                                {data.anchors[0].status ===
                                                    'confirmed' ? data.anchors[0] : null
                                                }
                                            </DirectoryBlockLink>
                                        </Box>
                                    </React.Fragment>
                            }
                            {
                                data.anchors[0].network === 'bitcoin' &&
                                    <React.Fragment>
                                        <Box type={data.anchors[0].status === 'confirmed' ? 'fill' : 'disabled'}>
                                            <Label>BLOCK</Label>
                                            <DirectoryBlockLink type='block'>
                                                {data.anchors[0]}
                                            </DirectoryBlockLink>
                                        </Box>
                                        <Box type={data.anchors[0].status === 'confirmed' ? 'outline' : 'disabled'}>
                                            <Label>ANCHOR</Label>
                                            <DirectoryBlockLink type='btc'>
                                                {data.anchors[0]}
                                            </DirectoryBlockLink>
                                        </Box>
                                    </React.Fragment>
                            }
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
                {
                    this.state.showJsonPopup &&
                        <JsonPopup
                            data={data.anchors}
                            show
                            onClose={() => this.setState({showJsonPopup: !this.state.showJsonPopup})}
                        />
                }
            </div>
        );
    }
}
