import React from 'react';

class HTTPButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        console.log("click!");
        fetch('http://mathorgadaorc.ddns.net:3001/' + this.props.resource, {
            method: 'get',
            headers: new Headers({
                'Access-Control-Allow-Origin': '*'
            })
        }).then(response => response.json()).then(data => console.log(data));
    }

    render() {
        return(
            <button onClick={this.handleClick} className="btn btn-primary" style={{margin: "0.5em"}}>
                {this.props.text}
            </button>
        );
    }
}

export default HTTPButton;