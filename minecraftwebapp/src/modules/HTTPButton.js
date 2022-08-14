import React from 'react';

class HTTPButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        var query = '';

        if (this.props.resource == "sendCommand" && typeof this.props.command != "undefined") {
            query += "?command=" + this.props.command;
            console.log(query);
        }

        fetch('http://mathorgadaorc.ddns.net:3001/' + this.props.resource + query, {
            method: this.props.method,
            headers: new Headers({
                'Access-Control-Allow-Origin': '*'
            })
        });
    }

    render() {
        return(
            <button onClick={this.handleClick} className={typeof this.props.reactClass == "undefined"? {} : this.props.reactClass} style={typeof this.props.reactStyle == "undefined"? {} : JSON.parse(this.props.reactStyle)}>
                {this.props.text}
            </button>
        );
    }
}

export default HTTPButton;