// Runs the app in development mode (same as start.js), but using a mock API
// This is done by webpack module replacement in webpack.config.dev.js
process.env.REACT_APP_API_MODE = 'mock';
require('./start');
