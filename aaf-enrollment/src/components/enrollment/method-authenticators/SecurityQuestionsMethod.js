import React from 'react';
import Authenticator from '../Authenticator';
import ShowHidePassword from '../../ShowHidePassword';
import t from '../../../i18n/locale-keys';

class SecurityQuestionsMethod extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            answers: {},
            dataDirty: false,
            questions: {}
        };

        this.props.doEnrollWithBeginProcess(null)
            .then(({questions}) => {
                const answers = {};
                Object.keys(questions).forEach((questionKey) => {
                    answers[questionKey] = '';
                });
                this.setState({
                    answers,
                    questions
                });
            });
    }

    authenticationInfoChanged() {
        return this.state.dataDirty;
    }

    finishEnroll() {
        const {answers} = this.state;
        return this.props.doEnrollWithBeginProcess({answers})
            .then((response) => {
                if (response.status !== 'FAILED') {
                    return Promise.resolve(response);
                }
                else {
                    throw response.msg;
                }
            });
    };

    handleChange = (questionKey, event) => {
        this.setState({
            answers: {...this.state.answers, [questionKey]: event.target.value},
            dataDirty: true
        });
    };

    render() {
        const {questions, answers} = this.state;

        const questionElements = Object.keys(questions).map((questionKey) => {
            const question = questions[questionKey];
            const answer = answers[questionKey];
            return (
                <ShowHidePassword
                    disabled={this.props.readonlyMode}
                    name={`answer_id_${questionKey}`}
                    onChange={(event) => this.handleChange(questionKey, event)}
                    key={questionKey}
                    label={question}
                    placeholder={t.secQuestAnswer()}
                    value={answer}
                />
            );
        });
        return (
            <Authenticator
                description={t.secQuestMethodDescription()}
                {...this.props}
            >
                {questionElements}
            </Authenticator>
        );
    }
}

export default SecurityQuestionsMethod;
