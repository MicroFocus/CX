import './MethodTile.scss';
import PropTypes from 'prop-types';
import React from 'react';
import t from '../../i18n/locale-keys';

export const TYPE_ADD = 'ADD';

export default function Tile({description, icon, iconTitle, id, isEnrolled, isFullyEnrolled, onClick, title, type}) {
    let className = 'ias-tile ias-large';
    if (type === TYPE_ADD) {
        className += ' opaque';
    }

    if (isEnrolled) {
        className += ' enrolled';
    }

    let cornerIcon = null;
    if (isFullyEnrolled) {
        cornerIcon = (
            <div className="ias-actions">
                <i className="ias-icon ias-icon-check_thick" title={t.authenticatorEnrolled()} />
            </div>
        );
    }

    let descriptionElement = null;
    if (description.length) {
        descriptionElement = <p className="description">{description}</p>;
    }

    return (
        <div className={className} id={id} onClick={onClick} tabIndex="0">
            <i className={'ias-icon ias-icon-' + icon} title={iconTitle} />
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
    iconTitle: PropTypes.string,
    id: PropTypes.string,
    isEnrolled: PropTypes.bool,
    isFullyEnrolled: PropTypes.bool,
    onClick: PropTypes.func,
    title: PropTypes.string.isRequired,
    type: PropTypes.string
};

Tile.defaultProps = {
    description: '',
    isEnrolled: false,
    isFullyEnrolled: false,
    onClick: (() => {})
};
