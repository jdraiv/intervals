
import LabelChanger from './LabelChanger.jsx';
import LabelMaker from './LabelMaker.jsx'
import Counter from './Counter.jsx';
import OnOffButton from './IoBtn.jsx';
import Navbar from './Navbar.jsx'



// The dashboard needs to contain all the labels in order to function properly
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: [], 
      currentLabel: "",
      currentColor: "",
      tracking: false,
      seconds: 0
    }

    this.createLabel = this.createLabel.bind(this);
    this.changeLabel = this.changeLabel.bind(this);
    this.trackerSwitch = this.trackerSwitch.bind(this);
  }

  getLabels() {
    fetch('/get_labels')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      this.setState({
        labels: data['data'],
        currentLabel: data['data'][0]['name'],
      }, () => {
        console.log("Labels set")
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  createLabel(name, color) {
    // Store on database and state variable
    fetch('/create_label', {
      method: 'POST',
      body: JSON.stringify({'name': name, 'color': color})
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      if (data['status'] == "success") {
        let newDic = {'name': name, 'color': color}
        this.setState(prevState => ({
          labels: [...prevState.labels, newDic]
        }))
      }
    })
  }

  changeLabel(name, color) {
    this.setState({
      currentLabel: name,
      currentColor: color
    }, () => {
      console.log("Label has been changed, new label:", this.state.currentLabel, this.state.currentColor)
    })
  }

  storeTimestamp() {
    fetch('/store_timestamp', {
      method: 'POST',
      body: JSON.stringify({'label': this.state.currentLabel, 'color': this.state.currentColor})
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data);
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
      console.log(data)
    })
  }

  lastTimestamp() {
    fetch('/last_timestamp')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      if (data['status'] == "success") {
        let timestampData = data['data'];
        if (timestampData['expired'] == "false") {
          // The application needs to keep tracking. 
          console.log(timestampData)
          this.setState({
            currentLabel: timestampData['label'],
            currentColor: timestampData['color'],
            tracking: true,
            seconds: timestampData['elapsed_secs']
          })
        }
      }
    })
  }

  trackerSwitch() {
    let newTracking;

    if (this.state.tracking == false) {
      this.storeTimestamp()
      newTracking = true
    } else {
      this.endTimestamp()
      newTracking = false;
    }

    this.setState({
      tracking: newTracking
    })
  }

  count() {
    if (this.state.tracking == true) {
      this.setState(state => ({
        seconds: state.seconds + 1
      }))
    }
  }

  componentWillMount() {
    // Get labels and set a default label.

    this.getLabels();
    this.lastTimestamp();
  }

  componentDidMount() {
    this.interval = setInterval(() => this.count(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return [
      <div id="left-box">
        <Navbar />
      </div>,
      <div id="right-box">
        <div id="label-menus">
          <LabelChanger currentLabel={this.state.currentLabel} labels={this.state.labels} changeLabelEvent={this.changeLabel}/>
          <LabelMaker createEvent={this.createLabel}/>
        
        </div>

        <div id="tracker">
          <Counter seconds={this.state.seconds} />
          <OnOffButton tracking={this.state.tracking} clickEvent={this.trackerSwitch} />
        </div>
      </div>
    ]
  }
}

ReactDOM.render(
  <Dashboard />,
  document.getElementById('container')
)

/*

NO HAY NADA

QUE PUEDA PERDER
QUE NO PUEDA SER
QUE NO PUEDA AMAR
QUE PUEDA SOÑAR

*/
