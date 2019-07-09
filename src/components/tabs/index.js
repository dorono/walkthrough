import React from 'react';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';

import styles from './styles.css';

const Tabs = ({items, onItemClick, selected, className}) => {
    const isSelected = item => isEqual(item, selected);

    const renderItem = (item, idx) => {
        const isSelectedItem = isSelected(item);
        return (
            <div
                key={idx}
                className={
                    classNames(styles.tab,
                        {[styles.selected]: isSelectedItem},
                        !isSelectedItem && item.disabled ? styles.disabled : null)}
                onClick={() => !isSelectedItem && onItemClick(item)}>
                {item.label}
            </div>
        );
    };

    return (
        <div className={classNames(styles.root, className)}>
            {items.map(renderItem)}
        </div>
    );
};

export default Tabs;

