import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {autobind} from 'core-decorators';
import styles from './styles.css';

@withRouter
@autobind
export default class Table extends Component {
    static propTypes = {
        columns: PropTypes.arrayOf(PropTypes.string).isRequired,
        children: PropTypes.func.isRequired,
        ellipsis: PropTypes.number,
        centerAlign: PropTypes.number,
        type: PropTypes.oneOf(['primary', 'secondary']),
    };

    static defaultProps = {
        type: 'primary',
    };

    handleClick(event) {
        // Do not trigger link if selecting
        if (window.getSelection().toString()) return;

        let node = event.target;
        while (node) {
            const tagName = node.tagName.toLowerCase();
            if (tagName === 'a') return; // Already clicked on a link
            if (tagName === 'tr') {
                // Trigger first link in the clicked row
                const anchor = node.querySelector('a');
                if (anchor) this.props.history.push(anchor.getAttribute('href'));
                break;
            }
            node = node.parentNode;
        }
    }

    render() {
        return (
            <table className={styles[this.props.type]} onClick={this.handleClick}>
                <thead>
                    <tr>
                        {this.props.columns.map((header, index) => {
                            const className = [styles.header];
                            let style;

                            if (index >= this.props.centerAlign) {
                                className.push(styles.center);
                            }

                            if (this.props.fixedWidth && index >= this.props.fixedWidth.start) {
                                className.push(styles.hasWidth);
                                style = {minWidth: this.props.fixedWidth.width};
                            }

                            return (
                                <th key={header} className={className.join(' ')} style={style}>{header}</th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {this.props.rows.map(row => {
                        const tr = this.props.children(row);
                        return React.cloneElement(tr, {
                            children: tr.props.children.map((cell, index) => {
                                if (!cell) return;

                                const className = [];

                                if (index === this.props.ellipsis) {
                                    className.push(styles.ellipsis);
                                }

                                if (index >= this.props.centerAlign) {
                                    className.push(styles.center);
                                }

                                if (this.props.fixedWidth && index >= this.props.fixedWidth.start) {
                                    className.push(styles.hasWidth);
                                }

                                if (className.length) {
                                    return React.cloneElement(cell, {
                                        className: className.join(' '),
                                    });
                                }

                                return cell;
                            }),
                        });
                    })}
                </tbody>
            </table>
        );
    }
}
