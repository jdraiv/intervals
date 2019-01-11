

export default class Counter extends React.Component {
  //Props = seconds
  constructor(props) {
    super(props);
  }

  secondsToText(num) {
    function doubleNumbers(num) {
      return num.toString().length <= 1 ? `0${num}` : num
    }

    let [hours, minutes, seconds] = [0, 0, 0];
    let sec = num;

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

  render() {
    let secondsToStr = this.secondsToText(this.props.seconds)
    return (
      <h3 id="tracker-time">{secondsToStr}</h3>
    )
  }
}