

// Vertical navbar

class Button extends React.Component {
  // Props = [text, icon]
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className="navbar-element">
        {this.props.text}
      </button>

    )
  }
}

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="vertical-navbar">
        <div id="navbar-logo">
          <h3 id="logo-text">Intervals</h3>
        </div>

        <div id="navbar-elements">
          <Button text="Daily stats" />
          <Button text="Historic data" />
        </div>

      </div>
    )
  }
}
