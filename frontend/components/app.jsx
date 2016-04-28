var React = require('react'),
    UserStore = require('../stores/user_store'),
    LoginForm = require('./login_form'),
    ClientActions = require('../actions/client_actions');

 module.exports = React.createClass({
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
      userEl = <button onClick={this.submitLogout}>Logout</button>;
    }

 		return(
 			<div>
 				LaunchPad
 				{this.props.children}
        <p />
        {userEl}
 			</div>
 		);
 	}
 });
