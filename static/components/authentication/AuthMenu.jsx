

// This menu can either be for login or sign up. Following the DRY principle.
export default class AuthMenu extends React.Component {
  // Props = [routeEndpoint, menu (it can be login or sign up)]
  constructor(props) {
    super(props);

    this.state = {username: "", password: ""}

    this.onClick = this.onClick.bind(this);
    this.inputChange =  this.inputChange.bind(this);
  }

  inputChange(event) {
    const name = event.target.name
    this.setState({
      [name]: event.target.value
    })
  }

  onClick(event) {
    event.preventDefault();

    fetch("/auth", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({"username": this.state.username, "password": this.state.password})
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data);
    })
  }

  render () {
    return (
      <div className="auth-menu-container">

        <div id="logo-container">
          <h1>Intervals</h1>
        </div>

        <div id="menu-options-container">
          <button className="menu-option-btn">Login</button>
          <button className="menu-option-btn">Sign Up</button>
        </div>

        <div id="inputs-container">
          <label htmlFor="username">Username</label>
          <input id="username-input" placeholder="Username" type="text" name="username" onChange={this.inputChange} value={this.state.username}></input>
          <label htmlFor="password">Password</label>
          <input id="password-input" placeholder="Password" type="password" name="password" onChange={this.inputChange} value={this.state.password}></input>
        </div>

        <div id="btn-container">
          <button type="button" onClick={this.onClick}><i className="fas fa-arrow-right fa-5x"></i></button>
        </div>

      </div>
    )
  }
}




// No hay nada que pueda perder, que no pueda ser, que no pueda amar, que pueda soñar!
