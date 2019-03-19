import React from 'react';
import Authenticator from '../Authenticator';
import ShowHidePassword from '../../ShowHidePassword';
import TestAuthenticatorButton from '../test-authenticator/TestAuthenticatorButton';

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
            // TODO: Here we don't need to, but in other methods, put a .catch() so we can reset our internal
            // state if the enroll process expires. Right now it skips our .then() so we can't just check for
            // it there.
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
                    name={`answer_id_${questionKey}`}
                    onChange={(event) => this.handleChange(questionKey, event)}
                    key={questionKey}
                    label={question}
                    placeholder="Answer"
                    value={answer}
                />
            );
        });
        return (
            <Authenticator
                description="The Security Questions method allows the administrator to define questions and number
                required for authentication. Define unique answers for all the questions. Authenticate by answering
                the required number of security questions with your unique answers."
                {...this.props}
            >
                {questionElements}
                <TestAuthenticatorButton {...this.props.test} />
            </Authenticator>
        );
    }
}

export default SecurityQuestionsMethod;
