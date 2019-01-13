
class Header extends React.Component {
  // Props = text
  render() {
    return <h3 id="daily-data-header">{this.props.text}</h3>
  }
}


class ChartItem extends React.Component {
  // Props =  label
  render() {
    let style = {
      backgroundColor: this.props.label['color']
    }
    return (
      <div className="chart-item">
        <div className="chart-item-bullet" style={style}></div>
        <h3 className="chart-item-text">{this.props.label['name']}</h3>
      </div>
    )
  }
}

class ChartItems extends React.Component {
  // Props = labels
  
  render() {
    let items = this.props.labels.map((label) => 
      <ChartItem label={label} />
    )
    return (
      <div className="chart-items-container">
        {items}
      </div>
    )
  }
}


class PieChart extends React.Component {
  // Props = labels
  constructor(props) {
    super(props);
  }

  drawData(labelsProps) {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");

    let lastEnd = 0;
    let total = 100
    let labels = labelsProps;

    labels.map((label) => {
      ctx.fillStyle = label['color']
      ctx.beginPath();

      ctx.moveTo(canvas.width / 2, canvas.weight / 2)

      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, lastEnd, lastEnd + (Math.PI * 2 * (parseInt(label['value']) / total)), false);
      ctx.lineTo(canvas.width / 2, canvas.height / 2)
      ctx.fill()
      lastEnd += Math.PI * 2 * (parseInt(label['value']) / total)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.labels.length != nextProps.labels.length) {
      this.drawData(nextProps.labels)
    }
  }

  render() {
    return (
      <div className="pie-chart">
        <canvas ref="canvas" />
      </div>
    )
  }
}

export default class DailyChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {labels: [], totalSeconds: 0}

    this.getData = this.getData.bind(this);
  }

  getData() {
    fetch('/daily_data')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      this.setState({
        totalSeconds: data['data']['total_seconds'],
        labels: data['data']['timestamps']
      }, () => {
        console.log("Acquired daily data")
      })
    })
  }

  componentWillMount() {
    this.getData()
  }

  render() {
    return (
      <div id="daily-chart">
        <Header text="Logged Time" />

        <div className="chart-container">
          <PieChart labels={this.state.labels} />
          <ChartItems labels={this.state.labels} />
        </div>

      </div>
    )
  }
}