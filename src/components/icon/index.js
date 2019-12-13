import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Schedule from '@material-ui/icons/Schedule';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
// list of material-ui icon names here, make sure
// import those icons as you see above
const iconList = {
    Schedule,
    ErrorOutlineIcon,
    InfoOutlined,
};

export default class Icon extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        className: PropTypes.string,
    };

    state = {
        iconColor: undefined,
    };

    render() {
        const SelectedIcon = iconList[this.props.name];
        return (
            <SelectedIcon
                className={this.props.className}
            />
        );
    }
}
