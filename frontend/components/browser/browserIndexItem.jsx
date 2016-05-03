var React = require('react'),
    Link = require('react-router').Link,
    ClientActions = require('../../actions/clientActions');

var BrowserIndexItem = React.createClass({
  saveScroll: function () {
    ClientActions.setPosition($(window).scrollTop());
  },

  render: function() {
    return (
      <li className="browser-list-item animated bounceInUp">
        <Link to={'explore/' + this.props.company.id}
              className="link"
              onClick={this.saveScroll} >
          <img className="small-company-picture"
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
