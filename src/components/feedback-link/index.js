import React, {Component} from 'react';
import styles from './styles.css';

export default class FeedbackLink extends Component {
    render() {
        return (
            <a className={styles.root} href={this.props.feedbackUrl} target='_blank'>
                <span className={styles.question}>
                    Have some tips to improve the explorer?
                </span>
                {' '}
                <span className={styles.cta}>
                    SEND US YOUR FEEDBACK
                </span>
            </a>
        );
    }
}
