var React = require('react');

var BrowserIndexItem = React.createClass({

  render: function() {
    return (
      <li className="browser-list-item">
        <img className="company-picture"
             src={this.props.company.media_url} />
        <h6 className="company-name">
          {this.props.company.name}
        </h6>
        {this.props.company.description}
      </li>
    );
  }

});

module.exports = BrowserIndexItem;
