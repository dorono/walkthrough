import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import styles from './styles.css';

const extraPages = 3;

export default class Pagination extends Component {
    static propTypes = {
        count: PropTypes.number.isRequired,
        limit: PropTypes.number.isRequired,
        offset: PropTypes.number.isRequired,
    };

    getPaginatedUrl(page) {
        const qs = {...queryString.parse(window.location.search), page};
        return `${window.location.pathname}?${queryString.stringify(qs)}`;
    }

    render() {
        const totalPages = Math.ceil(this.props.count / this.props.limit);
        const currentPage = Math.floor(this.props.offset / this.props.limit) + 1;

        const pages = [currentPage];
        let extra;

        extra = extraPages;
        while (extra-- > 0) {
            const prevPage = pages[0] - 1;
            if (prevPage > 0) pages.unshift(prevPage);
            else break;
        }

        extra = extraPages;
        while (extra-- > 0) {
            const nextPage = pages[pages.length - 1] + 1;
            if (nextPage < totalPages) pages.push(nextPage);
            else break;
        }

        if (pages[0] > 2) pages.unshift(1, 'dots');
        else if (pages[0] !== 1) pages.unshift(1);

        if (pages[pages.length - 1] < totalPages - 1) pages.push('dots', totalPages);
        else if (pages[pages.length - 1] < totalPages) pages.push(totalPages);

        return (
            <div className={styles.root}>
                {currentPage > 1 && (
                    <Link className={styles.previous} to={this.getPaginatedUrl(currentPage - 1)}>
                        <span>Previous</span>
                    </Link>
                )}
                {pages.map(page => {
                    if (page === 'dots') return <span key={Math.random()} className={styles.dots}>...</span>;
                    return (
                        <Link
                            key={page}
                            className={page === currentPage ? styles.active : styles.link}
                            to={this.getPaginatedUrl(page)}>
                            {page}
                        </Link>
                    );
                })}
                {currentPage < totalPages && (
                    <Link className={styles.next} to={this.getPaginatedUrl(currentPage + 1)}>
                        <span>Next</span>
                    </Link>
                )}
            </div>
        );
    }
}
