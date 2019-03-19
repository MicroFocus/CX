// Detect whether app is in mock API mode
module.exports = {
    isMockApiMode: function() {
        return process.env.REACT_APP_API_MODE === 'mock';
    }
};
