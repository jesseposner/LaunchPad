var React = require('react'),
    UserStore = require('../stores/user_store'),
    ClientActions = require('../actions/client_actions'),
    hashHistory = require('react-router').hashHistory;

var LoginForm = React.createClass({
  getInitialState: function() {
    return {
      username: "",
      password: ""
    };
  },

  componentDidMount: function() {
    this.removeToken = UserStore.addListener(this.onChange);
  },

  componentWillUnmount: function() {
    this.removeToken.remove();
  },

  onChange: function () {
    this.setState({
      errors: UserStore.errors()
    });
  },

  submitLogin: function (event) {
    ClientActions.createSession({
      username: this.state.username,
      password: this.state.password
    });
  },

  submitSignup: function (event) {
    ClientActions.createUser({
      username: this.state.username,
      password: this.state.password
    });
  },

  updateUsername: function (event) {
    this.setState({
      username: event.target.value
    });
  },

  updatePassword: function (event) {
    this.setState({
      password: event.target.value
    });
  },

  render: function() {
    return (
      <div id="login-form">
        <br />
        <form>
          <label>Username:&nbsp;
            <input type="text"
                   placeholder="Username"
                   value={this.state.username}
                   onChange={this.updateUsername} />
          </label>
          <br />
          <label>Password:&nbsp;
            <input type="password"
                   placeholder="Password"
                   value={this.state.password}
                   onChange={this.updatePassword} />
          </label>
          <p />
          <button onClick={this.submitLogin}>
            Login
          </button>&nbsp;
          <button onClick={this.submitSignup}>
            Sign Up
          </button>
        </form>
        <br />
        {this.state.errors}
      </div>
    );
  }
});

module.exports = LoginForm;
