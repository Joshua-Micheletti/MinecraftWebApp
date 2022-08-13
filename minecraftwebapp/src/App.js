import logo from './logo.svg';
import './App.css';
import HTTPButton from './modules/HTTPButton.js'

function App() {
  return (
    <div className="App" style={{paddingTop: "10%", paddingBottom: "10%", paddingRight: "30%", paddingLeft: "30%", textAlign: "center", verticalAlign: "center"}}>
      <HTTPButton text="Start" resource="start" />
      <br></br>
      <HTTPButton text="Stop" resource="stop" />
      <br></br>
      <HTTPButton text="Restart" resource="restart" />
      <br></br>
      <HTTPButton text="Check Status" resource="checkStatus" />
    </div>
  );
}

export default App;
