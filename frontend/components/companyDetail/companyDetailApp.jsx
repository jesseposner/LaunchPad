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

  parseBusinessPlan: function () {
    if (this.state.company.business_plan) {
      return JSON.parse(this.state.company.business_plan).map(
        function (paragraph) {
          return <p>{paragraph}</p>;
        }
      );
    }
  },

  render: function() {
    var founders;

    if (this.state.company.founders) {
      founders = "Founded by " + this.state.company.founders[0].name;
    }

    return (
      <div>
        <div className="company-title">
          {this.state.company.name}
          <p />
          <div className="founders">
            {founders}
          </div>
        </div>
        <div className="company-top">
          <div className="company-left">
            <div className="large-media-container">
              <img className="large-company-picture"
                   src={this.state.company.media_url}/>
            </div>
            <div className="company-caption-left">
              {this.state.company.description}
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
        <ul className="company-tabs">
          <li>Business Plan</li>
          <li>Updates</li>
          <li>Comments</li>
        </ul>
        <div className="company-main">
          {this.parseBusinessPlan()}
        </div>
      </div>
    );
  }

});

module.exports = CompanyDetailApp;
