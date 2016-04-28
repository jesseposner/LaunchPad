var React = require('react'),
    UserStore = require('../stores/userStore'),
    LoginForm = require('./loginForm'),
    ClientActions = require('../actions/clientActions');

 var App = React.createClass({
   getInitialState: function() {
     return {
       currentUser: UserStore.currentUser()
     };
   },

   componentDidMount: function() {
     this.removeToken = UserStore.addListener(this.onChange);
     ClientActions.fetchCurrentUser();
   },

   componentWillUnmount: function() {
     this.removeToken.remove();
   },

   onChange: function () {
     this.setState({
       currentUser: UserStore.currentUser()
     });
   },

   submitLogout: function () {
     ClientActions.deleteSession();
   },

 	render: function () {
    var userEl;

    if (!this.state.currentUser) {
      userEl = <LoginForm />;
    } else {
      userEl = (
        <div>
          <p />
          <button onClick={this.submitLogout}>
            Logout
          </button>
        </div>
      );
    }

 		return(
 			<div>
 				LaunchPad
        {userEl}
        <p />
 				{this.props.children}
 			</div>
 		);
 	}

 });

 module.exports = App;
