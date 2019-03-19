import './MethodTile.scss';
import PropTypes from 'prop-types';
import React from 'react';

export const TYPE_ADD = 'ADD';

export default function Tile({description, icon, id, isEnrolled, onClick, title, type}) {
    let className = 'ias-tile ias-large';
    if (type === TYPE_ADD) {
        className += ' opaque';
    }

    let cornerIcon = null;
    if (isEnrolled) {
        className += ' enrolled';
        cornerIcon = (
            <div className="ias-actions">
                <i className="ias-icon ias-icon-check_thick" title="Enrolled" />
            </div>
        );
    }

    let descriptionElement = null;
    if (description.length) {
        descriptionElement = <p className="description">{description}</p>;
    }

    return (
        <div className={className} id={id} onClick={onClick} tabIndex="0">
            <i className={'ias-icon ias-icon-' + icon} />
            <div className="ias-tile-content">
                <h3>{title}</h3>
                {descriptionElement}
            </div>
            {cornerIcon}
        </div>
    );
}

Tile.propTypes = {
    description: PropTypes.string,
    icon: PropTypes.string.isRequired,
    id: PropTypes.string,
    isEnrolled: PropTypes.bool,
    onClick: PropTypes.func,
    title: PropTypes.string.isRequired,
    type: PropTypes.string
};

Tile.defaultProps = {
    description: '',
    isEnrolled: false,
    onClick: (() => {})
};
