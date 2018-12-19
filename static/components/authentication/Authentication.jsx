
import AuthMenu from './AuthMenu.jsx'

class AuthPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="auth-page">
        <div id="left-box">
          <AuthMenu />
        </div>
        <div id="right-box">
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <AuthPage />,
  document.getElementById('container')
);
