var React = require('react'),
    Link = require('react-router').Link;

var BrowserIndexItem = React.createClass({

  render: function() {
    return (
      <li className="browser-list-item">
        <Link to={'explore/' + this.props.company.id} className="link">
          <img className="company-picture"
               src={this.props.company.media_url} />
          <h6 className="company-name">
            {this.props.company.name}
          </h6>
        </Link>
        {this.props.company.description}
      </li>
    );
  }

});

module.exports = BrowserIndexItem;
