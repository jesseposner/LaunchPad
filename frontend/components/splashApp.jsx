var React = require('react'),
    CompanyStore = require('../stores/companyStore'),
    ClientActions = require('../actions/clientActions');

var SplashApp = React.createClass({
  getInitialState: function() {
    return {
      companies: []
    };
  },

  componentDidMount: function() {
    this.removeToken = CompanyStore.addListener(this.onChange);
    ClientActions.fetchCompanies(1);
    $(document).ready(function(){
      $('.carousel').slick({
        dots: true,
        infinite: true,
        arrows: false,
        autoplay: true,
        slidesToShow: 1,
        fade: true,
        speed: 500,
        cssEase: 'linear'
      });
    });
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
    var company1Name,
        company1Description,
        company2Name,
        company2Description,
        company3Name,
        company3Description,
        company4Name,
        company4Description,
        company5Name,
        company5Description;

    if (this.state.companies.length !== 0) {
      company1Name = this.state.companies[0].name;
      company1Description = this.state.companies[0].description;
      company2Name = this.state.companies[1].name;
      company2Description = this.state.companies[1].description;
      company3Name = this.state.companies[2].name;
      company3Description = this.state.companies[2].description;
      company4Name = this.state.companies[3].name;
      company4Description = this.state.companies[3].description;
      company5Name = this.state.companies[4].name;
      company5Description = this.state.companies[4].description;
    }
    return (
      <div>
        <div className="carousel">
         <div className="carousel-content carousel-1">
           <h1 className="carousel-title">
             Discover the next great startup.
           </h1>
           <div className="carousel-subtitle">
             Investing in thousands of incredible companies
             is just a few clicks away.
           </div>
           <button className="carousel-button hvr-grow">
             Take a look!
           </button>
         </div>
         <div className="carousel-content carousel-2">
           <h1 className="carousel-title">
             {company1Name}
           </h1>
           <div className="carousel-subtitle">
             {company1Description}
           </div>
           <button className="carousel-button hvr-grow">
             View company
           </button>
         </div>
         <div className="carousel-content carousel-3">
           <h1 className="carousel-title">
             {company2Name}
           </h1>
           <div className="carousel-subtitle">
             {company2Description}
           </div>
           <button className="carousel-button hvr-grow">
             View company
           </button>
         </div>
         <div className="carousel-content carousel-4">
           <h1 className="carousel-title">
             {company3Name}
           </h1>
           <div className="carousel-subtitle">
             {company3Description}
           </div>
           <button className="carousel-button hvr-grow">
             View company
           </button>
         </div>
         <div className="carousel-content carousel-5">
           <h1 className="carousel-title">
             {company4Name}
           </h1>
           <div className="carousel-subtitle">
             {company4Description}
           </div>
           <button className="carousel-button hvr-grow">
             View company
           </button>
         </div>
         <div className="carousel-content carousel-6">
           <h1 className="carousel-title">
             {company5Name}
           </h1>
           <div className="carousel-subtitle">
             {company5Description}
           </div>
           <button className="carousel-button hvr-grow">
             View company
           </button>
         </div>
       </div>
     </div>
    );
  }

});

module.exports = SplashApp;
