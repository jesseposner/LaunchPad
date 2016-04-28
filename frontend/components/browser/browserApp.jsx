var React = require('react'),
    BrowserIndex = require('./browserIndex');

var BrowserApp = React.createClass({

  render: function() {
    return (
      <div>
        <BrowserIndex />
      </div>
    );
  }

});

module.exports = BrowserApp;
