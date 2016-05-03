var React = require('react'),
    ReactDOM = require('react-dom'),
    UserStore = require('../stores/userStore'),
    LoginForm = require('./loginForm'),
    ClientActions = require('../actions/clientActions'),
    Link = require('react-router').Link,
    Modal = require('react-modal');

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

   closeModal: function(){
     this.setState({ modalOpen: false });
   },

   afterOpen: function () {
     document.getElementById("name").focus();
   },

 	render: function () {
    var navLink,
        userEl,
        rootElement = document.getElementById("root"),
        imagePaths = JSON.parse(rootElement.dataset.images),
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
            top                        : '0px',
            left                       : '0px',
            right                      : '0px',
            bottom                     : '0px',
            border                     : '1px solid rgba(0, 0, 0, 0.3)',
            overflow                   : 'auto',
            WebkitOverflowScrolling    : 'touch',
            borderRadius               : '10px',
            outline                    : 'none',
            padding                    : '20px',
            margin                     : 'auto',
            width                      : '400px',
            height                     : '300px',
            background                 : 'white'
          }
        };

    if (!this.state.currentUser) {
      userEl = (
        <div className="navbar-login
                        hvr-underline-from-center
                        animated
                        fadeInRight"
             onClick={this.openModal}>
          Log in + Sign up
        </div>);
    } else {
      userEl = (
        <div className="navbar-login
                        hvr-underline-from-center
                        animated
                        fadeInLeft"
             onClick={this.submitLogout}>
          Log out
        </div>
      );
    }

 		return(
 			<div>
        <div className="navbar">
          <div className="logo">
            <Link to='/'><img src={imagePaths.logo} /></Link>
          </div>
          <div className="navbar-links">
            <Link to='explore' className="hvr-underline-from-center">
              Explore
            </Link>
            <Link to='launch' className="hvr-underline-from-center">
              Launch
            </Link>
          </div>
          {userEl}
        </div>
        {this.props.children}
        <Modal
          className="modal"
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          onAfterOpen={this.afterOpen}
          closeTimeoutMS={150}
          style={customStyle}>

          <LoginForm closeModal={this.closeModal} />
        </Modal>
 			</div>
 		);
 	}

 });

 module.exports = App;
