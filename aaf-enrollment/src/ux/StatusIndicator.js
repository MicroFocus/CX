import React from 'react';
import PropTypes from 'prop-types';
import t from '../i18n/locale-keys';

export const STATUS_TYPE = { ERROR: 'error', INFO: 'info', OK: 'ok', WARN: 'warn' };
const STATUS_ICONS = {
    [STATUS_TYPE.ERROR]: 'status_error_thick',
    [STATUS_TYPE.INFO]: 'status_info_thick',
    [STATUS_TYPE.OK]: 'status_ok_thick',
    [STATUS_TYPE.WARN]: 'status_warn_thick'
};

export default function StatusIndicator(props) {
    const {onClose, type} = props;

    const iconType = type;
    const iconName = STATUS_ICONS[iconType];

    let closeButton = null;
    if (onClose) {
        closeButton = (
            <button
                className="ias-button ias-icon-button close-button"
                onClick={onClose}
                title={t.messageClose()}
                type="button"
            >
                <i className="ias-icon ias-icon-close_thick" />
            </button>
        );
    }

    return (
        <div className="status-indicator ias-status-message-title">
            <i className={`ias-icon ias-icon-${iconName} ias-${iconType}`} />
            <span>{props.children}</span>
            {closeButton}
        </div>
    );
}

StatusIndicator.propTypes = {
    onClose: PropTypes.func,
    type: PropTypes.string.isRequired
};
