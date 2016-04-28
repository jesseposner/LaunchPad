var React = require('react'),
    CompanyStore = require('../../stores/companyStore'),
    ClientActions = require('../../actions/clientActions'),
    BrowserIndex = require('./browserIndex');

var BrowserApp = React.createClass({

  render: function() {
    return (
      <div>
        Browser
        <BrowserIndex />
      </div>
    );
  }

});

module.exports = BrowserApp;
