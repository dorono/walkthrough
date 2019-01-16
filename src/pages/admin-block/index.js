import React, {Component} from 'react';
import {dataLoader} from 'hocs/data-loader';
import Container from 'components/container';
import {Vertical, Box} from 'components/layout';
import EntriesTable from 'components/entries-table';
import Label from 'components/label';
import Hash from 'components/hash';
import Monospaced from 'components/monospaced';
import DirectoryBlockLink from 'components/directory-block-link';

export class AdminBlockPage extends Component {
    renderEntryContent(row) {
        const renderItems = items => (
            <ul>
                {Object.entries(items).map(([key, value]) => renderItem(key, value))}
            </ul>
        );

        const renderItem = (key, value) => {
            if (value.constructor === Object) {
                return (
                    <li key={key}>
                        <strong>{key}</strong>: {renderItems(value)}
                    </li>
                );
            }

            if (value.constructor === Array) {
                return (
                    <li key={key}>
                        <strong>{key}</strong>: {renderItems(value.reduce((o, v, i) => ({...o, [i]: v}), {}))}
                    </li>
                );
            }

            return <li key={key}><strong>{key}</strong>: {value}</li>;
        };

        return (
            <Monospaced>
                {renderItems(row.content)}
            </Monospaced>
        );
    }

    render() {
        return (
            <div>
                <Container primary title='Admin block'>
                    <Vertical>
                        <Box type='outline'>
                            <Label>HASH</Label>
                            <Hash type='ablock'>{this.props.data.hash}</Hash>
                        </Box>
                        <Box type='fill'>
                            <Label>PARENT DIRECTORY BLOCK</Label>
                            <DirectoryBlockLink>{this.props.data.dblock}</DirectoryBlockLink>
                        </Box>
                    </Vertical>
                </Container>
                <EntriesTable
                    entriesUrl={`/ablocks/${this.props.data.hash}/entries`}
                    pageParams={this.props.location.search}
                    contentColumnName='CONTENT'
                    renderContent={this.renderEntryContent}
                    hasLink={false}
                />
            </div>
        );
    }
}

export default dataLoader(
    ({match}) => `/ablocks/${match.params.hash}`,
    {ignoreQueryString: true},
)(AdminBlockPage);

