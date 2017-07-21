import React, {Component} from 'react';
import Label from 'components/label';
import styles from './styles.css';

export default class BlockHeight extends Component {
    render() {
        return (
            <div>
                <Label>HEIGHT</Label>
                <div className={styles.value}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
