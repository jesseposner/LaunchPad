var React = require('react');

var LaunchApp = React.createClass({
  getInitialState: function() {
    var rootElement = document.getElementById("root"),
        imagePaths = JSON.parse(rootElement.dataset.images);
    return {
      companyName: "Company Name",
      description: "Company Description",
      errors: "",
      logoURL: imagePaths.placeholder,
      state: "AL"
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    var rootElement = document.getElementById("root"),
        imagePaths = JSON.parse(rootElement.dataset.images);
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
        logoURL: imagePaths.placeholder
      });
    }
  },

  updateLaunchInfo: function (event) {
    var category = event.target.id;
    var state = {};
    state[category] = event.target.value;
    this.setState(state);
  },

  render: function() {

    return (
      <div>
        <ul className="launch-bar">
          <li className="launch-bar-item launch-company-button">
            Company
          </li>
          <li className="launch-bar-item launch-offering-button">
            Offering
          </li>
          <li className="launch-bar-item">
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
