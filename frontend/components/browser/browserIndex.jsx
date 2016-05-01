var React = require('react'),
    CompanyStore = require('../../stores/companyStore'),
    ClientActions = require('../../actions/clientActions'),
    BrowserIndexItem = require('./browserIndexItem'),
    Masonry = require('react-masonry-component');

var BrowserIndex = React.createClass({
  getInitialState: function() {
    return {
      companies: [],
      loadingFlag: true,
      page: 1,
      total: 0
    };
  },

  componentDidMount: function() {
    this.removeToken = CompanyStore.addListener(this.onChange);
    window.addEventListener("scroll", this.handleScroll);
    ClientActions.fetchCompanies(1);
    ClientActions.fetchTotalCompanies();
  },

  componentWillUnmount: function() {
    this.removeToken.remove();
    window.removeEventListener("scroll", this.handleScroll);
  },

  onChange: function () {
    this.setState({
      companies: CompanyStore.all(),
      loadingFlag: false,
      total: CompanyStore.total()
    });
  },

  handleScroll:function(event) {
    if (this.state.companies.length === this.state.total) {
      window.removeEventListener("scroll", this.handleScroll);
    } else if ($(window).scrollTop() +
               $(window).height() >
               $(document).height() - 100) {
      if (!this.state.loadingFlag) {
        this.setState({
          loadingFlag:true,
        });
        this.getPage();
      }
    }
  },

  getPage: function () {
    console.log("request");
    var nextPage = this.state.page + 1;
    this.setState({
      page: nextPage
    });
    ClientActions.fetchTotalCompanies();
    ClientActions.fetchCompanies(this.state.page);
  },

  render: function() {
    var masonryOptions = {
      isFitWidth: false,
      percentPosition: false
    };

    return (
      <div>
        <span className="browser-index-title">
          Explore <span className="index-number">
                    {this.state.total}&nbsp;
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
