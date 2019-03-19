// We need to access the History object in Redux to programmatically navigate throughout the application.
// See https://stackoverflow.com/a/42320249/5016547

import createHistory from 'history/createBrowserHistory';
const historyInstance = createHistory();

export default historyInstance;

