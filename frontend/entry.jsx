 var React = require('react'),
     ReactDOM = require('react-dom'),
     Router = require('react-router').Router,
     Route = require('react-router').Route,
     HashHistory = require('react-router').hashHistory,
     App = require('./components/app.jsx'),
     LoginForm = require('./components/login_form');

 var routes = (
 	<Route path='/' component={App}>
    <Route path="login" component={LoginForm} />
 	</Route>

 );

 document.addEventListener('DOMContentLoaded', function () {
 	ReactDOM.render(
 		<Router history={HashHistory} routes={routes} />,
 		document.getElementById('root')
 	);
});
