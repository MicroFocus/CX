import './Header.scss';
import React from 'react';
import {Dialog, Menu, createToast} from '../../ux/ux';
import {connect} from 'react-redux';
import {openCompanyPage, signOut, viewLanguagesPage} from '../../actions/navigation.actions';
import {AUTHENTICATION_STATES} from '../../reducers/authentication.reducer';
import {deleteUser} from '../../actions/authentication.actions';
import {STATUS_TYPE} from '../../ux/StatusIndicator';

const HELP_HREF = 'https://www.netiq.com/documentation/advanced-authentication-62/server-user-guide/data' +
    '/authenticators_management.html';
class Header extends React.PureComponent {
    state = {
        aboutDialogOpen: false,
        confirmDeleteDialogOpen: false
    };

    handleLanguagesClick = () => {
        this.props.viewLanguagesPage();
    };

    handleSignOutClick = () => {
        this.props.signOut();
    };

    handleRemoveEnrolledMethodsClick = () => {
        this.setState({
            confirmDeleteDialogOpen: true
        });
    };

    cancelConfirmDeleteDialog = () => {
        this.setState({
            confirmDeleteDialogOpen: false
        });
    };

    okConfirmDeleteDialog = () => {
        this.setState({
            confirmDeleteDialogOpen: false
        });

        //do deletion
        this.props.deleteUser().then(() => {
            createToast({type: STATUS_TYPE.OK, description: 'Your authentication methods have been deleted.'});
        });
    };

    toggleAboutDialog = () => {
        this.setState({
            aboutDialogOpen: !this.state.aboutDialogOpen
        });
    };

    renderDeleteMeButton() {
        if (!this.props.policies || !this.props.policies.deleteMeOptions.data.deleteMeEnabled) {
            return null;
        }

        return (
              <button type="button" className="ias-button" onClick={this.handleRemoveEnrolledMethodsClick}>
                  Delete all Enrollments
              </button>
        );
    }

    render() {
        const loggedIn = (this.props.authentication.status === AUTHENTICATION_STATES.LOGGED_IN);
        const deleteMeButton = loggedIn ? this.renderDeleteMeButton() : null;
        const menuTitle = loggedIn ? this.props.authentication.username : 'Menu';
        const additionalMenuOptions = loggedIn ? (
            <React.Fragment>
                {deleteMeButton}
                <div className="menu-separator" />
                <button type="button" className="ias-button" onClick={this.handleSignOutClick}>Sign out</button>
            </React.Fragment>
        ) : null;

        return (
            <header>
                <div className="ias-app-bar micro-bg-color">
                    <div className="ias-avatar" onClick={this.props.openCompanyPage}>
                        <img alt="Company logo" className="micro-logo" src="/IAS_AA_100.png" />
                    </div>
                    <h3 className="ias-heading" onClick={this.props.openCompanyPage}>Advanced Authentication</h3>
                    <span className="ias-fill" />

                    <Menu
                        iasAlign="end"
                        toggleElement={(
                            <button className="ias-button ias-menu-toggle" type="button">
                                <span>{menuTitle}</span>
                                <i className="ias-icon ias-icon-down_thick" />
                            </button>
                        )}
                    >
                        <button type="button" className="ias-button" onClick={this.handleLanguagesClick}>
                            Language
                        </button>
                        <button type="button" className="ias-button" onClick={this.toggleAboutDialog}>About</button>
                        <a type="button" className="ias-button" href={HELP_HREF} target="_blank">Help</a>
                        {additionalMenuOptions}
                        <div className="menu-separator" />
                        <h3 className="ias-menu-footer">BUILD NAAF 6.0</h3>
                    </Menu>
                </div>
                <Dialog
                    onCancel={this.cancelConfirmDeleteDialog}
                    onClose={this.okConfirmDeleteDialog}
                    open={this.state.confirmDeleteDialogOpen}
                    title={
                        <div className="ias-dialog-label">
                            Delete All Enrollments
                        </div>
                    }
                >
                    <p>Are you sure you want to remove Authentication Enrollments?</p>
                </Dialog>
                <Dialog
                    exitOnBackdropClick
                    omitCloseButton
                    onClose={this.toggleAboutDialog}
                    open={this.state.aboutDialogOpen}
                >
                    <div id="ias-about" className="proto">
                        <div id="brand">
                            <div className="brand-family-box">
                                <div className="security-logo-box">
                                    <img
                                        alt="Security product group"
                                        className="security-logo"
                                        src="/security_120.png"
                                    />
                                </div>
                            </div>
                            <div id="detail-column">
                                <div className="brand-color-box">
                                    <img
                                        alt="Micro Focus logo"
                                        className="microfocus-logo"
                                        src="/mf_logo_white_200.png"
                                    />
                                    <img
                                        alt="Identity, Access, and Security group logo"
                                        className="ias-logo"
                                        src="/IAS_AA_100.png"
                                    />
                                </div>
                                <div className="ias-about-details">
                                    <div className="ias-about-product-title">Advanced Authentication</div>
                                    <div className="product-description">Advanced Auth Enrollment UI v1.0</div>
                                    <div className="product-description">
                                        Advanced Authentication is a product created by Micro Focus to provide users the
                                        ability to
                                        enroll in advanced login methods for authentication and to use those when
                                        signing in to their organization's site.
                                    </div>
                                    <p>
                                        <label>© 2013-2018 NetIQ Inc. All rights reserved.</label>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </header>
        );
    }
}

const mapStateToProps = ({authentication, methodsDisplay: {policies}}) => ({authentication, policies});

const mapDispatchToProps = {
    viewLanguagesPage,
    signOut,
    openCompanyPage,
    deleteUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);