import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from 'components/icon';
import styles from './styles.css';

export default class PendingLegend extends Component {
    static propTypes = {
        show: PropTypes.bool,
        highlightBanner: PropTypes.bool,
        fullWidthBannerText: PropTypes.string,
    };

    static defaultProps = {
        show: false,
        highlightBanner: false,
    };

    render() {
        const {show, highlightBanner, fullWidthBannerText} = this.props;

        return (
            show
                ? (
                    <div className={classNames(
                        styles.pendingLegend,
                        {[styles.pendingLegendHighlight]: highlightBanner})}>
                        <Icon
                            className={styles.pendingLegendIcon}
                            name='Schedule'
                        />
                        <span>
                            <strong>PENDING: </strong> {fullWidthBannerText}
                        </span>
                    </div>
                )

                : null
        );
    }
}
