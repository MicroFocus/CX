import {abortPendingNavigation, continuePendingNavigation} from '../actions/navigation.actions';
import {connect} from 'react-redux';
import Dialog from '../ux/Dialog';
import PropTypes from 'prop-types';
import React from 'react';

const NavigationDialog = (props) => {
    return (
        <Dialog
            onCancel={props.abortPendingNavigation}
            onClose={props.continuePendingNavigation}
            open={props.showNavigationDialog}
            title={
                <div className="ias-dialog-label">
                    {props.navigationDialogTitle}
                </div>
            }
        >
            <p>{props.navigationDialogMessage}</p>
        </Dialog>
    );
};

NavigationDialog.propTypes = {
    showNavigationDialog: PropTypes.bool,
    navigationDialogMessage: PropTypes.string,
    navigationDialogTitle: PropTypes.string
};

const mapStateToProps = ({ navigation }) => (navigation);
const mapDispatchToProps = { abortPendingNavigation, continuePendingNavigation };

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDialog);
