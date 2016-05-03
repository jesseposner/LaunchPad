var React = require('react'),
    UserStore = require('../stores/userStore'),
    ClientActions = require('../actions/clientActions'),
    hashHistory = require('react-router').hashHistory;

var LoginForm = React.createClass({
  getInitialState: function() {
    return {
      email: "",
      password: ""
    };
  },

  componentDidMount: function() {
    this.removeToken = UserStore.addListener(this.onChange);
    $(document).ready(function(){
      $('.pure-form').slick({
        accessibility: false,
        arrows: false,
        draggable: false,
        infinite: false,
        swipe: false,
        touchMove: false
      });
    });
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
      email: this.state.email,
      password: this.state.password
    });
  },

  submitSignup: function (event) {
    event.preventDefault();
    ClientActions.createUser({
      email: this.state.email,
      password: this.state.password
    });
  },

  updateemail: function (event) {
    this.setState({
      email: event.target.value
    });
  },

  updatePassword: function (event) {
    this.setState({
      password: event.target.value
    });
  },

  nextSlide: function () {
    $('.pure-form').slick('slickNext');
  },

  prevSlide: function () {
    $('.pure-form').slick('slickPrev');
  },

  render: function() {
    return (
      <div className="login-form">
        <span className="close" onClick={this.props.closeModal}>
          x
        </span>
        <br />
        <form className="pure-form pure-form-aligned">
          <div className="slide-1">
            <h2 className="form-title">Welcome</h2>
            <div className="pure-control-group">
                <label>E-Mail</label>
                <input id="email"
                       type="email"
                       placeholder="email"
                       value={this.state.email}
                       onChange={this.updateemail} />
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
                <button type="submit"
                        className="pure-button pure-button-primary"
                        onClick={this.submitLogin}>
                          Log in
                        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="submit"
                        className="pure-button pure-button-primary"
                        onClick={this.nextSlide}>
                          Sign up
                        </button>&nbsp;
            </div>
            <br />
            {this.state.errors}
          </div>
          <div className="slide-2">
            <div className="pure-control-group">
                <label>First Name</label>
                <input id="first-name"
                       type="text"
                       placeholder="First Name"
                       value={this.state.email}
                       onChange={this.updateemail} />
            </div>

            <div className="pure-control-group">
                <label>Last Name</label>
                <input id="last-name"
                       type="text"
                       placeholder="Last Name"
                       value={this.state.email}
                       onChange={this.updateemail} />
            </div>

            <div className="pure-control-group">
                <label>Street Address</label>
                <input id="street-address"
                       type="text"
                       placeholder="Street Address"
                       value={this.state.email}
                       onChange={this.updateemail} />
            </div>

            <div className="pure-control-group">
                <label>City</label>
                <input id="city"
                       type="text"
                       placeholder="City"
                       value={this.state.email}
                       onChange={this.updateemail} />
            </div>

            <div className="pure-control-group">
                <label>State</label>
                <select id="state" className="pure-input-1-2">
                    <option>AL</option>
                    <option>CA</option>
                    <option>IL</option>
                </select>
            </div>
            <div className="pure-control-group">
                <label>Zip</label>
                <input id="zip"
                       type="text"
                       placeholder="Zip"
                       value={this.state.email}
                       onChange={this.updateemail} />
            </div>
            <div className="pure-controls">
              <button type="submit"
                      className="pure-button pure-button-primary"
                      onClick={this.prevSlide}>
                        Back
                      </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button type="submit"
                      className="pure-button pure-button-primary"
                      onClick={this.submitSignup}>
                        Sign up
                      </button>&nbsp;
            </div>
            <br />
            {this.state.errors}
          </div>
        </form>
      </div>
    );
  }
});

module.exports = LoginForm;
