var React = require('react'),
    CompanyStore = require('../../stores/companyStore'),
    UserStore = require('../../stores/userStore'),
    ClientActions = require('../../actions/clientActions'),
    StripeCheckout = require('react-stripe-checkout'),
    Loader = require('react-loader'),
    ReactCSSTransitionGroup = require('react-addons-css-transition-group'),
    Slider = require('react-slick');

var CompanyDetailApp = React.createClass({
  onToken: function(token) {
    ClientActions.createInvestment({
      user_id: UserStore.currentUser().id,
      offering_id: this.state.company.offerings[0].id,
      shares: this.state.shares
    });
  },

  getInitialState: function () {
    return {
      company: {},
      shares: "",
      loaded: false,
      slideIndex: 0
    };
  },

  componentDidMount: function() {
    this.removeToken = CompanyStore.addListener(this.onChange);
    ClientActions.fetchCompany(this.props.params.companyId);
  },

  componentWillUnmount: function() {
    this.removeToken.remove();
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.params.companyId !== this.props.params.companyId) {
      ClientActions.fetchCompany(nextProps.params.companyId);
    }
  },

  onChange: function () {
    var companyId = this.props.params.companyId;
    var company = CompanyStore.find(companyId) || {};
    this.setState({
      company: company,
      loaded: true
    });
  },

  updateShares: function (event) {
    if (event.target.value.length > 6)
      event.target.value = event.target.value.slice(0,6);
    this.setState({
      shares: event.target.value
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

  slickGoTo: function (index, event) {
    event.preventDefault();
    this.setState({
      slideIndex: index
    });
  },

  render: function() {
    function numberWithCommas(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    var founders,
        offeringDate,
        expirationDate,
        investors,
        investorList,
        preMoneyValuation,
        raised,
        description,
        purchaseButton,
        purchasePriceStr,
        purchasePriceStrTag,
        purchasePriceInt;

    if (this.state.company.founders) {
      founders = (
        <b className="founders-bold">
          {this.state.company.founders[0].name}
        </b>
      );
    }

    if (this.state.company.investors) {
      Array.prototype.uniq = function() {
        var resultArr = [];

        for (var i = 0; i < this.length; i++) {
          if (resultArr.indexOf(this[i]) === -1) {
            resultArr.push(this[i]);
          }
        }

        return resultArr;
      };

      var investorNames = {};

      this.state.company.investors.forEach(function (investor) {
        investorNames[investor.id] = investor.name;
      });

      investorList = (
        <ul className="investorList">
          {Object.keys(investorNames).map(function (id) {
            return <li key={id}>{investorNames[id]}</li>;
          })}
        </ul>
      );

      investors = this.state
                      .company
                      .investors
                      .map(function(investor){return investor.id;})
                      .uniq()
                      .length;
    }

    if (this.state.company.offerings) {
      var offering = this.state.company.offerings[0];
      description = offering.description;
      var newInvestment = offering.price * offering.new_shares;
      var postMoneyValuation = newInvestment *
        (offering.post_shares/offering.new_shares);
      offeringDate = this.state.company.offering_date;
      expirationDate = this.state.company.expiration_date;
      preMoneyValuation = numberWithCommas(
        Math.round(postMoneyValuation - newInvestment)
      );
      raised = numberWithCommas(this.state.company.raised);
      if (this.state.shares) {
        var purchasePrice = Math.round(
          100 * (this.state.shares * offering.price)
        )/100;
        purchasePriceStr = numberWithCommas("$" + purchasePrice);
        purchasePriceInt = Math.round((parseInt(purchasePrice) * 100) +
                           (100 *
                             (purchasePrice - parseInt(purchasePrice))
                           ));
       purchasePriceStrTag = (
         <span key={purchasePriceInt}>{purchasePriceStr}</span>
       );
      }
    }

    if (UserStore.currentUser()) {
      purchaseButton = (
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_8P9wZ22jfcRatjLL5w1sirP7"
          amount={purchasePriceInt}
          description={
            "CC#: 4242 4242 4242 4242"
          }
          panelLabel={"{{amount}} for " + this.state.shares + " Shares"}
          email={UserStore.currentUser().email}
          bitcoin={true}
          image={this.state.company.media_url}
          name={this.state.company.name}
          allowRememberMe={false}>
            <button className="purchase-button hvr-bubble-top"
                    onClick={function (event) {
                      event.preventDefault();
                    }}>
              Purchase
            </button>
        </StripeCheckout>
      );
    } else {
      purchaseButton = (
        <div>
          <button className="purchase-button hvr-bubble-top"
                  onClick={function (event) {
                    event.preventDefault();
                    this.setState({
                      error: "You must be logged in."
                    });
                  }.bind(this)}>
            Purchase
          </button>
          <br />
          {this.state.error}
        </div>
      );
    }

    return (
      <div>
        <Loader loaded={this.state.loaded} hwaccel="true">
          <div className="company-title">
            <div className="title-text">
              {this.state.company.name}
              <div className="founders">
                founded by {founders}
              </div>
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
                  ${preMoneyValuation}<br />
                </span>
                pre-money valuation
                <p />
              </div>
              <div className="company-caption-right">
                The current offering was created on {offeringDate}.
                This offering will expire on {expirationDate}.
              </div>
              <div className="purchase-container">
                <form className="pure-form">
                  <fieldset className="pure-group">
                    <input className="shares-input"
                           autoFocus={true}
                           type="number"
                           placeholder="Shares"
                           min="1"
                           value={this.state.shares}
                           onChange={this.updateShares} />
                      <p />
                      {purchaseButton}
                      <p />
                  </fieldset>
                </form>
              </div>
              <div className="purchase-price">
                <ReactCSSTransitionGroup transitionName="price-transition"
                                         transitionLeave={false}
                                         transitionEnterTimeout={0}>
                  {purchasePriceStrTag}
                </ReactCSSTransitionGroup>
              </div>
            </div>
          </div>
          <div className="company-tab-container">
            <ul className="company-tabs">
              <li onClick={this.slickGoTo.bind(this, 0)}>Business Plan</li>
              <li onClick={this.slickGoTo.bind(this, 1)}>Investors</li>
            </ul>
            <div className="company-main-container">
              <div className="company-main-content">
                <Slider slickGoTo={this.state.slideIndex}
                        arrows={false}
                        draggable={false}
                        infinite={false}
                        swipe={false}
                        touchMove={false}
                        accessibility={false} >
                  <div className="bplan">
                    {this.parseBusinessPlan()}
                  </div>
                  <div className="investors">
                    {investorList}
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </Loader>
      </div>
    );
  }

});

module.exports = CompanyDetailApp;
