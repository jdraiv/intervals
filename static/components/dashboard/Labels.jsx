

/*

class SelectMenu extends React.Component {
  // Props = [labels]
  constructor(props) {
    super(props);
  }

  render() {
    let labels = this.props.labels.map((label) =>
      <LabelItem labelName={label['name']} labelColor={label['color']} />
    )

    return (
      <div className="special-menu-content">
        <div className="special-menu-header-container">
          <h6 className="special-menu-header">Labels</h6>
          <button className="close-btn"><i class="fas fa-times"></i></button>
        </div>
        {labels}
      </div>

    )
  }
}


*/

// The label item that is inside the special menu component
class LabelItem extends React.Component {
  // Props = [labelName, labelColor]
  constructor(props) {
    super(props);
  }

  render() {
    let style = {
      backgroundColor: this.props.labelColor
    }

    return (
      <button className="label-item" style={style}>{this.props.labelName}</button>
    )
  }
}

class LabelButton extends React.Component {

  // Props = [label, clickEvent]
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button id="current-label" onClick={this.props.clickEvent}>
        {this.props.label}
        <i className="fas fa-caret-down"></i>
      </button>
    )
  }
}

class SelectLabelMenu extends React.Component {
  // Props = [cLabel, labelColor, labels]
  constructor(props) {
    super(props);

    this.state = {menuState: "inactive"}

    this.menuSwitch = this.menuSwitch.bind(this);
  }

  // This function sets the active or inactive class to the menu
  menuSwitch() {
    let newState = "active";

    if (this.state.menuState == "active") {
      newState = "inactive";
    }

    this.setState({menuState: newState})

  }

  render() {
    let labels = this.props.labels.map((label) =>
      <LabelItem labelName={label['name']} labelColor={label['color']} />
    )

    return (
      <div className="special-menu">
        <LabelButton label={this.props.cLabel} clickEvent={this.menuSwitch}/>

        <div className={"special-menu-content " + this.state.menuState}>
          <div className="special-menu-header-container">
            <h6 className="special-menu-header">Labels</h6>
            <button className="close-btn"><i class="fas fa-times"></i></button>
          </div>
          {labels}
        </div>
      </div>
    )
  }
}


export default class LabelController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {cLabel: "Untracked", labelColor: "yellow", labels: [{"name": "Programming", "color": "green"}, {"name": "Reading", "color": "yellow"}]}
  }

  render() {
    return (
      <div id="labels-box">
        <SelectLabelMenu cLabel={this.state.cLabel} labelColor={this.state.labelColor} labels={this.state.labels} />
      </div>
    )
  }
}
