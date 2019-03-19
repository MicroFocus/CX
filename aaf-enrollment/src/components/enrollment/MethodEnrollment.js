import ChooseAuthenticator from './ChooseAuthenticator';
import {connect} from 'react-redux';
import {fetchIndexedData, fetchPolicies} from '../../actions/methods-display.actions';
import React from 'react';
import {Redirect} from 'react-router-dom';
import { ADD_METHOD_TYPE, getMethodIdFromUri, HOMEPAGE_URL } from '../../actions/navigation.actions';
import AuthenticatorContainer from './AuthenticatorContainer';
import {getTemplateKey} from '../../utils/key-generator';
import PropTypes from 'prop-types';
import { availableIndexedTemplatesType, categoriesType, enrolledIndexedTemplatesType } from '../../types/types';

class MethodEnrollment extends React.PureComponent {
    constructor(props) {
        super(props);

        this.props.fetchIndexedData();
        this.props.fetchPolicies();
    }

    renderTemplate(template) {
        // Don't render the template if no match was found
        if (!template) {
            return <Redirect to={HOMEPAGE_URL} />;
        }

        const key = getTemplateKey(template);
        return (
            <div className="ias-content-padding">
                <AuthenticatorContainer key={key} template={template} />
            </div>
        );
    }

    render() {
        const {
            availableIndexedTemplates,
            categories,
            enrolledIndexedTemplates,
            match: {
                params: { methodUri, templateType }
            },
            nonDefaultCategoriesEnrolled
        } = this.props;

        if (!availableIndexedTemplates || !enrolledIndexedTemplates) {
            return null;
        }

        // Determine what template the route we are rendering matches.
        // If it matches multiple, but only one is enrolled, render the enrolled template; otherwise render a page for
        // the user to choose one
        const methodId = getMethodIdFromUri(methodUri);
        const enrolledTemplatesOfMethod = enrolledIndexedTemplates[methodId];
        const availableTemplateOfMethod = availableIndexedTemplates[methodId];

        if (templateType === ADD_METHOD_TYPE) {
            return this.renderTemplate(availableTemplateOfMethod);
        }

        if (templateType) {
            const templateId = templateType;
            let template = null;
            if (enrolledTemplatesOfMethod) {
                for (let index = 0; index < enrolledTemplatesOfMethod.length; index++) {
                    if (enrolledTemplatesOfMethod[index].id === templateId) {
                        template = enrolledTemplatesOfMethod[index];
                        break;
                    }
                }
            }
            return this.renderTemplate(template);
        }

        if (enrolledTemplatesOfMethod) {
            if (enrolledTemplatesOfMethod.length === 1) {
                return this.renderTemplate(enrolledTemplatesOfMethod[0]);
            }
            else {
                let templates = enrolledTemplatesOfMethod;

                if (availableTemplateOfMethod) {
                    templates = templates.concat([availableTemplateOfMethod]);
                }

                return (
                    <ChooseAuthenticator
                        categories={categories}
                        nonDefaultCategoriesEnrolled={nonDefaultCategoriesEnrolled}
                        templatesOfType={templates}
                    />
                );
            }
        }

        return this.renderTemplate(availableTemplateOfMethod);
    }
}

MethodEnrollment.propTypes = {
    availableIndexedTemplates: availableIndexedTemplatesType,
    categories: categoriesType,
    enrolledIndexedTemplates: enrolledIndexedTemplatesType,
    nonDefaultCategoriesEnrolled: PropTypes.bool
};

const mapStateToProps = ({ methodsDisplay: {categories, indexedData} }) => ({...indexedData, categories});
const mapDispatchToProps = { fetchIndexedData, fetchPolicies };

export default connect(mapStateToProps, mapDispatchToProps)(MethodEnrollment);
