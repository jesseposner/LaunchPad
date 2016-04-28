var React = require('react'),
    CompanyStore = require('../../stores/companyStore'),
    ClientActions = require('../../actions/clientActions');

var BrowserApp = React.createClass({
  getInitialState: function() {
    return {
      companies: []
    };
  },

  componentDidMount: function() {
    this.removeToken = CompanyStore.addListener(this.onChange);
    ClientActions.fetchCompanies();
  },

  componentWillUnmount: function() {
    this.removeToken.remove();
  },

  onChange: function () {
    this.setState({
      companies: CompanyStore.all()
    });
  },

  render: function() {
    return (
      <div>
        Browser
        <p />
        <ul>
          {this.state.companies.map(function (company) {
            return <li key={company.id}>{company.name}</li>;
          })}
        </ul>
      </div>
    );
  }

});

module.exports = BrowserApp;
