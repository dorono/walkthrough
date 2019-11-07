import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import Select from 'components/select';

@autobind
export default class Sortable extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
        items: PropTypes.array.isRequired,
        sortOptions: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            func: PropTypes.func.isRequired,
        })).isRequired,
    };

    state = {
        currentSort: '',
    };

    componentWillMount() {
        this.setState({currentSort: this.getSortOptions()[0].value});
    }

    getSortOptions() {
        return this.props.sortOptions.map(option => ({
            label: option.label,
            value: option.label,
        }));
    }

    handleSortChange(value) {
        this.setState({currentSort: value});
    }

    render() {
        const sort = this.props.sortOptions.find(option => option.label === this.state.currentSort);
        const items = this.props.items.map((item, index) => ({...item, index})).sort(sort.func);

        const sortDropdown = (
            <Select
                placeholder='Sort'
                options={this.getSortOptions()}
                value={this.state.currentSort}
                onChange={this.handleSortChange}
            />
        );

        return this.props.children(items, sortDropdown);
    }
}

export const sortOptions = sortName => {
    return {
        newestFirst: {
            label: 'Newest first',
            func: (a, b) => b[sortName].localeCompare(a[sortName]) || b.index - a.index,
        },
        oldestFirst: {
            label: 'Oldest first',
            func: (a, b) => a[sortName].localeCompare(b[sortName]) || a.index - b.index,
        },
    };
};
