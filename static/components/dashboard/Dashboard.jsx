
import TimeTracker from './TimeTracker.jsx'
import LabelsController from './Labels.jsx'
import Navbar from './Navbar.jsx'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return [
      <div id="left-box">
        <Navbar />
      </div>,
      <div id="right-box">
        <div id="time-tracker">
          <LabelsController />
          <TimeTracker />
        </div>
      </div>
    ]
  }
}

ReactDOM.render(
  <Dashboard />,
  document.getElementById('container')
)
