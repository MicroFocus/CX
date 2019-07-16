// We need to access the History object in Redux to programmatically navigate throughout the application.
// See https://stackoverflow.com/a/42320249/5016547

import createHistory from 'history/createBrowserHistory';

// Tell react-router our app root.
// Create-react-app injects the app root URL into process.env.PUBLIC_URL.
// In production, it uses the package.json "homepage" field, in development it uses "/".
const historyInstance = createHistory({
    basename: process.env.PUBLIC_URL + '/'
});

export default historyInstance;
