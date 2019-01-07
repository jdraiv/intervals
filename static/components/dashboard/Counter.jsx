import { throws } from "assert";

/*
// Keeps track of the seconds 
export default class TimeController extends React.Component {
  // Props = [label, tracking]
  constructor(props) {
    super(props);

    this.state = {seconds: 0, secondsStr: "00:00:00"}
  }

  secondsToText() {
    function doubleNumbers(num) {
      if (num.toString().length <= 1) {
        return `0${num}`;
      }
      return num
    }

    let [hours, minutes, seconds] = [0, 0, 0];
    let sec = this.state.seconds;

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

  countSeconds() {
    if (this.props.tracking == true) {
      this.setState({seconds: this.state.seconds + 1, secondsStr: this.secondsToText()})
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.countSeconds(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <h5 id="time-showcase">{this.state.secondsStr}</h5>
    )
  }
}
*/

export default class Counter extends React.Component {
  //Props = tracking
  constructor(props) {
    super(props);
    this.state = {seconds: 0, secondsToStr: "00:00:00"}

    this.countSec = this.countSec.bind(this);
  }

  secondsToText() {
    function doubleNumbers(num) {
      return num.toString().length <= 1 ? `0${num}` : num
    }

    let [hours, minutes, seconds] = [0, 0, 0];
    let sec = this.state.seconds;

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

  countSec() {
    if (this.props.tracking == true) {
      this.setState(state => ({
        seconds: state.seconds + 1,
        secondsToStr: this.secondsToText(state.seconds + 1)
      }));
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.countSec(), 1000)
  }

  render() {
    return (
      <h3 id="tracker-time">{this.state.secondsToStr}</h3>
    )
  }
}