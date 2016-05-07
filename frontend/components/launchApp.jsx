var React = require('react'),
    FontAwesome = require('react-fontawesome'),
    CurrencyMaskedInput = require('react-currency-masked-input'),
    DatePicker = require('react-datepicker'),
    moment = require('moment'),
    CompanyStore = require('../stores/companyStore'),
    ClientActions = require('../actions/clientActions'),
    UserStore = require('../stores/userStore'),
    HashHistory = require('react-router').hashHistory;

var LaunchApp = React.createClass({
  getInitialState: function() {
    var rootElement = document.getElementById("root"),
        imagePaths = JSON.parse(rootElement.dataset.images);

    return {
      streetAddress: "",
      city: "",
      zip: "",
      companyName: "Company Name",
      description: "Company Description",
      businessPlan: "",
      errors: "",
      logoURL: imagePaths.placeholder,
      state: "AL",
      price: "",
      totalShares: "",
      sharesOffered: "",
      offeringDescription: "",
      expirationDate: moment().add(30, 'days'),
      imagePaths: imagePaths,
      isCompanySubmitted: false,
      slideIndex: 0
    };
  },

  componentDidMount: function() {
    this.removeToken = CompanyStore.addListener(this.onChange);
    $('.pure-form').slick({
      accessibility: false,
      arrows: false,
      draggable: false,
      infinite: false,
      swipe: false,
      touchMove: false
    });
  },

  componentWillUnmount: function() {
    this.removeToken.remove();
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (!this.state.companyName) {
      this.setState({
        companyName: "Company Name"
      });
    }
    if (!this.state.description) {
      this.setState({
        description: "Company Description"
      });
    }
    if (!this.state.logoURL) {
      this.setState({
        logoURL: this.state.imagePaths.placeholder
      });
    }
  },

  updateLaunchInfo: function (event) {
    var state = {};

    if (event.target) {
      var category = event.target.id;
      state[category] = event.target.value;
    } else if (event._isAMomentObject) {
      state = { expirationDate: event};
    } else {
      state = { price: arguments[1] };
    }

    this.setState(state);
  },

  slickGoTo: function (index, event) {
    event.preventDefault();
    this.setState({
      slideIndex: index
    });
    $('.pure-form').slick('slickGoTo', index);
    if ($('.pure-form').slick('slickCurrentSlide') !== index) {
      window.location.reload();
    }
  },

  submitCompany: function (event) {
    event.preventDefault();
    if (!UserStore.currentUser()) {
      this.setState({
        errors: "You must be logged in before you launch."
      });
    } else if (this.isCompanyCompleted() && this.isOfferingCompleted()) {
      this.setState({
        isCompanySubmitted: true,
        errors: ""
      });
      ClientActions.createCompany({
        name: this.state.companyName,
        street_address: this.state.streetAddress,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        media_url: this.state.logoURL,
        description: this.state.description,
        business_plan: this.state.businessPlan,
        offering: {
          price: this.state.price,
          new_shares: this.state.sharesOffered,
          post_shares: this.state.totalShares + this.state.sharesOffered,
          offering_date: moment()._d,
          expiration_date: this.state.expirationDate._d,
          description: this.state.offeringDescription
        }
      });
    } else {
      this.setState({
        errors: "You must complete the company and offering sections" +
                " before you launch."
      });
    }
  },

  isCompanyCompleted: function () {
    if (
        !this.state.companyName    ||
        !this.state.streetAddress  ||
        !this.state.city           ||
        !this.state.zip            ||
        !this.state.description    ||
        !this.state.businessPlan
      ) {
      return false;
    } else {
      return true;
    }
  },

  isOfferingCompleted: function () {
    if (
        !this.state.price                ||
        !this.state.totalShares          ||
        !this.state.sharesOffered        ||
        !this.state.offeringDescription
      ) {
      return false;
    } else {
      return true;
    }
  },

  onChange: function () {
    if (UserStore.errors()) {
      this.setState({
        errors: UserStore.errors(),
        isCompanySubmitted: false
      });
    } else if (this.state.isCompanySubmitted) {
      HashHistory.push('explore/' + CompanyStore.all()[0].id);
    }
  },

  render: function() {
    var companyCheckCircle,
        offeringCheckCircle,
        companyButtonClass = "launch-bar-item launch-company-button",
        offeringButtonClass = "launch-bar-item launch-offering-button";

    if (this.isCompanyCompleted()) {
      companyCheckCircle = <FontAwesome name='check-circle'
                                        style={{ color: '#00D638' }} />;
    } else {
      companyCheckCircle = <FontAwesome name='check-circle' />;
    }

    if (this.isOfferingCompleted()) {
      offeringCheckCircle = <FontAwesome name='check-circle'
                                         style={{ color: '#00D638' }} />;
    } else {
      offeringCheckCircle = <FontAwesome name='check-circle' />;
    }

    if (!this.state.slideIndex) {
      companyButtonClass += ' launch-bar-item-highlighted';
    } else {
      offeringButtonClass += ' launch-bar-item-highlighted';
    }

    return (
      <div>
        <ul className="launch-bar">
          <li className={companyButtonClass}
              onClick={this.slickGoTo.bind(this, 0)} >
            {companyCheckCircle} Company
          </li>
          <li className={offeringButtonClass}
              onClick={this.slickGoTo.bind(this, 1)} >
            {offeringCheckCircle} Offering
          </li>
          <li className="launch-bar-item"
              onClick={this.submitCompany} >
            Submit
          </li>
        </ul>
        <h1 className="launch-title">
          Get investments for your company!
        </h1>
        <div className="launch-errors">{this.state.errors}</div>
        <div className="launch-container">
          <form className="pure-form pure-form-aligned launch-form">
            <div className="slide-2">
              <div className="pure-control-group">
                <label>Company Name</label>
                <input id="companyName"
                       type="text"
                       placeholder="Company Name"
                       onChange={this.updateLaunchInfo} />
              </div>

              <div className="pure-control-group">
                  <label>Street Address</label>
                  <input id="streetAddress"
                         type="text"
                         placeholder="Street Address"
                         onChange={this.updateLaunchInfo} />
              </div>

              <div className="pure-control-group">
                <label>City</label>
                <input id="city"
                       type="text"
                       placeholder="City"
                       onChange={this.updateLaunchInfo} />
              </div>

              <div className="pure-control-group">
                <label>State</label>
                <select id="state"
                        className="pure-input-1-2 state"
                        onChange={this.updateLaunchInfo}>
                    <option>AL</option>
                    <option>AK</option>
                    <option>AZ</option>
                    <option>AR</option>
                    <option>CA</option>
                    <option>CO</option>
                    <option>CT</option>
                    <option>DE</option>
                    <option>DC</option>
                    <option>FL</option>
                    <option>GA</option>
                    <option>HI</option>
                    <option>ID</option>
                    <option>IL</option>
                    <option>IN</option>
                    <option>IA</option>
                    <option>KS</option>
                    <option>KY</option>
                    <option>LA</option>
                    <option>ME</option>
                    <option>MD</option>
                    <option>MA</option>
                    <option>MI</option>
                    <option>MN</option>
                    <option>MS</option>
                    <option>MO</option>
                    <option>MT</option>
                    <option>NE</option>
                    <option>NV</option>
                    <option>NH</option>
                    <option>NJ</option>
                    <option>NM</option>
                    <option>NY</option>
                    <option>NC</option>
                    <option>ND</option>
                    <option>OH</option>
                    <option>OK</option>
                    <option>OR</option>
                    <option>PA</option>
                    <option>RI</option>
                    <option>SC</option>
                    <option>SD</option>
                    <option>TN</option>
                    <option>TX</option>
                    <option>UT</option>
                    <option>VT</option>
                    <option>VA</option>
                    <option>WA</option>
                    <option>WV</option>
                    <option>WI</option>
                    <option>WY</option>
                </select>
              </div>
              <div className="pure-control-group">
                  <label>Zip</label>
                  <input id="zip"
                         type="text"
                         placeholder="Zip"
                         onChange={this.updateLaunchInfo} />
              </div>
              <div className="pure-control-group">
                  <label>Logo URL</label>
                  <input id="logoURL"
                         type="text"
                         placeholder="Logo URL"
                         onChange={this.updateLaunchInfo} />
              </div>
              <div className="pure-control-group">
                <fieldset>
                   <label>Description</label>
                   <textarea id="description"
                             className="pure-input-1-2"
                             placeholder="Description"
                             onChange={this.updateLaunchInfo} />
                </fieldset>
              </div>
              <div className="pure-control-group">
                <fieldset>
                   <label>Business Plan</label>
                   <textarea id="businessPlan"
                             className="pure-input-1-2"
                             placeholder="Business Plan"
                             onChange={this.updateLaunchInfo} />
                </fieldset>
              </div>
            </div>
            <div className="slide-2">
              <div className="pure-control-group">
                <label>Price Per Share&nbsp;</label>
                <span className="dollar">$</span>
                <CurrencyMaskedInput id="price"
                     type="number"
                     placeholder="Price Per Share"
                     className="price"
                     onChange={this.updateLaunchInfo} />
              </div>

              <div className="pure-control-group">
                  <label>Total Issued Shares</label>
                  <input id="totalShares"
                         type="number"
                         placeholder="Total Issued Shares"
                         onChange={this.updateLaunchInfo} />
              </div>

              <div className="pure-control-group">
                <label>Total Shares Offered</label>
                <input id="sharesOffered"
                       type="number"
                       placeholder="Total Shares Offered"
                       onChange={this.updateLaunchInfo} />
              </div>
              <div className="pure-control-group">
                  <label>Description (e.g. seed, Series A, etc.)</label>
                  <input id="offeringDescription"
                         type="text"
                         placeholder="Description"
                         onChange={this.updateLaunchInfo} />
              </div>
              <div className="date">
                  <label>Expiration Date&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <DatePicker selected={this.state.expirationDate}
                              placeholderText="Click to select a date"
                              onChange={this.updateLaunchInfo} />
              </div>
            </div>
          </form>
          <div className="browser-list-item">

              <img className="small-company-picture"
                   src={this.state.logoURL} />
              <h6 className="company-name">
                {this.state.companyName}
              </h6>
            {this.state.description}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = LaunchApp;
