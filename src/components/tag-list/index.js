import React, {Component} from 'react';
import styles from './styles.css';

export default class TagList extends Component {
    render() {
        const tags = [];
        this.props.children.forEach(tag => {
            // Use random as key to allow for duplicated tags
            tags.push(<div key={Math.random()} className={styles.tag}>{tag}</div>);
            tags.push(' ');
        });
        return <div>{tags}</div>;
    }
}
