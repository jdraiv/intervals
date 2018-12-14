
import TimeTracker from './TimeTracker.jsx'
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
        <TimeTracker />
      </div>
    ]
  }
}

ReactDOM.render(
  <Dashboard />,
  document.getElementById('container')
)
