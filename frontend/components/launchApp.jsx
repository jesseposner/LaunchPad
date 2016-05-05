var React = require('react');

var LaunchApp = React.createClass({
  getInitialState: function() {
    return {
      errors: ""
    };
  },

  render: function() {
    return (
      <div>
        <ul className="explore-bar">
          <li className="explore-bar-item">Company</li>
          <li className="explore-bar-item">Offering</li>
          <li className="explore-bar-item">Submit</li>
        </ul>
        <h1 className="launch-title">
          Get investments for your company!
        </h1>
        <div className="launch-form">
          <form className="pure-form pure-form-aligned">
            <div className="slide-2">
              <div className="pure-control-group">
                  <label>First Name</label>
                  <input id="firstName"
                         type="text"
                         placeholder="First Name"
                         onChange={this.updateUserInfo} />
              </div>

              <div className="pure-control-group">
                  <label>Last Name</label>
                  <input id="lastName"
                         type="text"
                         placeholder="Last Name"
                         onChange={this.updateUserInfo} />
              </div>

              <div className="pure-control-group">
                  <label>Street Address</label>
                  <input id="streetAddress"
                         type="text"
                         placeholder="Street Address"
                         onChange={this.updateUserInfo} />
              </div>

              <div className="pure-control-group">
                  <label>City</label>
                  <input id="city"
                         type="text"
                         placeholder="City"
                         onChange={this.updateUserInfo} />
              </div>

              <div className="pure-control-group">
                  <label>State</label>
                  <select id="state"
                          className="pure-input-1-2"
                          onChange={this.updateUserInfo}>
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
                         onChange={this.updateUserInfo} />
              </div>
              <div className="pure-controls">
                <button type="submit"
                        className="pure-button pure-button-primary red-button"
                        onClick={this.prevSlide}>
                          Back
                        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="submit"
                        className="pure-button pure-button-primary red-button"
                        onClick={this.submitSignup}>
                          Sign up
                        </button>&nbsp;
              </div>
              <br />
              {this.state.errors}
            </div>
          </form>
        </div>
      </div>
    );
  }

});

module.exports = LaunchApp;
