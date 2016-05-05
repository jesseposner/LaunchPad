var React = require('react');

var SplashApp = React.createClass({
  componentWillMount: function() {
    setTimeout(function(){
      $('.carousel').slick({
        dots: true,
        infinite: true,
        arrows: false,
        autoplay: true,
        slidesToShow: 1,
        fade: true
      });
    }, 0);
  },

  render: function() {
    return (
      <div>
        <div className="carousel">
         <div className="carousel-content">
           <h2>test</h2>
         </div>
         <div className="carousel-content">
         </div>
         <div className="carousel-content">
         </div>
       </div>
     </div>
    );
  }

});

module.exports = SplashApp;
