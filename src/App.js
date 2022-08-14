import logo from './logo.svg';
import './App.css';
import HTTPButton from './modules/HTTPButton.js'
import CommandInput from './modules/CommandInput.js'
import Output from './modules/Output.js'
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      command: "",
      output: "",
      players: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.restart = this.restart.bind(this);
    this.checkPlayers = this.checkPlayers.bind(this);
    this.handleEnter = this.handleEnter.bind(this);

    setInterval(this.checkStatus, 2000);
    setInterval(this.checkPlayers, 30000);
  }
  
  checkPlayers = async () => {
    await fetch('http://mathorgadaorc.ddns.net:3001/sendCommand?command=list', {
      method: 'post',
      headers: new Headers({
        'Access-Control-Allow-Origin': '*'
      })
    });
    
    const response = await fetch('http://mathorgadaorc.ddns.net:3001/checkStatus', {
      method: 'get',
      headers: new Headers({
          'Access-Control-Allow-Origin': '*'
      })
    }).then((response) => response.text());
    
    var lines = response.split('\n');

    for (var i = 0; i < lines.length; i++) {
      if (lines[i].includes("players online: ")) {
        this.state.players = [];
        var components = lines[i].split(" ");
        for (var j = components.length - 1; j > 0; j--) {
          if (components[j] != "online:") {
            this.state.players.push(components[j]);
          } else {
            break;
          }
        }
        break;
      }
    }
  }


  checkStatus = async () => {
    const response = fetch('http://mathorgadaorc.ddns.net:3001/checkStatus', {
      method: 'get',
      headers: new Headers({
          'Access-Control-Allow-Origin': '*'
      })
    }).then((response) => response.text());

    this.state.output = await response;
    this.forceUpdate();
  }

  start() {
    fetch('http://mathorgadaorc.ddns.net:3001/start', {
      method: 'post',
      headers: new Headers({
          'Access-Control-Allow-Origin': '*'
      })
    });
  }

  stop() {
    fetch('http://mathorgadaorc.ddns.net:3001/stop', {
      method: 'post',
      headers: new Headers({
          'Access-Control-Allow-Origin': '*'
      })
    });
  }

  restart() {
    fetch('http://mathorgadaorc.ddns.net:3001/restart', {
      method: 'post',
      headers: new Headers({
          'Access-Control-Allow-Origin': '*'
      })
    });
  }

  handleChange(event) {
    this.state.command = event.target.value;
  }

  submit() {
    fetch('http://mathorgadaorc.ddns.net:3001/sendCommand?command=' + this.state.command, {
      method: 'post',
      header: new Headers({
        'Access-Control-Allow-Origin': '*'
      })
    });
  }

  handleEnter(event) {
    if (event.key === 'Enter') {
      this.submit();
    }
  }

  render() {
    var players = "";

    for (var i = 0; i < this.state.players.length; i++) {
      players += this.state.players[i] + "\n";
    }

    return (
      <div className="App">
        <div className="Container">
          <h1 style={{paddingBottom: "0.5em"}}>Minecraft Server</h1>
          <button onClick={this.checkStatus} className="btn btn-primary formatBtn">Check Status</button>
          <br></br>
          <button onClick={this.start} className="btn btn-primary formatBtn">Start</button>
          <br></br>
          <button onClick={this.stop} className="btn btn-primary formatBtn">Stop</button>
          <br></br>
          <button onClick={this.restart} className="btn btn-primary formatBtn">Restart</button>
          <br></br>
          <div class="input-group mb-3 formatInput">
            <input onChange={this.handleChange} onKeyDown={this.handleEnter} type="text" className="form-control" placeholder="Command" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <button onClick={this.submit} className="btn btn-primary">Send</button>
          </div>
          <br></br>
          <pre style={{textAlign: "left"}}>{this.state.output}</pre>
        </div>

        <div class="players">
          <h1>Players</h1>
          <pre className="playerList">{players}</pre>
        </div>
      </div>
    );
  }
}

export default App;
