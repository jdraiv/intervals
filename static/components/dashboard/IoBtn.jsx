
export default class OnOffButton extends React.Component {
    // Props = [clickEvent, tracking]
    constructor(props) {
      super(props);
  
      this.setBtnText = this.setBtnText.bind(this);
    }
  
    setBtnText() {
      let text;
  
      if (this.props.tracking == false) {
        text = "Start day";
      } else if (this.props.tracking == true) {
        text = "End day";
      }
  
      return text;
    }
  
    render() {
      let btnText = this.setBtnText();
      return <button id="io-btn" onClick={this.props.clickEvent}>{btnText}</button>
    }
  }