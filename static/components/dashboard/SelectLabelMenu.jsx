export default class SelectLabelMenu extends React.Component {
  // Props = [cLabel, labels]
  constructor(props) {
    super(props);

    this.state = {modalClass: ""}

    this.menuController = this.menuController.bind(this);
  }

  menuController() {
    let newClass;

    if (this.state.modalClass == "") {
      newClass = "modal-active";
    }
    else if (this.state.modalClass == "modal-active") {
      newClass = ""
    }
    this.setState({modalClass: newClass})
  }

  render() {
    return [
      <button id="select-label-btn" onClick={this.menuController}>{this.props.cLabel}</button>,
      <div className={"modal " + this.state.modalClass}>
        <div className="modal-content">
          <div className="select-label-menu">

            <div className="close-btn-container">
              <button className="close-btn" onClick={this.menuController}><i className="fas fa-times"></i></button>
            </div>

            <div className="header-container">
              <h3 className="menu-header">Choose label</h3>
            </div>

            <h4 id="current-activity">Tracking: <span id="current-activity-name">{this.props.cLabel}</span></h4>

          </div>
        </div>
      </div>
    ]
  }
}
