
class ColorBox extends React.Component {
  // Props = [color, cColor, changeEvent]
  constructor(props) {
    super(props);

    this.setScale = this.setScale.bind(this);
  }

  setScale() {
    let scale = 1;
    if (this.props.color == this.props.cColor) {
      scale = 0.9
    }
    return scale
  }

  render() {
    let style = {
      backgroundColor: this.props.color,
      transform: `scale(${this.setScale()})`
    }

    return (
      <button className="color-btn" style={style} id={this.props.color} onClick={this.props.changeEvent}>
      </button>
    )
  }
}
export default class CreateLabelMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {modalClass: "", label: "", colors: ['#ff4c4c', '#ffc168', '#8db9ca', '#6a67ce', '#01cd74', '#2d364c', '#685c53', '#282828', '#774aa4', '#ee70a6'], cColor: "#ffc168"}

    this.menuController = this.menuController.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.createLabel = this.createLabel.bind(this);
    this.colorChange = this.colorChange.bind(this);
  }

  colorChange(event) {
    this.setState({cColor: event.target.id})
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

  inputChange(event) {
    this.setState({label: event.target.value});
  }

  // Creates and stores a new label inside the user collection
  createLabel() {
    fetch('/create_label', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({'label': this.state.label, 'color': this.state.cColor})
    }).then((response) => {
      return response.json()
    }).then((data) => {
      // Reset states
      this.setState({label: "", cColor: "", modalClass: ""})
      console.log(data);
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    let boxes = this.state.colors.map((color) =>
      <ColorBox color={color} cColor={this.state.cColor} changeEvent={this.colorChange} />
    )

    return [
      <button id="create-label-btn" onClick={this.menuController}>
        <i class="fas fa-tag" id="label-icon"></i>
      </button>,

      <div className={"modal " + this.state.modalClass}>
        <div className="modal-content">
          <div className="create-label-menu">
            <div className="close-btn-container">
              <button className="close-btn" onClick={this.menuController}><i className="fas fa-times"></i></button>
            </div>

            <div className="header-container">
              <h3 className="menu-header">Create label</h3>
            </div>

            <input id="label-name-input" placeholder="Name" value={this.state.label} onChange={this.inputChange}></input>

            <div id="colors-container">
              {boxes}
            </div>

            <button id="save-btn" onClick={this.createLabel}>Create</button>
          </div>
        
        </div>
      
      </div>
    ]
  }
}
