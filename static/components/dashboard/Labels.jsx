
import CreateLabelMenu from './CreateLabelMenu.jsx';


export default class LabelController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {cLabel: "Untracked", labelColor: "yellow", labels: [{"name": "Programming", "color": "green"}, {"name": "Reading", "color": "yellow"}]}
  }

  render() {
    return (
      <div id="labels-box">
        <CreateLabelMenu />
      </div>
    )
  }
}
