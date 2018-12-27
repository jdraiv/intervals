
import TimeController from './TimeController.jsx';
import SelectLabelMenu from './SelectLabelMenu.jsx';
import CreateLabelMenu from './CreateLabelMenu.jsx';
import OnOffButton from './IoBtn.jsx';

export default class Tracker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {tracking: false, cLabel: "Untracked", userLabels: []}

    this.startorEndEvent = this.startorEndEvent.bind(this);
  }

  // Start or end date click event
  startorEndEvent() {
    let newState;
    if (this.state.tracking == true) {
      newState = false;

    } else if (this.state.tracking == false) {
      newState = true;
    }
    this.setState({tracking: newState})
  }

  render() {
    return (
      <div id="time-tracker">

        <div id="labels-box">
          <SelectLabelMenu cLabel={this.state.cLabel} />
          <CreateLabelMenu />
        </div>
        <div id="tracker-right-box">
          <TimeController tracking={this.state.tracking} />
          <OnOffButton clickEvent={this.startorEndEvent} tracking={this.state.tracking}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Tracker />,
  document.getElementById('container')
)