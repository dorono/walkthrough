import React, {Component} from 'react';
import styles from './styles.css';

export default class TagList extends Component {
    render() {
        const tags = [];
        this.props.children.forEach(tag => {
            tags.push(<div key={tag} className={styles.tag}>{tag}</div>);
            tags.push(' ');
        });
        return <div>{tags}</div>;
    }
}
