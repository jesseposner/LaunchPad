var React = require('react'),
    ReactDOM = require('react-dom'),
    CompanyStore = require('../stores/companyStore'),
    UserStore = require('../stores/userStore'),
    LoginForm = require('./loginForm'),
    ClientActions = require('../actions/clientActions'),
    Link = require('react-router').Link,
    Modal = require('react-modal'),
    StickyContainer = require('react-sticky').StickyContainer,
    Sticky = require('react-sticky').Sticky,
    HashHistory = require('react-router').hashHistory;

 var App = React.createClass({
   getInitialState: function() {
     return {
       currentUser: UserStore.currentUser(),
       modalOpen: false,
       searchResults: [],
       autocompleteClass: "",
       searchInput: "",
       suggestion: ""
     };
   },

   componentDidMount: function() {
     this.userRemoveToken = UserStore.addListener(this.onUserChange);
     this.companyRemoveToken = CompanyStore.addListener(this.onCompanyChange);
     ClientActions.fetchCurrentUser();
   },

   componentWillUnmount: function() {
     this.userRemoveToken.remove();
     this.companyRemoveToken.remove();
   },

   onUserChange: function () {
     this.setState({
       currentUser: UserStore.currentUser()
     });
   },

   onCompanyChange: function () {
     if (CompanyStore.searchResults().length !== 0) {
       var searchLength = this.state.searchInput.length;
       this.setState({
         searchResults: CompanyStore.searchResults(),
         suggestion: (this.state.searchInput) +
           CompanyStore.searchResults()[0].name.slice(searchLength)
       });
     } else {
       this.setState({
         suggestion: ""
       });
     }
     if (!this.state.searchInput) {
       this.setState({
         suggestion: "",
         searchResults: []
       });
     }
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
     document.getElementById("email").focus();
   },

   saveScroll: function () {
     ClientActions.setPosition($(window).scrollTop());
   },

   searchHandler: function functionName(event) {
     if (event.target.value) {
       this.setState({
         searchInput: event.target.value
       });
       ClientActions.searchCompanies(event.target.value);
     } else {
       this.setState({
         searchResults: [],
         searchInput: "",
         suggestion: ""
       });
     }
   },

 	render: function () {
    var navLink,
        userEl,
        results,
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
            overflow                   : 'hidden',
            WebkitOverflowScrolling    : 'touch',
            borderRadius               : '10px',
            outline                    : 'none',
            padding                    : '20px',
            margin                     : 'auto',
            width                      : '450px',
            height                     : '400px'
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

    if (this.state.searchResults.length !== 0) {
      results = (<ul className="results" >
        {this.state.searchResults.map(function (company) {
          return (
              <li key={company.id}
                  onMouseOver={function (id) {
                                 this.linkId = id;
                               }.bind(this, company.id)}
                  onMouseOut={function () {
                               this.linkId = null;
                             }.bind(this)} >
                <a>{company.name}</a>
              </li>
            );
          }.bind(this))
        }
      </ul>);
    }

 		return(
 			<div>
        <StickyContainer>
          <Sticky className="navbar">
            <div className="logo hvr-grow">
              <Link to='/' onClick={this.saveScroll} >
                <img src={imagePaths.logo} />
              </Link>
            </div>
            <div className="navbar-links">
              <Link to='explore'
                    className="hvr-underline-from-center" >
                Explore
              </Link>
              <Link to='launch'
                    className="hvr-underline-from-center"
                    onClick={this.saveScroll} >
                Launch
              </Link>
            </div>
            <form className="search"
                  autoComplete="off"
                  onKeyPress={function (event) {
                    if (event.key === 'Enter' && this.state.suggestion) {
                      ClientActions.searchCompanies(this.state.suggestion);
                      this.setState({
                        searchInput: this.state.suggestion
                      });
                    }
                  }.bind(this)}>
               <input id="autocomplete"
                      className={this.state.autocompleteClass}
                      type="text"
                      disabled="disabled"
                      value={this.state.suggestion} />
               <input id="searchbox"
                      type="text" name="q"
                      placeholder="Search..."
                      onChange={this.searchHandler}
                      value={this.state.searchInput}
                      onFocus={function () {
                        this.setState({
                          autocompleteClass: "autocompleteExpand"
                        });
                      }.bind(this)}
                      onBlur={function () {
                        if (this.linkId) {
                          HashHistory.push('explore/' + this.linkId);
                          this.setState({
                            searchInput: "",
                            suggestion: "",
                            searchResults: []
                          });
                        }
                        this.setState({
                          autocompleteClass: ""
                        });
                      }.bind(this)} />

                {results}
             </form>
            {userEl}
          </Sticky>
          {this.props.children && React.cloneElement(this.props.children, {
              openModal: this.openModal
            })}
        </StickyContainer>
        <Modal
          className="modal"
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          onAfterOpen={this.afterOpen}
          closeTimeoutMS={150}
          style={customStyle}>

          <LoginForm closeModal={this.closeModal} />
        </Modal>
        <footer id="main-footer" className="">
          <div className="footer-inner-col">
            <p>© LaunchPad</p>
            <ul>
              <li><Link to='explore'>Explore</Link></li>
              <li><Link to='launch'>Launch</Link></li>
            </ul>
          </div>
        </footer>
 			</div>
 		);
 	}

 });

 module.exports = App;
