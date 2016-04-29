var React = require('react'),
    CompanyStore = require('../../stores/companyStore'),
    ClientActions = require('../../actions/clientActions');

var CompanyDetailApp = React.createClass({
  getInitialState: function () {
    return { company: {} };
  },

  componentDidMount: function() {
    this.removeToken = CompanyStore.addListener(this.onChange);
    ClientActions.fetchCompany(this.props.params.companyId);
  },

  componentWillUnmount: function() {
    this.removeToken.remove();
  },

  componentWillReceiveProps: function(nextProps) {
    ClientActions.fetchCompany(nextProps.params.companyId);
  },

  onChange: function () {
    var companyId = this.props.params.companyId;
    var company = CompanyStore.find(companyId) || {};

    this.setState({
      company: company
    });
  },

  render: function() {
    return (
      <div>
        <div className="company-title">
          {this.state.company.name}
        </div>
        <div className="company-top">
          <div className="company-left">
            <div className="large-media-container">
              <img className="large-company-picture"
                   src={this.state.company.media_url}/>
            </div>
            <div className="company-caption-left">
              caption left
            </div>
          </div>
          <div className="company-right">
            <div className="company-stats">
              investors
              <p />
              total raised
              <p />
              valuation
              <p />
            </div>
            <div className="company-caption-right">
              caption right
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = CompanyDetailApp;
