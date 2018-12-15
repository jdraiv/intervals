
//let ws = new WebSocket("ws://localhost:5000/time_tracker");

function doubleNumbers(num) {
  if (num.toString().length <=  1) {
    return `0${num}`;
  }
  return num;
}

function timeMaker(sec) {
  let [hours, minutes, seconds] = [0, 0, 0];

  while (sec > 0) {
    if (sec > 3600) {
      sec -= 3600
      hours += 1
    }
    else if (sec > 60 && sec <= 3600) {
      sec -= 60
      minutes += 1
    }
    else if (sec <= 60) {
      seconds += sec
      sec = 0
    }
  }
  return `${doubleNumbers(hours)}:${doubleNumbers(minutes)}:${doubleNumbers(seconds)}`;
}

// On, we start counting
// Off, we do nothing. Sweet dreams are melodies zZzZzZ

class IOSwitch extends React.Component {

  // Props = [clickEvent], switchState]
  constructor(props) {
    super(props);
  }

  render() {
    let btnText;

    if (this.props.switchState == 0) {
      btnText = "Start day"
    } else {
      btnText = "End day"
    }

    return <button id="io-btn" onClick={this.props.clickEvent}>{btnText}</button>
  }
}

export default class TimeTracker extends React.Component {
  constructor(props) {
    super(props);

    this.state =  {switchState: 0, seconds: 0, timeStr: "00:00:00"}

    this.switchEvent = this.switchEvent.bind(this);
  }

  tick() {
    if (this.state.switchState == 1) {
      this.setState({seconds: this.state.seconds + 1, timeStr: timeMaker(this.state.seconds)})
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  switchEvent() {
    let newState = 0
    if (this.state.switchState == 0) {
      newState = 1
    } else if (this.state.switchState == 1) {
      newState = 0
    }
    this.setState({switchState: newState})
  }

  render() {
    return (
      <div id="tracker-right-box">
        <h5 id="time-showcase">{this.state.timeStr}</h5>
        <IOSwitch clickEvent={this.switchEvent} switchState={this.state.switchState} />
      </div>
    )
  }
}
