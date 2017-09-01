import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

export default class ExternalIds extends Component {
    static propTypes = {
        fadeOut: PropTypes.bool,
    };

    render() {
        const ids = [];
        this.props.children.forEach(name => {
            // Use random as key to allow for duplicated ids
            ids.push(<div key={Math.random()} className={styles.item}>{name}</div>);
            ids.push(' ');
        });
        return (
            <div className={this.props.fadeOut ? styles.fadeOut : styles.multiline}>
                {ids}
            </div>
        );
    }
}
