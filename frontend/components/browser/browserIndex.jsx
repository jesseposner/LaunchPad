var React = require('react'),
    CompanyStore = require('../../stores/companyStore'),
    ClientActions = require('../../actions/clientActions'),
    BrowserIndexItem = require('./browserIndexItem'),
    Masonry = require('react-masonry-component');

var BrowserIndex = React.createClass({
  getInitialState: function() {
    return {
      companies: []
    };
  },

  componentDidMount: function() {
    this.removeToken = CompanyStore.addListener(this.onChange);
    ClientActions.fetchCompanies();
  },

  componentWillUnmount: function() {
    this.removeToken.remove();
  },

  onChange: function () {
    this.setState({
      companies: CompanyStore.all()
    });
  },

  render: function() {
    var masonryOptions = {
      isFitWidth: false,
      percentPosition: true
    };

    return (
      <div>
        <span className="browser-index-title">
          Explore <span className="index-number">
                    {this.state.companies.length}&nbsp;
                  </span>
          companies
        </span>
        <Masonry
          className={'browser-list'}
          elementType={'ul'}
          options={masonryOptions}
          disableImagesLoaded={false}>

          {this.state.companies.map(
            function (company) {
              return (
                <BrowserIndexItem key={company.id} company={company} />
              );
            }
          )}
        </Masonry>
      </div>
    );
  }

});

module.exports = BrowserIndex;
