
class MenuHeader extends React.Component {
  // Props = [menuHeader, helpText, textRedirect, cMenu, menuName, menuChange]
  constructor(props) {
    super(props);
    this.setDisplay = this.setDisplay.bind(this);
  }

  setDisplay() {
    let display = "none";

    if (this.props.cMenu == this.props.menuName) {
      display = "flex";
    }

    return display;
  }


  render() {
    let style = {
      display: this.setDisplay()
    }
    return (
      <div className="header-container animated bounceInLeft" style={style}>
        <h3 className="header">{this.props.menuHeader}</h3>
        <p className="header-help-text">{this.props.helpText} <span onClick={this.props.menuChange} className="menu-switch-text">{this.props.textRedirect}</span></p>
      </div>
    )
  }
}

// This menu can either be for login or sign up. Following the DRY principle.
export default class AuthMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {username: "", password: "", cMenu: "signup"}

    this.onClick = this.onClick.bind(this);
    this.inputChange =  this.inputChange.bind(this);
    this.changeMenu =  this.changeMenu.bind(this);
  }

  changeMenu() {
    let newMenu = "signup";

    if (this.state.cMenu == "signup") {
      newMenu = "login"
    }
    this.setState({cMenu: newMenu});

    console.log(this.state.cMenu);
  }

  inputChange(event) {
    const name = event.target.name
    this.setState({
      [name]: event.target.value
    })
  }

  onClick(event) {
    let submitRoute = this.state.cMenu;
    event.preventDefault();

    fetch(submitRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({"username": this.state.username, "password": this.state.password})
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if (data['status'] == "success") {
        // Redirecting user to the dashboard
        window.location.replace('/dashboard')
      }
      console.log(data);
    })
  }

  render () {
    return (
      <div className="auth-menu-container">

        <div id="logo-container">
          <h1>Intervals</h1>
        </div>

        <MenuHeader menuHeader="Create an account" helpText="Already have an account?" textRedirect="Sign up here" cMenu={this.state.cMenu} menuName="signup" menuChange={this.changeMenu}/>
        <MenuHeader menuHeader="Login" helpText="Don't have an account?" textRedirect="Create an account here" cMenu={this.state.cMenu} menuName="login" menuChange={this.changeMenu}/>

        <div id="inputs-container">
          <label htmlFor="username">Username</label>
          <input id="username-input" placeholder="Username" type="text" name="username" onChange={this.inputChange} value={this.state.username}></input>
          <label htmlFor="password">Password</label>
          <input id="password-input" placeholder="Password" type="password" name="password" onChange={this.inputChange} value={this.state.password}></input>
        </div>

        <div id="btn-container">
          <button type="button" onClick={this.onClick} id="submit-btn"><i className="fas fa-arrow-right fa-5x"></i></button>
        </div>

      </div>
    )
  }
}

// No hay nada que pueda perder, que no pueda ser, que no pueda amar, que pueda soñar!
