var React = require('react'),
    UserStore = require('../stores/user_store'),
    ClientActions = require('../actions/client_actions');

var LoginForm = React.createClass({
  getInitialState: function() {
    return {
      currentUser: UserStore.currentUser(),
      userErrors: UserStore.errors()
    };
  },

  componentDidMount: function() {
    UserStore.addListener(this.updateUser);
    if (!UserStore.currentUser()) ClientActions.fetchCurrentUser();
  },

  updateUser: function () {
    this.setState({
      currentUser: UserStore.currentUser(),
      userErrors: UserStore.errors()
    });
  },

  render: function() {
    return (
      <div>
        {this.state.currentUser}
        {this.state.userErrors}
        "test"
      </div>
    );
  }

});

module.exports = LoginForm;
