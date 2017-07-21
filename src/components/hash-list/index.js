import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Label from 'components/label';
import Hash from 'components/hash';
import styles from './styles.css';

export default class HashList extends Component {
    static propTypes = {
        hashes: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            merge: PropTypes.bool,
        })).isRequired,
    };

    render() {
        return (
            <div>
                {this.props.hashes.map(hash => (
                    <div key={hash.value} className={classNames(styles.item, {[styles.merge]: hash.merge})}>
                        <Label>{hash.label}</Label>
                        <Hash type={hash.type}>{hash.value}</Hash>
                    </div>
                ))}
            </div>
        );
    }
}
