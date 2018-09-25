import React from 'react';

export default ({to = '#', text = '', className, onClick = () => null}) => {
    return <a href={to} target='_blank' className={className} onClick={onClick}>{text}</a>;
};
