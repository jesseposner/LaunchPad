var React = require('react'),
    CompanyStore = require('../../stores/companyStore'),
    ClientActions = require('../../actions/clientActions'),
    BrowserIndexItem = require('./browserIndexItem'),
    Masonry = require('react-masonry-component'),
    Loader = require('react-loader');

var BrowserIndex = React.createClass({
  getInitialState: function() {
    return {
      companies: [],
      loadingFlag: true,
      page: Math.floor(CompanyStore.all().length/20) + 1,
      total: 0,
      loaded: false,
      scrollPos: $(window).scrollTop()
      // get pos from company store instead of $(window).scrollTop()
    };
  },

  componentDidMount: function() {
    this.removeToken = CompanyStore.addListener(this.onChange);
    $(window).scrollTop(this.state.scrollPos);
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
      total: CompanyStore.total(),
      loaded: true
    });
  },

  handleScroll: function(event) {
    if (this.state.companies.length === this.state.total) {
      window.removeEventListener("scroll", this.handleScroll);
    } else if ($(window).scrollTop() +
               $(window).height() >
               $(document).height() - 200) {
      if (!this.state.loadingFlag) {
        this.setState({
          loadingFlag: true,
        });
        this.getPage();
      }
    }
  },

  getPage: function () {
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
      percentPosition: false,
      transitionDuration: '0.8s'
    };

    return (
      <div><p />
        <span className="browser-index-title">
          Explore <span className="index-number">
                    {this.state.total}&nbsp;
                  </span>
          companies
        </span>
        <Loader loaded={this.state.loaded} hwaccel="true">
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
        </Loader>
      </div>
    );
  }

});

module.exports = BrowserIndex;
