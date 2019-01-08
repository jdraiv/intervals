

export default class Counter extends React.Component {
  //Props = tracking, currentLabel
  constructor(props) {
    super(props);
    this.state = {seconds: 0, secondsToStr: "00:00:00", label: ""}

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
      if (this.props.currentLabel != this.state.label) {
        this.setState({
          seconds: 0,
          secondsToStr: this.secondsToText(0),
          label: this.props.currentLabel
        })
      }
      else {
        this.setState(state => ({
          seconds: state.seconds + 1,
          secondsToStr: this.secondsToText(state.seconds + 1)
        }));
      }
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.countSec(), 1000)
  }

  componentWillMount() {
    this.setState({label: this.props.currentLabel})

  }

  render() {
    return (
      <h3 id="tracker-time">{this.state.secondsToStr}</h3>
    )
  }
}