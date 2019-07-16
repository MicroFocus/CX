import React from 'react';
import PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';
import t from '../i18n/locale-keys';

/* Displays a dialog that stays open when this.props.open is true.
 * - If an onCancel event handler is provided, the "Cancel" button will be shown; clicking "X" or Cancel will call it.
 * - If no onCancel event handler is provided, clicking "X" will call the onClose event handler instead.
 * - Clicking "OK" always calls the onClose event handler.
 */
export default class Dialog extends React.PureComponent {
    handleBackdropClick = (event) => {
        if (this.props.exitOnBackdropClick && event.target.className === 'ias-dialog') {
            this.props.onClose();
        }
    };

    handleCancel = (event) => {
        if (this.props.onCancel) {
            this.props.onCancel(event);
        }
        else {
            this.props.onClose(event);
        }
    };

    render() {
        if (!this.props.open) {
            return null;
        }

        const {addContainerClass, omitActionButtons, omitCloseButton, onCancel, onClose, title} = this.props;

        let dialogCloseButton = null;
        if (!omitCloseButton) {
            dialogCloseButton = (
                <button
                    className="ias-button ias-icon-button ias-dialog-cancel-button"
                    id="Dialog_Close_Button"
                    onClick={this.handleCancel}
                    title={t.buttonClose()}
                >
                    <i className="ias-icon ias-icon-close_thick" />
                </button>
            );
        }

        let actionButtons = null;
        if (!omitActionButtons) {
            let cancelButton = null;
            if (onCancel) {
                cancelButton = (
                    <button className="ias-button" id="Dialog_Cancel_Button" onClick={this.handleCancel}>
                        {t.buttonCancel()}
                    </button>
                );
            }

            actionButtons = (
                <div className="ias-actions">
                    <button className="ias-button" id="Dialog_OK_Button" onClick={onClose}>
                        {t.buttonOk()}
                    </button>
                    {cancelButton}
                </div>
            );
        }

        let containerClass = 'ias-dialog-container';
        if (addContainerClass) {
            containerClass += ' ' + addContainerClass;
        }

        const dialog = (
            <div className="ias-dialog" onClick={this.handleBackdropClick}>
                <div className={containerClass}>
                    <div className="ias-dialog-content">
                        {title}
                        {this.props.children}
                        {dialogCloseButton}
                        {actionButtons}
                    </div>
                </div>
            </div>
        );

        return ReactDOM.createPortal(dialog, document.body);
    }
}

Dialog.propTypes = {
    addContainerClass: PropTypes.string,
    exitOnBackdropClick: PropTypes.bool,
    onCancel: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.node
};
