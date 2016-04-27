var React = require('react');

 module.exports = React.createClass({
 	render: function () {
 		return(
 			<div>
 				LaunchPad
 				{this.props.children}
 			</div>
 		);
 	}
 });
