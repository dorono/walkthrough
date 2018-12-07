import React, {Component} from 'react';
import classNames from 'classnames';
import {dataLoader} from 'decorators';

import {currentTimezone, formatDateLong} from 'utils/date';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import Label from 'components/label';
import Hash from 'components/hash';
import ExternalIdList from 'components/external-id-list';
import EntryBlockLink from 'components/entry-block-link';
import EntryContent from 'components/entry-content/index';
import {STAGE_PENDING, STAGE_PENDING_ENTRY_TEXT, STAGE_NOT_AVAILABLE} from 'stages';

import globalStyles from 'styles/index.css';
import styles from './styles.css';
import {ENTRY_DETAIL_TYPE} from './types';

export class Entry extends Component {
    static propTypes = ENTRY_DETAIL_TYPE.isRequired;

    render() {
        const isPending = this.props.data.stage === STAGE_PENDING;

        return (
            <Container
                primary
                title='Entry'
                showFullWidthBanner={isPending}
                fullWidthBannerText={STAGE_PENDING_ENTRY_TEXT}>
                <Vertical>
                    <Box type='outline'>
                        <Label>IMMUTABILITY STAGE</Label>
                        <span className={globalStyles.capitalized}>{this.props.data.stage}</span>
                    </Box>
                    <Box type='outline'>
                        <Label>HASH</Label>
                        <Hash type='entry' extraArgs={{chain: this.props.data.chain.chain_id}}>
                            {this.props.data.entry_hash}
                        </Hash>
                    </Box>
                    <Box type='fill'>
                        <Label>CHAIN</Label>
                        <Hash type='chain'>{this.props.data.chain.chain_id}</Hash>
                    </Box>
                    <Box type={isPending ? 'disabled' : 'fill'}>
                        <Label>PARENT ENTRY BLOCK</Label>
                        <EntryBlockLink>
                            {this.props.data.eblock}
                        </EntryBlockLink>
                    </Box>
                    <Box>
                        <Label
                            className={classNames({[globalStyles.disabledText]: isPending})}>
                            CREATED ({currentTimezone()})
                        </Label>
                        <span className={classNames({[globalStyles.disabledText]: isPending})}>
                            {isPending ? STAGE_NOT_AVAILABLE : formatDateLong(this.props.data.created_at)}
                        </span>
                    </Box>
                    <Box>
                        <Label>EXTERNAL IDS</Label>
                        <ExternalIdList externalIds={this.props.data.external_ids} />
                    </Box>
                    <Box>
                        <Label className={styles.contentTitle}>CONTENT</Label>
                        <EntryContent data={this.props.data.content} />
                    </Box>
                </Vertical>
            </Container>
        );
    }
}

export default dataLoader(
    ({match}) => `/chains/${match.params.chain}/entries/${match.params.hash}`,
)(Entry);
