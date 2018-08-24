import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {autobind} from 'core-decorators';
import {presets} from 'react-motion';
import {Collapse} from 'react-collapse';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import classNames from 'classnames';
import withDataEncoding from 'hocs/with-data-encoding';

import ExpansibleContainer from 'components/expansible-container';
import JsonViewer from 'components/json-viewer/';
import HexViewer from 'components/hex-viewer/';
import Tabs from 'components/tabs/';

import styles from './styles.css';

import collapseIcon from './assets/icon-collapse.svg';
import expandIcon from './assets/icon-expand.svg';
import copyIcon from './assets/icon-copy.svg';

const VIEWERS = {
    json: JsonViewer,
    hex: HexViewer,
};

const VIEWER_COLLAPSED_HEIGHT = 200;

// TODO Some of the render methods in this component should be componentized
@withDataEncoding
class EntryContent extends Component {
    static propTypes = {
        // The content to display, an array with diferent encoding formats
        data: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.any,
        })).isRequired,
        className: PropTypes.string,
    };

    state = {
        selected: this.getDefaultEncoding(),
        expanded: false,
        showExpandButton: false,
        showViewerGradient: false,
        showCopiedToast: false,
    };

    getDefaultEncoding() {
        const {data} = this.props;
        const withLabel = label => encoding => encoding.label === label;
        return data.find(withLabel('json')) || data.find(withLabel('hex')) || data.find(withLabel('raw'));
    }

    @autobind
    showToast() {
        this.setState({showCopiedToast: true});
        setTimeout(() => this.setState({showCopiedToast: false}), 1500);
    }

    @autobind
    changeSelection(item) {
        this.setState({selected: item});
    }

    @autobind
    toggleExpanded() {
        this.setState(state => ({expanded: !state.expanded}));
    }

    @autobind
    handleViewerSize(size) {
        // TODO Refactor this and manage gradient inside ExpansibleContainer
        if (size.height >= VIEWER_COLLAPSED_HEIGHT) {
            return this.setState({showViewerGradient: !this.state.expanded, showExpandButton: true});
        }
        return this.setState({showViewerGradient: false, showExpandButton: false});
    }

    renderTabs() {
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
        const buttonText = `${actionText} content`;
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
            <CopyToClipboard text={selected.value}>
                <span className={classNames(styles.button, styles.buttonCopy)} onClick={this.showToast}>
                    <span className={classNames(styles.toast, {[styles.showToast]: this.state.showCopiedToast})}>
                        Copied
                    </span>
                    <img src={copyIcon} alt='Copy Content' />
                    Copy content
                </span>
            </CopyToClipboard>
        );
    }

    renderDefaultViewer(data) {
        return <div className={styles.defaultViewer}>{data}</div>;
    }

    renderViewer() {
        const {selected, expanded, showViewerGradient} = this.state;
        const Viewer = VIEWERS[this.state.selected.label];
        return (
            <Collapse
                isOpened
                springConfig={presets.noWobble}>
                <ExpansibleContainer
                    expand={expanded}
                    collapsedSize={VIEWER_COLLAPSED_HEIGHT}
                    withGradient={showViewerGradient}
                    className={styles.viewerContainer}
                    onSize={this.handleViewerSize}>
                    {Viewer
                        ? <Viewer
                            data={selected.value}
                            style={!this.state.expanded && {overflow: 'hidden'}}
                          />
                        : this.renderDefaultViewer(selected.value)}
                </ExpansibleContainer>
            </Collapse>
        );
    }

    render() {
        const {className} = this.props;
        const {showExpandButton} = this.state;
        return (
            <div className={classNames(styles.root, className)}>
                <div className={classNames(styles.header)}>
                    {this.renderTabs()}
                    <div className={styles.actionsContainer}>
                        {showExpandButton && this.renderToggleExpandButton()}
                        {this.renderCopyContentButton()}
                    </div>
                </div>
                {this.renderViewer()}
            </div>
        );
    }

}

export default EntryContent;
