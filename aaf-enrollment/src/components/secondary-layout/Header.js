import './Header.scss';
import React from 'react';
import {Dialog, Menu, createToast} from '../../ux/ux';
import {connect} from 'react-redux';
import {openCompanyPage, signOut, viewLanguagesPage} from '../../actions/navigation.actions';
import {AUTHENTICATION_STATES} from '../../reducers/authentication.reducer';
import {deleteUser} from '../../actions/authentication.actions';
import {STATUS_TYPE} from '../../ux/StatusIndicator';
import t from '../../i18n/locale-keys';

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
            createToast({type: STATUS_TYPE.OK, description: t.authenticatorsDeleted()});
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
              <button
                  className="ias-button"
                  id="Delete_Enrollments_Button"
                  onClick={this.handleRemoveEnrolledMethodsClick}
                  type="button"
              >
                  {t.authenticatorsDelete()}
              </button>
        );
    }

    render() {
        const loggedIn = (this.props.authentication.status === AUTHENTICATION_STATES.LOGGED_IN);
        const deleteMeButton = loggedIn ? this.renderDeleteMeButton() : null;
        const menuTitle = loggedIn ? this.props.authentication.username : t.menu();
        const additionalMenuOptions = loggedIn ? (
            <React.Fragment>
                {deleteMeButton}
                <div className="menu-separator" />
                <button type="button" className="ias-button" id="Sign_Out_Button" onClick={this.handleSignOutClick}>
                    {t.signOut()}
                </button>
            </React.Fragment>
        ) : null;

        return (
            <header>
                <div className="ias-app-bar micro-bg-color">
                    <div className="ias-avatar" onClick={this.props.openCompanyPage}>
                        <img
                            alt={t.companyLogo()}
                            className="micro-logo"
                            src={process.env.PUBLIC_URL + '/IAS_AA_100.png'}
                        />
                    </div>
                    <h3 className="ias-heading" onClick={this.props.openCompanyPage}>{t.productName()}</h3>
                    <span className="ias-fill" />

                    <Menu
                        iasAlign="end"
                        toggleElement={(
                            <button className="ias-button ias-menu-toggle" id="Menu_Toggle_Button" type="button">
                                <span>{menuTitle}</span>
                                <i className="ias-icon ias-icon-down_thick" />
                            </button>
                        )}
                    >
                        <button
                            className="ias-button"
                            id="Language_Button"
                            onClick={this.handleLanguagesClick}
                            type="button"
                        >
                            {t.language()}
                        </button>
                        <button className="ias-button" id="About_Button" onClick={this.toggleAboutDialog} type="button">
                            {t.about()}
                        </button>
                        <a
                            type="button"
                            className="ias-button"
                            href={HELP_HREF}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {t.help()}
                        </a>
                        {additionalMenuOptions}
                        <div className="menu-separator" />
                        <h3 className="ias-menu-footer">{t.productBuild().toLocaleUpperCase()}</h3>
                    </Menu>
                </div>
                <Dialog
                    onCancel={this.cancelConfirmDeleteDialog}
                    onClose={this.okConfirmDeleteDialog}
                    open={this.state.confirmDeleteDialogOpen}
                    title={
                        <div className="ias-dialog-label">
                            {t.authenticatorsDeleteWarningTitle()}
                        </div>
                    }
                >
                    <p>{t.authenticatorsDeleteWarning()}</p>
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
                                        alt={t.productGroup()}
                                        className="security-logo"
                                        src={process.env.PUBLIC_URL + '/security_120.png'}
                                    />
                                </div>
                            </div>
                            <div id="detail-column">
                                <div className="brand-color-box">
                                    <img
                                        alt={t.aboutCompanyLogo()}
                                        className="microfocus-logo"
                                        src={process.env.PUBLIC_URL + '/mf_logo_white_200.png'}
                                    />
                                    <img
                                        alt={t.aboutGroupLogo()}
                                        className="ias-logo"
                                        src={process.env.PUBLIC_URL + '/IAS_AA_100.png'}
                                    />
                                </div>
                                <div className="ias-about-details">
                                    <div className="ias-about-product-title">{t.productName()}</div>
                                    <div className="product-description">{t.uiTitle()}</div>
                                    <div className="product-description">
                                        {t.aboutDescription()}
                                    </div>
                                    <p>
                                        <label>{t.aboutCopyright()}</label>
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