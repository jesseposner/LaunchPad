 var React = require('react'),
     ReactDOM = require('react-dom'),
     Router = require('react-router').Router,
     Route = require('react-router').Route,
     HashHistory = require('react-router').hashHistory,
     App = require('./components/app.jsx'),
     LoginForm = require('./components/loginForm'),
     BrowserApp = require('./components/browser/browserApp'),
     CompanyDetailApp = require('./components/companyDetail/companyDetailApp');

 var routes = (
 	<Route path='/' component={App}>
    <Route path='explore' component={BrowserApp} />
    <Route path='explore/:companyId' component={CompanyDetailApp} />
 	</Route>

 );

 document.addEventListener('DOMContentLoaded', function () {
 	ReactDOM.render(
 		<Router history={HashHistory} routes={routes} />,
 		document.getElementById('root')
 	);
});
