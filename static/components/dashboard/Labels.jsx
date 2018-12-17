
import CreateLabelMenu from './CreateLabelMenu.jsx';
import SelectLabelMenu from './SelectLabelMenu.jsx';


export default class LabelController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {cLabel: "Untracked", labelColor: "yellow", labels: [{"name": "Programming", "color": "#ffc168"}, {"name": "Reading", "color": "#01cd74"}]}
  }

  render() {
    return (
      <div id="labels-box">
        <SelectLabelMenu cLabel={this.state.cLabel} labels={this.state.labels} />
        <CreateLabelMenu />
      </div>
    )
  }
}
