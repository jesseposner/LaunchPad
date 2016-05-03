var React = require('react'),
    CompanyStore = require('../../stores/companyStore'),
    ClientActions = require('../../actions/clientActions'),
    BrowserIndexItem = require('./browserIndexItem'),
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
               $(document).height() - 100) {
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
    return (
      <div><p />
        <span className="browser-index-title">
          Explore <span className="index-number">
                    {this.state.total}&nbsp;
                  </span>
          companies
        </span>
        <Loader loaded={this.state.loaded} hwaccel="true">
          <div>
          <ul className="browser-list">
            {this.state.companies.map(function (company) {
              return (
                <BrowserIndexItem key={company.id} company={company} />
               );
            })}
          </ul>
        </div><p />
          <div className="footer">
            <Loader loaded={!this.state.loadingFlag}
                    scale={0.5} />
          </div>
        </Loader>
      </div>
    );
  }

});

module.exports = BrowserIndex;
