import React, {Component} from 'react';
import classNames from 'classnames';

import {dataLoader} from 'hocs/data-loader';
import {currentTimezone, formatDateLong} from 'utils/date';
import Container from 'components/container';
import {Vertical, Box, VerticalToHorizontal} from 'components/layout';
import Label from 'components/label';
import Hash from 'components/hash';
import DirectoryBlockLink from 'components/directory-block-link';
import Table from 'components/table';
import BlockLink from 'components/block-link';
import BlockHeight from 'components/block-height';
import EntryBlockLink from 'components/entry-block-link';
import DirectoryContent from 'components/directory-content';
import styles from './styles.css';

@dataLoader([({match}) => `/dblocks/${match.params.hash}`, ({match}) => `/anchors/${match.params.hash}`])
export default class DirectoryBlockPage extends Component {
    getBlocks() {
        const {ablock, ecblock, fblock, eblocks} = this.props.data;
        const hashes = [
            {
                type: 'ablock',
                label: 'ADMIN BLOCK',
                value: ablock.hash,
                entry_count: ablock.entries.count,
                chain_id: 'n/a',
            },
            {
                type: 'ecblock',
                label: 'ENTRY CREDIT BLOCK',
                value: ecblock.hash,
                entry_count: ecblock.entries.count,
                chain_id: 'n/a',
            },
            {
                type: 'fblock',
                label: 'FACTOID BLOCK',
                value: fblock.keymr,
                entry_count: fblock.transactions.count,
                chain_id: 'n/a',
            },
        ];

        eblocks.forEach(eblock => {
            hashes.push({
                type: 'eblock',
                label: 'ENTRY BLOCK',
                value: eblock.keymr,
                merge: true,
                key: eblock.keymr,
                entry_count: eblock.entries.count,
                chain_id: eblock.chain.chain_id,
            });
        });

        return hashes;
    }

    render() {
        const {data} = this.props;
        const blockCount = data.eblocks.length + 3; // 3 == admin, entry credit, factoid blocks
        const network = data.anchors[0].network === 'factom' ? 'public factom' : 'bitcoin';

        const bitcoinValue =
            (<React.Fragment>
                <Box type={'fill'}>
                    <Label>BLOCK</Label>
                    <BlockLink type='block'>
                        {data.anchors[0]}
                    </BlockLink>
                </Box>
                <Box type={'outline'} className={styles.networkBox}>
                    <Label>ANCHOR</Label>
                    <BlockLink type='bnblock'>
                        {data.anchors[0]}
                    </BlockLink>
                </Box>
            </React.Fragment>);

        const ethereumValue =
            (<React.Fragment>
                <Box type={'fill'}>
                    <Label>BLOCK</Label>
                    <BlockLink type='block'>
                        {data.anchors[1]}
                    </BlockLink>
                </Box>
                <Box type={'outline'} className={styles.networkBox}>
                    <Label>ANCHOR</Label>
                    <BlockLink type='enblock'>
                        {data.anchors[1]}
                    </BlockLink>
                </Box>
            </React.Fragment>);

        const publicFactomValue =
            (<React.Fragment>
                <Box type={'fill'}>
                    <Label>PARENT DIRECTORY BLOCK</Label>
                    <DirectoryBlockLink isLink={false}>
                        {data.anchors[0].dblock}
                    </DirectoryBlockLink>
                </Box>
                <Box type={'fill'} className={styles.networkBox}>
                    <Label>PARENT ENTRY BLOCK</Label>
                    <EntryBlockLink isLink={false}>
                        {data.anchors[0].eblock}
                    </EntryBlockLink>
                </Box>
                <Box type={'outline'} className={styles.networkBox}>
                    <Label>ANCHOR</Label>
                    <BlockLink type='fnblock'>
                        {data.anchors[0]}
                    </BlockLink>
                </Box>
            </React.Fragment>);

        // Build the correct json for the current Network
        const buildNetworkData = () => {
            if (network === 'bitcoin') {
                return [
                    {
                        label: 'Bitcoin',
                        value: bitcoinValue,
                        disabled: data.anchors[0].status !== 'confirmed',
                    },
                    {
                        label: 'Ethereum',
                        value: ethereumValue,
                        disabled: data.anchors[1].status !== 'confirmed',
                    },
                    {
                        label: 'JSON',
                        value: data.anchors,
                        disabled: false,

                    },
                ];
            }
            return [
                {
                    label: 'Public Factom',
                    value: publicFactomValue,
                    disabled: data.anchors[0].status !== 'confirmed',
                },
                {
                    label: 'JSON',
                    value: data.anchors,
                    disabled: false,

                },
            ];
        };

        // Assign the json Data to this variable
        const networkData = buildNetworkData();

        // If the network is disabled or perding, this should render 0 blocks,
        // otherwise, should render the network blocks.
        const renderNetworkBlocks = () => {
            if (network === 'bitcoin' && networkData[0].disabled && networkData[1].disabled) {
                return false;
            }
            if (network === 'public factom' && networkData[0].disabled) {
                return false;
            }
            return true;
        };

        return (
            <div>
                <Container primary title='Directory block'>
                    <VerticalToHorizontal verticalUpTo='medium'>
                        <Vertical className={styles.directoryVertical}>
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
                            {
                                renderNetworkBlocks() ?
                                    <div className={styles.anchorBlock}>
                                        <Label className={styles.contentTitle}>{('ANCHOR(S)')}</Label>
                                        <DirectoryContent data={networkData} />
                                    </div>
                                :
                                    <div className={classNames(styles.anchorBlock, styles.disabled)}>
                                        <Label>{('ANCHOR(S)')}</Label>
                                        <span>Not yet available</span>
                                    </div>
                            }
                        </Vertical>
                    </VerticalToHorizontal>
                </Container>
                <Container title='Blocks' subtitle='(included in this directory block)' count={blockCount}>
                    <Table
                        columns={[
                            'TYPE',
                            'HASH/KEYMR|||HASH',
                            'ASSOCIATED CHAIN|||CHAIN',
                            'ENTRIES',
                        ]}
                        rows={this.getBlocks()}
                        ellipsis={[1, 2]}
                        type='secondary'
                        centerAlign={3}
                        responsive>
                        {(row) => (
                            <tr key={row.value}>
                                <td style={{width: '15%'}}><Label>{row.label}</Label></td>
                                <td style={{width: '35%'}}><Hash type={row.type}>{row.value}</Hash></td>
                                <td style={{width: '35%'}}>
                                    {row.type === 'eblock'
                                    ? (<Hash type='chain'>{row.chain_id}</Hash>)
                                    : <span>{row.chain_id}</span>
                                    }
                                </td>
                                <td style={{width: '5%', textAlign: 'center'}}>{row.entry_count}</td>
                            </tr>
                        )}
                    </Table>

                </Container>
            </div>
        );
    }
}
