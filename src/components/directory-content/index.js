import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import classNames from 'classnames';

import ExpansibleContainer from 'components/expansible-container';
import JsonViewer from 'components/json-viewer';
import Tabs from 'components/tabs';

import styles from './styles.css';

import collapseIcon from './assets/icon-collapse.svg';
import expandIcon from './assets/icon-expand.svg';
import copyIcon from './assets/icon-copy.svg';

const VIEWER_COLLAPSED_HEIGHT = 200;

class DirectoryContent extends Component {
    static propTypes = {
        // The content to display, an array with diferent encoding formats
        data: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.any,
        })).isRequired,
        className: PropTypes.string,
    };

    state = {
        selected: this.getDefaultValueSelected(),
        expanded: false,
        showExpandButton: false,
        showCopyButton: false,
        showViewerGradient: false,
        showCopiedToast: false,
    };

    // Select the default data for the correct tab render, for each network environment.
    getDefaultValueSelected() {
        const {data} = this.props;
        // Bitcoin Network
        if (data.length > 2) {
            if (data[0].disabled) {
                return data[1];
            }
            return data[0];
        }
        // Public Factom Network
        return data[0];
    }

    showToast = () => {
        this.setState({showCopiedToast: true});
        setTimeout(() => this.setState({showCopiedToast: false}), 1500);
    }

    changeSelection = item => {
        if (item.label === 'JSON') {
            this.setState({showCopyButton: true});
        } else {
            this.setState({showCopyButton: false});
        }
        this.setState({selected: item}, () => {
            if (item.label !== 'JSON') {
                this.handleViewerSize();
            }
        });
    }

    toggleExpanded = () => this.setState(state => ({expanded: !state.expanded}));

    handleViewerSize = size => {
        const {selected} = this.state;
        if (selected.label === 'JSON') {
            if (size.height >= VIEWER_COLLAPSED_HEIGHT) {
                return this.setState({showExpandButton: true});
            }
        }
        return this.setState({showExpandButton: false});
    }

    renderTabs = () => {
        const {data} = this.props;
        const {selected} = this.state;
        return (
            <Tabs
                items={data}
                selected={selected}
                onItemClick={this.changeSelection}
                className={classNames(styles.tabs)}
            />
        );
    }

    renderToggleExpandButton() {
        const {expanded} = this.state;
        const actionText = expanded ? 'Collapse' : 'Expand';
        const buttonText = `${actionText} JSON`;
        return (
            <span className={styles.button} onClick={this.toggleExpanded}>
                <img src={expanded ? collapseIcon : expandIcon} alt={actionText} />
                {buttonText}
            </span>
        );
    }

    renderCopyContentButton() {
        const {selected} = this.state;
        return (
            <CopyToClipboard text={JSON.stringify(selected.value)}>
                <span className={classNames(styles.button, styles.buttonCopy)} onClick={this.showToast}>
                    <span className={classNames(styles.toast, {[styles.showToast]: this.state.showCopiedToast})}>
                        Copied
                    </span>
                    <img src={copyIcon} alt='Copy Content' />
                    Copy JSON
                </span>
            </CopyToClipboard>
        );
    }

    renderDefaultViewer = data => <div>{data}</div>;

    renderViewer = () => {
        const {selected, expanded} = this.state;
        if (selected.label === 'JSON') {
            return (
                <div>
                    <ExpansibleContainer
                        expand={expanded}
                        collapsedSize={VIEWER_COLLAPSED_HEIGHT}
                        className={styles.viewerContainer}
                        onSize={this.handleViewerSize}>
                        {
                            <div className={styles.jsonContainer}>
                                <JsonViewer
                                    data={JSON.stringify(selected.value)}
                                    style={!this.state.expanded && {overflow: 'hidden'}}
                                />
                            </div>
                        }
                    </ExpansibleContainer>
                </div>
            );
        }
        return this.renderDefaultViewer(selected.value);
    }

    render() {
        const {className} = this.props;
        const {showExpandButton, showCopyButton} = this.state;
        return (
            <div className={classNames(styles.root, className)}>
                <div className={classNames(styles.header)}>
                    {this.renderTabs()}
                    <div className={styles.actionsContainer}>
                        {showExpandButton && this.renderToggleExpandButton()}
                        {showCopyButton && this.renderCopyContentButton()}
                    </div>
                </div>
                {this.renderViewer()}
            </div>
        );
    }

}

export default DirectoryContent;
