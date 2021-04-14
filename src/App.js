
import React from 'react';
import './App.css';



class App extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      minutesLeft: 0,
      secondsLeft: 0,
      session: 25,
      break: 5,
      started: false,
      time: "",
      timeEnd: "",
      intervalId: null
    }
  }

  handleClick(event) {
    const id = event.target.id
    
    if(id === "session-increment") this.setState(prevState => ({session: prevState.session + 1}))
    if(id === "session-decrement") this.setState(prevState => ({session: prevState.session - 1}))
    if(id === "break-increment") this.setState(prevState => ({break: prevState.break + 1}))
    if(id === "break-decrement") this.setState(prevState => ({break: prevState.break - 1}))
    if(id === "reset") console.log("hi")

    if(id === "start_stop") this.setState(prevState => ({started: !prevState.started}))
        
  }

  render() {

    return (<div className="App">
      <div id="timer-container">
        <div id="timer-label">Session</div> 
        <div id="time-left">25:00</div>
      </div>
      <div id="timer-buttons-container">
        <button id="start_stop" onClick={this.handleClick} className="button">{this.state.started ? "Stop" : "Start"}</button>
        <button id="reset" onClick={this.handleClick} className="button">Reset</button>
      </div>
      <div id="session-container">
        <div id="session-label">Session Length</div>
        <div id="session-length">{this.state.session}</div>
        <div id="session-button-container">
          <button id="session-increment" onClick={this.handleClick} className="button">&#9650;</button>
          <button id="session-decrement" onClick={this.handleClick} className="button">&#9660;</button>
        </div>
      </div>
      <div id="break-container">
        <div id="break-label">Break Length</div>
        <div id="break-length">{this.state.break}</div>
        <div id="break-button-container">
          <button id="break-increment" onClick={this.handleClick} className="button">&#9650;</button>
          <button id="break-decrement" onClick={this.handleClick} className="button">&#9660;</button>
        </div>
      </div>
    </div>)
  };
}

export default App;



