import './ChainEnrollment.scss';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { methods } from '../../data/MethodData';
import {connect} from 'react-redux';
import AuthenticatorContainer from './AuthenticatorContainer';
import {
    getChainAuthenticatorLink, getMethodIdFromUri, HOMEPAGE_URL, normalizeChainUri, viewChainAuthenticator
} from '../../actions/navigation.actions';
import {parseQueryString} from '../../utils/url-functions';
import {getTemplateKey} from '../../utils/key-generator';
import {fetchIndexedData, fetchPolicies} from '../../actions/methods-display.actions';

class ChainEnrollment extends React.PureComponent {
    constructor(props) {
        super(props);

        this.props.fetchIndexedData();
        this.props.fetchPolicies();

        this.state = {
            beforeNavigationListener: null
        };
    }

    // Get category id. Use default category if no query. Otherwise query must match category name or id.
    getCategoryId() {
        const {categories, location: {search}} = this.props;
        const categoryQuery = (parseQueryString(search).category || '').toLowerCase();
        if (categoryQuery.length) {
            for (let index = 0; index < categories.length; index++) {
                const category = categories[index];
                if (category.id === categoryQuery || category.name.toLowerCase() === categoryQuery) {
                    return category.id;
                }
            }

            return null;
        }
        else {
            return '';
        }
    }

    // Get template. Must be part of chain and match the methodUri. If no methodUri is provided, redirect to the first
    // unenrolled template in the chain. If they
    getTemplate(chain, methodUri) {
        if (methodUri) {
            const methodId = getMethodIdFromUri(methodUri);
            for (let index = 0; index < chain.templates.length; index++) {
                const template = chain.templates[index];
                if (template.methodId === methodId) {
                    return template;
                }
            }

            return null;
        }
        else {
            for (let index = 0; index < chain.templates.length; index++) {
                const template = chain.templates[index];
                if (template.isEnrolled === false) {
                    return template;
                }
            }

            return chain.templates[0];
        }
    }

    setBeforeNavigationListener = (listener) => {
        this.setState({
            beforeNavigationListener: listener
        });
    };

    renderContent(chain, template) {
        const navLinks = chain.templates.map((chainTemplate) => {
            const {methodId, methodTitle, isEnrolled} = chainTemplate;
            const icon = methods[methodId].icon;
            let linkClass = (template.methodId === methodId) ? 'ias-active' : '';
            const title = isEnrolled ? methodTitle + ' (Enrolled)' : methodTitle;
            if (isEnrolled) {
                linkClass += ' enrolled';
            }
            const handleClick = () => {
                this.state.beforeNavigationListener(() => {
                    this.props.viewChainAuthenticator(chain, chainTemplate);
                });
            };

            return (
                <a className={linkClass} key={`chain-nav-${methodId}`} onClick={handleClick} title={title}>
                    <i className={`ias-active ias-icon ias-icon-${icon}`} />
                </a>
            );
        });

        const setBeforeNavigationListener = this.setBeforeNavigationListener;


        const methodProps = { chain, setBeforeNavigationListener, template};
        const authenticatorContainerKey = getTemplateKey(template);

        return (
            <React.Fragment>
                <div className="chain-nav-description">
                    Enroll these methods to enable the sequence authentication
                </div>
                <div className="chain-nav">
                    {navLinks}
                </div>

                <div className="ias-content-padding">
                    <AuthenticatorContainer key={authenticatorContainerKey} {...methodProps} />
                </div>
            </React.Fragment>
        );
    }

    render() {
        const {availableIndexedTemplates, indexedChains, match: {params} } = this.props;

        // Wait until indexed data is available before rendering anything
        if (!availableIndexedTemplates || !indexedChains) {
            return null;
        }

        // Get chains of category
        const categoryId = this.getCategoryId();
        if (categoryId === null) {
            return <Redirect to={HOMEPAGE_URL} />;
        }

        const chainsOfCategory = indexedChains[categoryId];
        if (!chainsOfCategory) {
            return <Redirect to={HOMEPAGE_URL} />;
        }

        // Get chain. Chain URI must match chain shortName or id.
        const chainUri = normalizeChainUri(params.chainUri);
        let chain = null;
        for (let index = 0; index < chainsOfCategory.length; index++) {
            const currentChain = chainsOfCategory[index];
            if (currentChain.chainUris.some(uri => (uri === chainUri))) {
                chain = currentChain;
                break;
            }
        }

        if (!chain) {
            return <Redirect to={HOMEPAGE_URL} />;
        }

        const methodUri = params.methodUri;
        const template = this.getTemplate(chain, methodUri);
        if (!template) {
            return <Redirect to={HOMEPAGE_URL} />;
        }

        if (!methodUri) {
            return <Redirect to={getChainAuthenticatorLink(chain, template)} />;
        }

        return this.renderContent(chain, template);
    }
}

const mapStateToProps = ({ methodsDisplay: {categories, chains, indexedData} }) =>
    ({...indexedData, chains, categories});

const mapDispatchToProps = { fetchIndexedData, fetchPolicies, viewChainAuthenticator };

export default connect(mapStateToProps, mapDispatchToProps)(ChainEnrollment);
