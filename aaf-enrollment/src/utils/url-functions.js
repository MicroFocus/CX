// Query string and URL functions for navigation within app. (Separate functions are used to build JSON requests.)
// Use alternative to query-string module because it is incompatible with create-react-app
// See https://github.com/sindresorhus/query-string/pull/148

export function parseQueryString(queryString) {
    const query = {};
    const queryStringWithoutQMark = (queryString[0] === '?') ? queryString.substr(1) : queryString;
    const pairs = queryStringWithoutQMark.split('&');
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

export function generateQueryString(params) {
    const queryStrings = [];
    Object.keys(params).forEach((prop) => {
        const encodedProp = encodeURIComponent(prop);
        const encodedValue = encodeURIComponent(params[prop]);
        queryStrings.push(encodedProp + '=' + encodedValue);
    });

    if (queryStrings.length) {
        return '?' + queryStrings.join('&');
    }

    return null;
}
