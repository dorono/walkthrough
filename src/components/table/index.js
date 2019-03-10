import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {autobind} from 'core-decorators';
import classNames from 'classnames';
import styles from './styles.css';

export class Table extends Component {
    static propTypes = {
        columns: PropTypes.arrayOf(PropTypes.string).isRequired,
        children: PropTypes.func.isRequired,
        ellipsis: PropTypes.arrayOf(PropTypes.number),
        centerAlign: PropTypes.number,
        leftPadding: PropTypes.number,
        interactive: PropTypes.bool,
        type: PropTypes.oneOf(['primary', 'secondary']),
        responsive: PropTypes.bool,
    };

    static defaultProps = {
        type: 'primary',
        interactive: true,
        responsive: false,
    };

    @autobind
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
        if (this.props.rows.length === 0) return null;

        return (
            <table
                onClick={this.handleClick}
                className={classNames(styles[this.props.type], {
                    [styles.interactive]: this.props.interactive,
                    [styles.responsive]: this.props.responsive,
                })}>
                <thead className={styles.left}>
                    <tr>
                        {this.props.columns.map((header, index) => {
                            const className = [styles.header];
                            let style;

                            if (index >= this.props.centerAlign) {
                                className.push(styles.center);
                            } else if (index === this.props.leftPadding) {
                                className.push(styles.leftPadding);
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
                    {this.props.rows.map((row, index) => {
                        const tr = this.props.children(row, index);
                        return React.cloneElement(tr, {},
                            tr.props.children.map((cell, index) => {
                                if (!cell) return null;

                                const className = [];

                                if (this.props.ellipsis && this.props.ellipsis.includes(index)) {
                                    className.push(styles.ellipsis);
                                }

                                if (index >= this.props.centerAlign) {
                                    className.push(styles.center);
                                }

                                if (this.props.fixedWidth && index >= this.props.fixedWidth.start) {
                                    className.push(styles.hasWidth);
                                }

                                if (className.length) {
                                    let newClassName = className.join(' ');
                                    if (cell.props.className) {
                                        newClassName += ` ${cell.props.className}`;
                                    }

                                    return React.cloneElement(cell, {
                                        className: newClassName,
                                        key: index,
                                    });
                                }

                                return cell;
                            }),
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

export default withRouter(Table);
