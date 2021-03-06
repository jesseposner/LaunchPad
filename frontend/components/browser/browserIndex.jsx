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
      scrollPos: CompanyStore.pos()
    };
  },

  componentDidMount: function() {
    this.removeToken = CompanyStore.addListener(this.onChange);
    setTimeout(function () {
      $(window).scrollTop(this.state.scrollPos);
      window.addEventListener("scroll", this.handleScroll);
    }.bind(this), 500);
    ClientActions.fetchCompanies(1);
    ClientActions.fetchTotalCompanies();
  },

  componentWillUnmount: function() {
    this.removeToken.remove();
    window.removeEventListener("scroll", this.handleScroll);
  },

  onChange: function () {
    var companies;
    if (this.state.companies.length > this.state.total - 30) {
      companies = CompanyStore.all();
    } else {
      companies = CompanyStore.all().filter(function (company) {
        return company.id > 5;
      });
    }

    this.setState({
      companies: companies,
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
                    scale={0.5}
                    speed={2.2} />
          </div>
        </Loader>
      </div>
    );
  }

});

module.exports = BrowserIndex;
