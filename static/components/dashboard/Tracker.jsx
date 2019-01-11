
import LabelChanger from './LabelChanger.jsx';
import LabelMaker from './LabelMaker.jsx';
import Counter from './Counter.jsx';
import OnOffButton from './IoBtn.jsx';

/*
export default class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentLabel: "Untracked", "labels": [], tracking: false, initialSeconds: 0, loaded: false}

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

    if (this.state.tracking == true) {
      this.endTimestamp()
    }

    // Set new state and store the new timestamp
    this.setState({
      currentLabel: event.target.value
    }, () => {
      if (this.state.tracking == true) {
        this.storeTimestamp()
      }
    })
  }

  getLabels() {
    fetch('/get_labels')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          labels: data['data']
        }, () => {
          console.log("Labels acquired")
        })
      })
  }

  // Starts and stops tracking seconds
  trackerSwitch() {
    // Store the the timestamp on the database

    if (this.state.tracking == true) {
      this.endTimestamp()
    } else {
      this.storeTimestamp();
    }

    this.setState({
      tracking: this.state.tracking == true ? false : true
    })
  }

  storeTimestamp() {
    console.log(this.state.labels)
    fetch('/store_timestamp', {
      method: 'POST',
      body: JSON.stringify({'label': this.state.currentLabel, 'color': this.state.labels[this.state.currentLabel]['color']})
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  endTimestamp() {
    fetch('/end_timestamp', {
      method: 'POST',
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  trackerActive() {
    // Checks the last timestamp, if less than 24 hours have passed and the last timestamp was not closed,
    // we keep tracking time.
    fetch('/last_timestamp')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      if (data['data']['expired'] == "false") {
        // We keep tracking the seconds
        this.setState({
          currentLabel: data['data']['label'],
          tracking: true,
          initialSeconds: data['data']['elapsed_secs']
        }, () => {
        })
      }
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  componentWillMount() {
    // Get and set user labels
    this.getLabels();
    this.trackerActive();
  }
  
  render() {
    return (
      <div id="tracker">
        <div id="tracker-btns-container">
          <LabelChanger currentLabel={this.state.currentLabel} labels={this.state.labels} changeLabelEvent={this.changeLabel}/>
          <LabelMaker createEvent={this.createLabel}/>
        </div>

        <div id="timer-container">
          <Counter tracking={this.state.tracking} currentLabel={this.state.currentLabel} initialSeconds={this.state.initialSeconds} />
          <OnOffButton tracking={this.state.tracking} clickEvent={this.trackerSwitch} />
        </div>
      </div>
    )
  }
}

*/


