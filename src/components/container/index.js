import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

export default class Container extends Component {
    static propTypes = {
        primary: PropTypes.bool,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        count: PropTypes.number,
        actions: PropTypes.node,
    };

    render() {
        const ContentType = this.props.primary ? 'main' : 'section';
        return (
            <ContentType className={styles.root}>
                <header className={styles.header}>
                    {this.props.title && (
                        <h1 className={styles.title}>
                            {this.props.title}
                        </h1>
                    )}
                    {this.props.count !== undefined && (
                        <div className={styles.count}>
                            {this.props.count}
                        </div>
                    )}
                    {this.props.actions && (
                        <div className={styles.actions}>
                            {this.props.actions}
                        </div>
                    )}
                    {this.props.subtitle && (
                        <div className={styles.subtitle}>
                            {this.props.subtitle}
                        </div>
                    )}
                </header>
                {this.props.children}
            </ContentType>
        );
    }
}
