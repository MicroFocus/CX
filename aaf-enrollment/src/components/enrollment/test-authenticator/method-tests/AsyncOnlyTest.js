import React from 'react';

class AsyncOnlyTest extends React.PureComponent {
    constructor(props) {
        super(props);

        this.props.setTestButtonAvailability(false);
        this.props.setAsyncLogon(() => {}, true);
    }

    render() {
        return null;
    }
}

export default AsyncOnlyTest;
