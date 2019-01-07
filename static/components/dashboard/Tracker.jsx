
import LabelChanger from './LabelChanger.jsx';
import LabelMaker from './LabelMaker.jsx';
import Counter from './Counter.jsx';
import OnOffButton from './IoBtn.jsx';


export default class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentLabel: "Untracked", "labels": [], tracking: false}

    this.createLabel = this.createLabel.bind(this);
    this.changeLabel = this.changeLabel.bind(this);
    this.getLabels = this.getLabels.bind(this);
    this.trackerSwitch = this.trackerSwitch.bind(this);
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

  // Starts and stops tracking seconds
  trackerSwitch() {
    this.setState({
      tracking: this.state.tracking == true ? false : true
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
          <Counter tracking={this.state.tracking} />
          <OnOffButton tracking={this.state.tracking} clickEvent={this.trackerSwitch} />
          
        </div>
      </div>
    )
  }
}