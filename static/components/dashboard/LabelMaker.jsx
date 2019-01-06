


class LabelBtn extends React.Component {
  // Props = clickEvent
  render() {
    return (
      <button id="label-maker-btn" onClick={this.props.clickEvent}>
        <i class="fas fa-tag"></i>
      </button>
    )
  }
}

class CloseBtn extends React.Component {
  // Props = clickEvent
  render() {
    return (
      <div id="close-btn-container">
        <button className="close-btn" onClick={this.props.clickEvent}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    )
  }
}

class MenuHeader extends React.Component {
  // Props = headerText
  render() {
    return (
      <div id="label-maker-header">
        <h1 className="header">{this.props.headerText}</h1>
      </div>
    )
  }
}

class ColorNameInput extends React.Component {
  // Props = changeEvent, inputValue
  render() {
    return <input id="label-maker-input" type="text" name="name" onChange={this.props.changeEvent} value={this.props.inputValue}/> 
  }
}

// Presentational component
class ColorItem extends React.Component {
  // Props = color, currentColor, clickEvent

  getScale() {
    return this.props.color === this.props.currentColor ? 0.9: 1
  }

  render() {
    let style = {
      backgroundColor: this.props.color,
      transform: `scale(${this.getScale()})`
    }
    return (
      <button id="color-btn" style={style} value={this.props.color} onClick={this.props.clickEvent}></button>
    )
  }
}

class ColorsContainer extends React.Component {
  // Props = clickEvent, currentColor
  constructor(props) {
    super(props);
    this.state = {colors: ['#ff4c4c', '#ffc168', '#8db9ca', '#6a67ce', '#01cd74', '#2d364c', '#685c53', '#282828', '#774aa4', '#ee70a6']}
  }
  
  render() {
    let colors = this.state.colors.map((color) =>                                 
      <ColorItem color={color} currentColor={this.props.currentColor} clickEvent={this.props.clickEvent}/>
    )
    return <div id="colors-container">{colors}</div>
  }
}

class CreateBtn extends React.Component {
  // Props = clickEvent, inputValue

  setClass() {
    return this.props.inputValue.length <= 0 ? "create-btn-inactive" : "create-btn-active";
  }

  render() {
    let btnClass = this.setClass();
    return (
      <div id="create-btn-container">
        <button className={btnClass} id="create-btn" onClick={this.props.clickEvent}>Create</button>
      </div>
    )
  }
}

export default class LabelMaker extends React.Component {
  // Props = createEvent, inputValue
  constructor(props) {
    super(props);
    this.state = {name: '', color: '#8db9ca', modalStatus: ''}
    
    this.inputChange = this.inputChange.bind(this);
    this.changeColorEvent = this.changeColorEvent.bind(this);
    this.showOrHideEvent = this.showOrHideEvent.bind(this);
    this.internalClickEvent = this.internalClickEvent.bind(this);
  }
  
  inputChange(event) {
    const target = event.target;
    const name = target.name
    
    this.setState({
      [name]: target.value
    })
  }
  
  changeColorEvent(event) {
    this.setState({color: event.target.value})
  }

  // Resets the internal state variables
  internalClickEvent() {
    this.setState({name: '', color: '', modalStatus: ''})
  }
  
  showOrHideEvent() {
    this.setState({
      modalStatus: this.state.modalStatus === '' ? 'modal-active': ''
    })
  }
  
  render() {
    return [
      <LabelBtn clickEvent={this.showOrHideEvent} />,
      
      <div className={"modal " + this.state.modalStatus}>
        <div className="modal-content">
          <div id="label-maker-menu">
            <CloseBtn clickEvent={this.showOrHideEvent} />
            <MenuHeader headerText="Create Label" /> 

            <ColorNameInput inputValue={this.state.name} changeEvent={this.inputChange}/>
            
            <ColorsContainer clickEvent={this.changeColorEvent} currentColor={this.state.color} />
            <CreateBtn clickEvent={this.props.createEvent.bind(this, this.state.name, this.state.color, this.internalClickEvent.bind(this))} inputValue={this.state.name} />
          </div>
        </div>
      </div>
    ]
  }
}
