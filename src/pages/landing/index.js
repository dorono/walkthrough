import React, {Component} from 'react';
import Container from 'components/container';
import styles from './styles.css';

export default class Landing extends Component {
    render() {
        return (
            <Container primary title="pExplorer">
                <div className={styles.root}>
                    <h2>
                        To get started you can search by an Address or
                        Transaction above.
                    </h2>
                </div>
            </Container>
        );
    }
}
