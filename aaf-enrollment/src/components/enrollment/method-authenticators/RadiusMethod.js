import React from 'react';
import Authenticator from '../Authenticator';
import {generateFormChangeHandler} from '../../../utils/form-handler';
import TextField from '../../TextField';
import t from '../../../i18n/locale-keys';

class RadiusMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        const {isEnrolled, data} = props.template;
        let userName = '';
        if (isEnrolled && data) {
            userName = data.userName || '';
        }
        generateFormChangeHandler(this, { userName });
    }

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    authenticationInfoSavable() {
        return !this.props.template.isEnrolled || this.authenticationInfoChanged();
    }

    finishEnroll() {
        const {userName} = this.state.form;
        const formData = userName.length ? { userName } : null;

        return this.props.doEnrollWithBeginProcess(formData)
        .then((response) => {
            if (response.status !== 'FAILED') {
                return Promise.resolve(response);
            }
            else {
                throw response.msg;
            }
        });
    }

    render() {
        const {username} = this.props.authentication;

        return (
            <Authenticator
                description={t.radiusMethodDescription()}
                {...this.props}
            >
                <div className="override">
                    <div>
                        <label>{t.userNamePossessive()}</label>
                        <span className="directory-data">{username}</span>
                    </div>
                    <div>
                        <label>{t.directoryFrom()}</label>
                    </div>
                    <div>
                        <label>{t.userNameOverride()}</label>
                    </div>
                </div>
                <TextField
                    disabled={this.props.readonlyMode}
                    id="Radius_Input_Field"
                    label={t.userNameOverrideLabel()}
                    name="userName"
                    onChange={this.handleChange}
                    value={this.state.form.userName}
                />
            </Authenticator>
        );
    }
}

export default RadiusMethod;
