


class LabelItem extends React.Component {
  // Props = [label, color]
  constructor(props) {
    super(props);
  }

  render() {
    let style = {
      backgroundColor: this.props.color
    }

    return (
      <button className="label-item" style={style}>{this.props.label}</button>
    )
  }
}

export default class SelectLabelMenu extends React.Component {
  // Props = [cLabel, labels]
  constructor(props) {
    super(props);

    this.state = {menuState: ""}

    this.menuController = this.menuController.bind(this);
  }

  menuController() {
    let newState = "modal-active";

    if (this.state.menuState == "modal-active") {
      newState = ""
    }
    this.setState({menuState: newState})
  }

  render() {
    let labels = this.props.labels.map((label) =>
      <LabelItem label={label['name']} color={label['color']} />
    )
    return [
      <button id="select-label-btn" onClick={this.menuController}>{this.props.cLabel}</button>,
      <div className={"modal " + this.state.menuState}>
        <div className="modal-content">
          <div className="select-label-menu">
            <div className="close-btn-container">
              <button className="close-btn" onClick={this.menuController}><i class="fas fa-times"></i></button>
            </div>
            <div className="header-container">
              <h3 className="menu-header">Choose label</h3>
            </div>
            <h4 id="current-activity">Tracking: <span id="current-activity-name">{this.props.cLabel}</span></h4>
            <div className="labels-container">
              {labels}
            </div>
          </div>
        </div>
      </div>
    ]
  }
}
