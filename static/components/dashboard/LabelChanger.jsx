
class LabelItem extends React.Component {
  // Props = name, color, clickEvent
  render() {
    return (
      <div>
        <button value={this.props.name} onClick={this.props.clickEvent}>{this.props.name}</button>
      </div>
    )
  }
}

class LabelsContainer extends React.Component {
  // Props = labels, clickEvent
  render() {
    let labels = this.props.labels.map((label) =>
      <LabelItem name={label['name']} clickEvent={this.props.clickEvent}/>                                   
    )
    return (
      <div id="labels-container">
        {labels}
      </div>                                                                        
    )
  }
}

class CurrentLabel extends React.Component {
  // Props = currentLabel
  render() {
    return (
      <h4>{this.props.currentLabel}</h4>
    )
  }
}

export default class LabelChanger extends React.Component {
  // Props = currentLabel, labels, changeLabelEvent
  constructor(props) {
    super(props);
    this.state = {modalStatus: ''}
    
    this.showOrHideEvent = this.showOrHideEvent.bind(this);
  }
  
  showOrHideEvent() {
    this.setState({
      modalStatus: this.state.modalStatus === '' ? 'modal-active': ''
    })
  }
  
  render() {
    return [
      <button onClick={this.showOrHideEvent}>{this.props.currentLabel}</button>,
      <div className={"modal " + this.state.modalStatus}>
        <div className="modal-content">
          
          <div id="label-change-menu">
            <button onClick={this.showOrHideEvent}>close</button>
            <CurrentLabel />
            <LabelsContainer labels={this.props.labels} clickEvent={this.props.changeLabelEvent}/>
          </div>
        </div>
        
      </div>
    ]
  }
}
