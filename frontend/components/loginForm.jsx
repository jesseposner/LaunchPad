var React = require('react'),
    UserStore = require('../stores/userStore'),
    ClientActions = require('../actions/clientActions'),
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
    }, this.checkResult);
  },

  checkResult: function () {
    if (!this.state.errors) this.props.closeModal();
  },

  submitLogin: function (event) {
    event.preventDefault();
    ClientActions.createSession({
      username: this.state.username,
      password: this.state.password
    });
  },

  submitSignup: function (event) {
    event.preventDefault();
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
      <div className="login-form">
        <span className="close" onClick={this.props.closeModal}>
          x
        </span>
        <br />
        <form className="pure-form pure-form-aligned">
          <fieldset>
              <div className="pure-control-group">
                  <label>Username</label>
                  <input id="name"
                         type="text"
                         placeholder="Username"
                         value={this.state.username}
                         onChange={this.updateUsername} />
              </div>

              <div className="pure-control-group">
                  <label>Password</label>
                  <input id="password"
                         type="password"
                         placeholder="Password"
                         value={this.state.password}
                         onChange={this.updatePassword} />
              </div>

              <div className="pure-controls">
                  <label className="pure-checkbox">
                      <input id="cb"
                             type="checkbox" />
                         &nbsp;I've read the terms and conditions.
                  </label>

                  <button type="submit"
                          className="pure-button pure-button-primary"
                          onClick={this.submitLogin}>
                            Log in
                          </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button type="submit"
                          className="pure-button pure-button-primary"
                          onClick={this.submitSignup}>
                            Sign up
                          </button>&nbsp;
              </div>
              <br />
              {this.state.errors}
          </fieldset>
        </form>
      </div>
    );
  }
});

module.exports = LoginForm;
