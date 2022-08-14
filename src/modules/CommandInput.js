import React from 'react';
import HTTPButton from "./HTTPButton.js";
import Output from "./Output.js";

class CommandInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            command: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.state.command = event.target.value;
        console.log(this.state.command);
        this.forceUpdate();
    }

    render() {
        return(
            <div class="input-group mb-3" style={{paddingLeft: "20%", paddingRight: "20%", textAlign: "center", margin: "0.5em"}}>
                <input onChange={this.handleChange} type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <HTTPButton reactStyle = "{}" reactClass="btn btn-primary" text="Send" method="post" resource="sendCommand" command={this.state.command} />
            </div>
        );
    }
}

export default CommandInput
    
