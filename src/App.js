
import React from 'react';
import './App.css';



class App extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      timeLeft: 25 * 60,
      minutesLeft: 25,
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
    
    if(id === "session-increment") this.setState(prevState => ({session: Math.min(120,prevState.session + 1)}))
    if(id === "session-decrement") this.setState(prevState => ({session: Math.max(0,prevState.session - 1)}))
    if(id === "break-increment") this.setState(prevState => ({break: Math.min(120, prevState.break + 1)}))
    if(id === "break-decrement") this.setState(prevState => ({break: Math.max(0, prevState.break - 1)}))
    if(id === "reset") this.setState({session: 25, break: 5, timeLeft: 25 * 60, started: false})

    if(id === "start_stop") {
      if(this.state.started) this.setState({started: false})
      else {
        this.setState(prevState => {
          return {
            timeLeft: prevState.session * 60,
            started: true
          }
        })
        
      }
    }
        
  }

 componentDidMount() {
   var intervalId = setInterval(() => {
     if(this.state.started) {
       this.setState(prevState => ({timeLeft: prevState.timeLeft-1}))
     }
   }, 1000)
   this.setState({intervalId: intervalId})
 }

 componentWillUnmount() {
   clearInterval(this.state.intervalId)
 }

  render() {

    return (<div className="App">
      <div id="timer-container">
        <div id="timer-label">Session</div> 
        <div id="time-left">{Math.floor(this.state.timeLeft/60)}:{this.state.timeLeft%60}</div>
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



