var React = require('react'),
    FontAwesome = require('react-fontawesome'),
    CurrencyMaskedInput = require('react-currency-masked-input'),
    DatePicker = require('react-datepicker'),
    moment = require('moment'),
    ClientActions = require('../actions/clientActions');

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
      companyCompleted: false,
      offeringCompleted: false,
      imagePaths: imagePaths
    };
  },

  componentDidMount: function() {
    $('.pure-form').slick({
      accessibility: false,
      arrows: false,
      draggable: false,
      infinite: false,
      swipe: false,
      touchMove: false
    });
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
      state = { expirationDate: event._d};
    } else {
      state = { price: arguments[1] };
    }

    this.setState(state);
  },

  slickGoTo: function (index, event) {
    event.preventDefault();
    $('.pure-form').slick('slickGoTo', index);
  },

  submitCompany: function (event) {
    event.preventDefault();
    ClientActions.createCompany({
      name: this.state.companyName,
      street_address: this.state.streetAddress,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      media_url: this.state.logoURL,
      description: this.state.description,
      business_plan: this.state.businessPlan
    });
  },

  isCompanyCompleted: function () {
    if (
        !this.state.companyName    ||
        !this.state.streetAddress  ||
        !this.state.city           ||
        !this.state.zip            ||
        !this.state.description    ||
        !this.state.businessPlan   ||
        this.state.errors
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
        !this.state.offeringDescription  ||
        this.state.errors
      ) {
      return false;
    } else {
      return true;
    }
  },

  render: function() {
    var companyCheckCircle,
        offeringCheckCircle;

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

    return (
      <div>
        <ul className="launch-bar">
          <li className="launch-bar-item launch-company-button"
              onClick={this.slickGoTo.bind(this, 0)} >
            {companyCheckCircle} Company
          </li>
          <li className="launch-bar-item launch-offering-button"
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
                  <DatePicker selected={moment()}
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
