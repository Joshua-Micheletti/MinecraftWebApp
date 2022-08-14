import React from 'react';
import globalVar from '../Global.js'

class Output extends React.Component {
    constructor(props) {
        super(props);
    }

    refresh() {
        this.forceUpdate();
    }

    render() {
        return(
            <label>{this.props.text}</label>
        );
    }
}

export default Output;