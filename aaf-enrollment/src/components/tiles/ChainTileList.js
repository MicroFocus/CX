import React from 'react';
import ChainTile from './ChainTile';
import PropTypes from 'prop-types';
import {categoriesType, indexedChainsType} from '../../types/types';
import {getChainKey, getChainTemplateKey} from '../../utils/key-generator';
import MethodTile from './MethodTile';
import getCategoryName from '../../utils/category-name';

class ChainTileList extends React.PureComponent {
    renderChain(chain) {
        const { alwaysHideCategories, categories, enrolled, nonDefaultCategoriesEnrolled, viewChainAuthenticator }
            = this.props;

        const {templates} = chain;

        // Determine which template should be clicked by default
        let defaultTemplate = templates[0];
        if (!enrolled) {
            for (let index = 0; index < templates.length; index++) {
                if (templates[index].isEnrolled === false) {
                    defaultTemplate = templates[index];
                    break;
                }
            }
        }

        // Render the methods inside the chain
        const chainMethodElements = templates.map((template) => {
            const categoryName = (nonDefaultCategoriesEnrolled && template.isEnrolled)
                ? getCategoryName(categories, template.categoryId) : null;
            const key = getChainTemplateKey(chain, template);
            let handleMethodClick = null;
            if (enrolled) {
                handleMethodClick = (event) => {
                    event.stopPropagation();
                    viewChainAuthenticator(chain, template);
                };
            }

            return (
                <MethodTile
                    categoryName={categoryName}
                    id={key}
                    key={key}
                    onClick={handleMethodClick}
                    template={template}
                />
            );
        });

        const handleClick = () => viewChainAuthenticator(chain, defaultTemplate);
        const key = getChainKey(chain);
        let name = chain.name;
        if (!alwaysHideCategories) {
            name += ` (${chain.categoryName})`;
        }

        return (
            <ChainTile id={key} key={key} isEnrolled={enrolled} name={name} onClick={handleClick}>
                {chainMethodElements}
            </ChainTile>
        );
    }

    render() {
        const { enrolled, indexedChains } = this.props;

        const orderedChains = [];
        Object.keys(indexedChains).forEach((categoryId) => {
            const chainsOfCategory = indexedChains[categoryId];
            chainsOfCategory.forEach((chain) => {
                if (chain.isEnrolled === enrolled) {
                    orderedChains.push(chain);
                }
            });
        });

        orderedChains.sort((chainA, chainB) => {
            const firstComparison = chainA.name.localeCompare(chainB.name);
            if (firstComparison !== 0) {
                return firstComparison;
            }
            else {
                return (chainA.categoryId < chainB.categoryId) ? -1 : 1;
            }
        });

        return orderedChains.map((chain) => this.renderChain(chain));
    }
}

ChainTileList.propTypes = {
    alwaysHideCategories: PropTypes.bool.isRequired,
    categories: categoriesType.isRequired,
    enrolled: PropTypes.bool.isRequired,
    indexedChains: indexedChainsType.isRequired,
    nonDefaultCategoriesEnrolled: PropTypes.bool.isRequired,
    viewChainAuthenticator: PropTypes.func.isRequired
};

export default ChainTileList;
