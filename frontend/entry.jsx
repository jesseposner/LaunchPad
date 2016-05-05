 var React = require('react'),
     ReactDOM = require('react-dom'),
     Router = require('react-router').Router,
     Route = require('react-router').Route,
     IndexRoute = require('react-router').IndexRoute,
     HashHistory = require('react-router').hashHistory,
     App = require('./components/app.jsx'),
     LoginForm = require('./components/loginForm'),
     BrowserApp = require('./components/browser/browserApp'),
     CompanyDetailApp = require('./components/companyDetail/companyDetailApp'),
     SplashApp = require('./components/splashApp'),
     Modal = require("react-modal"),
     LaunchApp = require('./components/launchApp');

 var routes = (
 	<Route path='/' component={App}>
    <IndexRoute component={SplashApp} />
    <Route path='explore' component={BrowserApp} />
    <Route path='explore/:companyId' component={CompanyDetailApp} />
    <Route path='launch' component={LaunchApp} />
 	</Route>

 );

 document.addEventListener('DOMContentLoaded', function () {
   Modal.setAppElement(document.body);
 	 ReactDOM.render(
 	   <Router history={HashHistory} routes={routes} />,
 	   document.getElementById("root")
 	);
});
