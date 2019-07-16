import React from 'react';
import ShowHidePassword from '../../../ShowHidePassword';
import {generateFormChangeHandler} from '../../../../utils/form-handler';
import t from '../../../../i18n/locale-keys';

class RadiusTest extends React.PureComponent {
    constructor(props) {
        super(props);

        generateFormChangeHandler(this, {
            answer: ''
        });
    }

    render() {
        return (
            <React.Fragment>
                <ShowHidePassword
                    autoFocus
                    name="answer"
                    onChange={this.handleChange}
                    placeholder={t.passwordLabel()}
                    value={this.state.form.answer}
                />
            </React.Fragment>
        );
    }
}

export default RadiusTest;
