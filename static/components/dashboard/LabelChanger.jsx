
// Initial menu button
class MenuBtn extends React.Component {
  // clickEvent, currentLabel
  render() {
    return (
      <button id="label-change-btn" onClick={this.props.clickEvent}>{this.props.currentLabel}</button>
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
      <div id="label-change-header">
        <h1 className="header">{this.props.headerText}</h1>
      </div>
    )
  }
}

class LabelItem extends React.Component {
  // Props = name, color, clickEvent, internalClickEvent
  render() {
    let style = {
      backgroundColor: this.props.color
    }
    return (
      <div>
        <button className="label-item" id={this.props.color}  value={this.props.name} style={style} onClick={this.props.clickEvent}>{this.props.name}</button>
      </div>
    )
  }
}

class LabelsContainer extends React.Component {
  // Props = labels, clickEvent, 
  render() {
    let labels = this.props.labels.map((label) =>
      <LabelItem name={label['name']} color={label['color']} clickEvent={this.props.clickEvent}/>           
    )
    return (
      <div id="labels-container">
        {labels}
      </div>                                                                        
    )
  }
}

export default class LabelChanger extends React.Component {
  // Props = currentLabel, labels, changeLabelEvent
  constructor(props) {
    super(props);
    this.state = {modalStatus: ''}
    
    this.showOrHideEvent = this.showOrHideEvent.bind(this);
    this.submitNewLabel = this.submitNewLabel.bind(this);
  }
  
  showOrHideEvent() {
    this.setState({
      modalStatus: this.state.modalStatus === '' ? 'modal-active': ''
    })
  }

  // We create a new click function since two operations need to be done once the user clicks the new label
  submitNewLabel(event) {
    this.props.changeLabelEvent(event.target.value, event.target.id);
    this.showOrHideEvent();
  }
  
  render() {
    return [
      <MenuBtn clickEvent={this.showOrHideEvent} currentLabel={this.props.currentLabel}/>,
      <div className={"modal " + this.state.modalStatus}>
        <div className="modal-content">
  
          <div id="label-change-menu">
            <CloseBtn clickEvent={this.showOrHideEvent} />
            <MenuHeader headerText="Choose Label" />
            <LabelsContainer labels={this.props.labels} clickEvent={this.submitNewLabel}/>
          </div>
        </div>
        
      </div>
    ]
  }
}
