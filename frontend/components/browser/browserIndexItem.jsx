var React = require('react');

var BrowserIndexItem = React.createClass({

  render: function() {
    return (
      <li>
        {this.props.company.name}
      </li>
    );
  }

});

module.exports = BrowserIndexItem;
