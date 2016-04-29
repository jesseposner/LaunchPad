var React = require('react'),
    CompanyStore = require('../../stores/companyStore'),
    ClientActions = require('../../actions/clientActions'),
    Link = require('react-router').Link;

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
        function (paragraph, i) {
          return <p key={i}>{paragraph}</p>;
        }
      );
    }
  },

  render: function() {
    function numberWithCommas(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    var founders,
        offeringDate,
        expirationDate,
        investors = 0,
        valuation = 0,
        raised = 0;

    if (this.state.company.founders) {
      founders = <b>{this.state.company.founders[0].name}</b>;
    }

    if (this.state.company.investors) {
      investors = this.state.company.investors.length;
    }

    if (this.state.company.offerings) {
      offeringDate = this.state.company.offering_date;
      expirationDate = this.state.company.expiration_date;
      valuation = numberWithCommas(
        Math.round(
          this.state.company.offerings[0].price * 10000000
        )
      );
      raised = numberWithCommas(this.state.company.raised);
    }

    return (
      <div>
        <div className="company-title">
          {this.state.company.name}
          <div className="founders">
            founded by {founders}
          </div>
        </div>
        <div className="company-top">
          <div className="company-left">
            <div className="large-media-container">
              <img className="large-company-picture"
                   src={this.state.company.media_url}/>
            </div>
            <div className="company-caption-left">
              {this.state.company.description}<p/>
              <div className="invest-button">
                <Link to='path' className="invest-link">Invest</Link>
              </div>
            </div>
          </div>
          <div className="company-right">
            <div className="company-stats">
              <span className="stat">
                {investors}<br />
              </span>
              investors
              <p />
              <span className="stat">
                ${raised}<br />
              </span>
              total raised
              <p />
              <span className="stat">
                ${valuation}<br />
              </span>
              valuation
              <p />
            </div>
            <div className="company-caption-right">
              The current offering was created on {offeringDate}.
              This offering will expire on {expirationDate}.
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
