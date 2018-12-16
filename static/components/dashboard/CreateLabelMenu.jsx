

class ColorBox extends React.Component {
  // Props = [color]
  constructor(props) {
    super(props);
  }

  render() {
    let style = {
      backgroundColor: this.props.color
    }

    return (
      <button className="color-btn" style={style}>
      </button>
    )
  }
}

export default class CreateLabelMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {menuState: "", colors: ['#ff4c4c', '#ffc168', '#8db9ca', '#6a67ce', '#01cd74', '#2d364c', '#685c53', '#282828', '#774aa4', '#ee70a6']}

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
    let boxes = this.state.colors.map((color) =>
      <ColorBox color={color} />
    )

    // We return a modal and the button that activates the modal

    return [
      <button id="create-label-btn" onClick={this.menuController}>
        <i class="fas fa-tag" id="label-icon"></i>
      </button>,

      <div className={"modal " + this.state.menuState}>
        <div className="modal-content">
          <div className="create-label-menu">
            <div className="header-container">
              <h3 className="menu-header">Create label</h3>
              <button className="close-btn" onClick={this.menuController}><i class="fas fa-times"></i></button>
            </div>

            <input id="label-name-input" placeholder="Name"></input>

            <div id="colors-container">
              {boxes}
            </div>

            <button id="save-btn">Create</button>
          </div>
        </div>
      </div>
    ]
  }
}
