
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
      intervalId: 0,
      timedOut: false
    }
  }

  handleClick(event) {
    const id = event.target.id
    if(!this.state.started){ 
      
      if(id === "session-increment") this.setState(prevState => ({
        session: Math.min(60,prevState.session + 1),
        timeLeft: prevState.timedOut ? prevState.timeLeft : Math.min(60 * 60 ,(prevState.session + 1) * 60)
      }))
      if(id === "session-decrement") this.setState(prevState => ({
        session: Math.max(1,prevState.session - 1),
        timeLeft: prevState.timedOut ? prevState.timeLeft : Math.max(60 ,(prevState.session - 1) * 60)
      }))
      if(id === "break-increment") this.setState(prevState => ({
        break: Math.min(60, prevState.break + 1),
        timeLeft: prevState.timedOut ? Math.min(60 * 60, (prevState.break + 1) * 60) : prevState.timeLeft
      }))
      if(id === "break-decrement") this.setState(prevState => ({
        break: Math.max(1, prevState.break - 1),
        timeLeft: prevState.timedOut ? Math.max(60, (prevState.break - 1) * 60) : prevState.timeLeft
      }))
      
    }
    if(id === "reset"){
      document.getElementById("beep").pause()
      document.getElementById("beep").currentTime = 0
      this.setState({
        session: 25, break: 5, timeLeft: 25 * 60, started: false, timedOut: false
      })
    }

    if(id === "start_stop") {
      this.setState(prevState => ({started: !prevState.started}))
    }
        
  }

 componentDidMount() {
  var intervalId = setInterval(() => {
    if(this.state.started) {
      this.setState(prevState => {
        if(prevState.timeLeft === 0) {         
          return {
            timedOut: !prevState.timedOut,
            timeLeft: prevState.timedOut ? prevState.session * 60 : prevState.break * 60
          }
        }
        return {timeLeft: prevState.timeLeft-1}
      })
       
     }
   }, 1000)
   this.setState({intervalId: intervalId})
 }

 componentWillUnmount() {
   clearInterval(this.state.intervalId)
 }

  render() {
    // formatting of the "time-left" Timer
    let minutes = Math.floor(this.state.timeLeft / 60)
    let seconds = this.state.timeLeft % 60
    seconds = seconds < 10 ? "0" + seconds : seconds
    minutes = minutes < 10 ? "0" + minutes : minutes

    if(this.state.timeLeft === 0) document.getElementById("beep").play()

    return (<div className="App">
      <div id="timer-container">
        <div id="timer-label">{this.state.timedOut ? "break" : "Session"}</div> 
        <div id="time-left">{minutes}:{seconds}</div>
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
      <audio 
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
    </div>)
  };
}

export default App;



