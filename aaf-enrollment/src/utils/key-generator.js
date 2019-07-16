export function getChainKey(chain) {
    return chain.chainUris[0] + '-' + chain.categoryName;
}

export function getChainTemplateKey(chain, template) {
    return chain.chainUris[0] + '-' + getTemplateKey(template);
}

export function getTemplateKey(template) {
    if (template.isEnrolled) {
        return template.methodId + '-' + (template.categoryId || 'default');
    }
    else {
        return template.methodId + '-add';
    }
}
