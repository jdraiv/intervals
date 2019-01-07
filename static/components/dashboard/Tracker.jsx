
import LabelChanger from './LabelChanger.jsx';
import LabelMaker from './LabelMaker.jsx';

export default class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentLabel: "Untracked", "labels": []}

    this.createLabel = this.createLabel.bind(this);
    this.changeLabel = this.changeLabel.bind(this);
    this.getLabels = this.getLabels.bind(this);
  }

  createLabel(name, color, menuResetFunction) {
    fetch('/create_label', {
      method: 'POST',
      body: JSON.stringify({'name': name, 'color': color}),
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      if (data['status'] == 'success') {
        menuResetFunction()
        this.setState(previousState => ({
          labels: [...previousState.labels, {'name': name, 'color': color}]
        }))
      }
    })
  }
  
  changeLabel(event) {
    // Save information about the old label, reset timer.   
    this.setState({currentLabel: event.target.value})
  }

  getLabels() {
    fetch('/get_labels')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({labels: data['data']})
      })
  }

  componentWillMount() {
    // Get and set user labels
    this.getLabels();
  }
  
  render() {
    return (
      <div id="tracker">
        <div id="tracker-btns-container">
          <LabelChanger currentLabel={this.state.currentLabel} labels={this.state.labels} changeLabelEvent={this.changeLabel}/>
          <LabelMaker createEvent={this.createLabel}/>
        </div>

        <div id="timer-container">
        </div>
      </div>
    )
  }
}