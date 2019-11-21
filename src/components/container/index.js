import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import AlertBarLegend from 'components/alert-bar-legend';
import styles from './styles.css';

@autobind
export default class Container extends Component {
    static propTypes = {
        primary: PropTypes.bool,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        count: PropTypes.number,
        actions: PropTypes.node,
        showFullWidthBanner: PropTypes.bool,
        alertBarType: PropTypes.string,
        alertBarComponent: PropTypes.any,
    };

    static defaultProps = {
        showFullWidthBanner: false,
    };

    displayFullWidthBanner = () => this.props.showFullWidthBanner || !!this.props.alertBarType;

    setFullwidth = (styleValue, full) => {
        const fullWidthStatus = full ? 'setFullWidth' : 'setWithPadding';

        if (this.displayFullWidthBanner()) {
            return `${styleValue} ${styles[fullWidthStatus]}`;
        }

        return styleValue;
    };

    render() {
        return (
            <div
                className={classNames(
                    this.setFullwidth(styles.root, true),
                    this.props.primary ? 'main' : 'section',
                )}>
                <header className={this.setFullwidth(styles.header)}>
                    {this.props.title && <h1 className={styles.title}>{this.props.title}</h1>}
                    {this.props.count !== undefined && (
                        <div className={styles.count}>{this.props.count}</div>
                    )}
                    {this.props.actions && (
                        <div className={styles.actions}>{this.props.actions}</div>
                    )}
                    {this.props.subtitle && (
                        <div className={styles.subtitle}>{this.props.subtitle}</div>
                    )}
                </header>
                <AlertBarLegend
                    show={this.displayFullWidthBanner()}
                    highlightBanner
                    alertBarComponent={this.props.alertBarComponent}
                    alertBarType={this.props.alertBarType}
                />
                {this.props.children}
            </div>
        );
    }
}
