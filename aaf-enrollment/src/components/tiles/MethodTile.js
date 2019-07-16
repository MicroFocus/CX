import PropTypes from 'prop-types';
import React from 'react';
import Tile from './Tile';
import {methods} from '../../data/MethodData';
import {templateType} from '../../types/types';
import t from '../../i18n/locale-keys';

export default function MethodTile({categoryName, id, onClick, template, templateChoice}) {
    const methodId = template.methodId;
    const icon = methods[methodId].icon;

    let title = null;
    let description = null;
    // When choosing among methods of the same methodId, display the available one using the "New" keyword
    if (templateChoice && !template.isEnrolled) {
        title = t.authenticatorNew(template.methodTitle);
        description = template.methodTitle;
    }
    // Otherwise, display the method, with comment and categoryName taking precedence
    else {
        if (template.comment) {
            title = template.comment;
            description = categoryName || template.methodTitle;
        }
        else {
            title = template.methodTitle;
            description = categoryName || '';
        }
    }

    return (
        <Tile
            description={description}
            icon={icon}
            iconTitle={template.methodTitle}
            id={id}
            isEnrolled={template.isEnrolled}
            isFullyEnrolled={template.isFullyEnrolled}
            onClick={onClick}
            title={title}
        />
    );
}

MethodTile.propTypes = {
    categoryName: PropTypes.string,
    id: PropTypes.string,
    onClick: PropTypes.func,
    template: templateType.isRequired,
    templateChoice: PropTypes.bool
};
