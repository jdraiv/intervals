
export default class OnOffButton extends React.Component {
    // Props = [clickEvent, tracking]
    constructor(props) {
      super(props);
  
      this.setBtnText = this.setBtnText.bind(this);
    }

    setBtnText() {
      return this.props.tracking == false ? "Start day" : "End day"
    }
  
    render() {
      let btnText = this.setBtnText();
      return <button id="io-btn" onClick={this.props.clickEvent}>{btnText}</button>
    }
  }