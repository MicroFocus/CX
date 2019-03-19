export function getTemplateKey(template) {
    if (template.isEnrolled) {
        return template.id;
    }
    else {
        return template.methodId + '-add';
    }
}

export function getChainKey(chain) {
    const categoryString = chain.categoryId || 'add';
    return chain.idHex + '-' + categoryString;
}
