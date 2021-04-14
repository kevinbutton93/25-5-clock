
import React from 'react';
import './App.css';



class App extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.countdown = this.countdown.bind(this)
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
    if(id === "reset") clearInterval(this.state.intervalId)

    if(id === "start_stop") this.setState(prevState => {
      if(!prevState.started) {
        return {timeEnd: new Date().getTime() + (prevState.session * 1000 * 60), started: !prevState.started}
      } else {
        return {started: !prevState.started}
      }
    })
    
  }

  countdown() {
    if(this.state.started)this.setState({time: new Date().getTime()})
  }

  componentDidMount() { 
    this.setState({timeEnd: new Date().getTime()})
    var intervalId = setInterval(this.countdown, 1000)
    this.setState({intervalId: intervalId})
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  render() {

    var timeLeft = this.state.timeEnd - this.state.time
    var minutesLeft = Math.floor(timeLeft/1000/60)
    var secondsLeft = Math.floor((timeLeft - (minutesLeft * 60 * 1000)) / 1000)
    if(minutesLeft < 10) minutesLeft = "0" + minutesLeft
    if(secondsLeft < 10) secondsLeft = "0" + secondsLeft

    return (<div className="App">
      <div id="timer-container">
        <div id="timer-label">Session</div> 
        <div id="time-left">{minutesLeft}:{Math.round(secondsLeft)}</div>
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
