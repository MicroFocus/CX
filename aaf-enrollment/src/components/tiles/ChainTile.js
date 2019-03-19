import './ChainTile.scss';
import PropTypes from 'prop-types';
import React from 'react';

export default function ChainTile(props) {
    const {id, isEnrolled, onClick, name} = props;
    let className = 'chain-tile';
    if (isEnrolled) {
        className += ' enrolled';
    }


    return (
        <div className={className} id={id} onClick={onClick} tabIndex="0">
            <h3>{name}</h3>

            <div className="chain-tile-content">
                <div className="chain-link" />
                {props.children}
            </div>
        </div>
    );
}

ChainTile.propTypes = {
    id: PropTypes.string,
    isEnrolled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

ChainTile.defaultProps = {
    onClick: (() => {})
};
