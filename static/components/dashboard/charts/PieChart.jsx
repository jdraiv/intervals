

export default class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {totalSeconds: 0, labels: []}
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
        this.drawData();
      })
    })
  }
  componentWillMount() {
    this.getData();
  }

  drawData() {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");

    let lastEnd = 0;
    let total = 100
    let labels = this.state.labels;
    console.log(labels)

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

  render() {
    return (
      <div className="pie-chart">
        <canvas ref="canvas" />
      </div>
    )
  }
}