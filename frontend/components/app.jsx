var React = require('react'),
    UserStore = require('../stores/userStore'),
    LoginForm = require('./loginForm'),
    ClientActions = require('../actions/clientActions'),
    Link = require('react-router').Link,
    Modal = require("react-modal");

 var App = React.createClass({
   getInitialState: function() {
     return {
       currentUser: UserStore.currentUser(),
       modalOpen: false,
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

   openModal: function () {
     this.setState({ modalOpen: true });
   },

   closeModal: function(event){
     event.preventDefault();
     this.setState({ modalOpen: false });
   },

 	render: function () {
    var navLink,
        userEl,
        customStyle = {
          overlay : {
            position          : 'fixed',
            top               : 0,
            left              : 0,
            right             : 0,
            bottom            : 0,
            backgroundColor   : 'rgba(50, 50, 50, 0.75)'
          },
          content : {
            position                   : 'absolute',
            top                        : '300px',
            left                       : '300px',
            right                      : '300px',
            bottom                     : '300px',
            border                     : '1px solid #ccc',
            background                 : '#F7FAFA',
            overflow                   : 'auto',
            WebkitOverflowScrolling    : 'touch',
            borderRadius               : '4px',
            outline                    : 'none',
            padding                    : '20px'

          }
        };

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
        <div className="navbar">
          <div className="logo">
            <Link to='/'>LaunchPad</Link>
          </div>
          <div>
            <Link to='explore'>Explore</Link>
          </div>
          <div className="navbar-login">
            <button onClick={this.openModal}>
              Log In + Sign Up
            </button>
          </div>
        </div>
        {this.props.children}
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          closeTimeoutMS={150}
          style={customStyle}>

          <LoginForm />;
        </Modal>
 			</div>
 		);
 	}

 });

 module.exports = App;
