var React = require('react'),
    CompanyStore = require('../../stores/companyStore'),
    ClientActions = require('../../actions/clientActions'),
    BrowserIndexItem = require('./browserIndexItem');

var BrowserIndex = React.createClass({
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
        <ul>
          {this.state.companies.map(function (company) {
            return (
              <BrowserIndexItem key={company.id} company={company} />
            );
          })}
        </ul>
      </div>
    );
  }

});

module.exports = BrowserIndex;
