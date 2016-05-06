# LaunchPad

[LaunchPad live][heroku]

[heroku]: http://lapad.herokuapp.com

LaunchPad is a full-stack web application inspired by KickStarter, but with a twist: backers receive equity shares for their seed financing contributions. This site will explore some of the exciting possibilities that have emerged in the wake of the SEC’s newly issued Regulation A+ equity crowdfunding rules.

LaunchPad is architected as a single page application using React.js, the Flux data flow design pattern, a PostgreSQL database, and a Ruby on Rails back-end.

## Features & Implementation

### Single-Page App

LaunchPad is a single-page application with all content delivered on one static page using asynchronous API calls to the backend.

### Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux-cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

### Company Browsing

Companies can be browsed using the `browserIndex` component. The index implements "infinite scroll" functionality to permit a very large number of companies to be viewed without disrupting the user experience.

When the component mounts it adds a scroll event listener to the window, and it removes the listener when it unmounts, or when all of the companies have been loaded. The scroll handler checks if the user has reached the bottom of the page, and if so, it grabs another set of 20 companies from the back-end.

```
handleScroll: function(event) {
  if (this.state.companies.length === this.state.total) {
    window.removeEventListener("scroll", this.handleScroll);
  } else if ($(window).scrollTop() +
             $(window).height() >
             $(document).height() - 150) {
    if (!this.state.loadingFlag) {
      this.setState({
        loadingFlag: true,
      });
      this.getPage();
    }
  }
}
```

The index is composed of `BrowserIndexItem` components. These components save the scroll position in the `companyStore` when clicked. When the browser mounts it loads the saved scroll position so that the user is returned to the scroll position where they left off.

### Company Viewing

Companies are viewed with a `companyDetailApp` component. This component calculates the pre-money valuation by determining the total amount of new investment being offered and then finding the post-money valuation using the following formula: (New Investment) * (Total Post Investment Shares) / (Shares Issued for New Investment).
```
var newInvestment = offering.price * offering.new_shares;
var postMoneyValuation = newInvestment *
  (offering.post_shares/offering.new_shares);
preMoneyValuation = numberWithCommas(
  Math.round(postMoneyValuation - newInvestment)
);
```
The purchase price updates in real-time as the user enters in the number of shares being purchased. The update has a subtle animation indicating the change by utilizing the `ReactCSSTransitionGroup`. Clicking on purchase loads a Stripe checkout using `Stripe.js`.

### Company Creation

Companies are created with a `launchApp` component. The `FontAwesome` library is used to provide the button tabs of the form with check marks that turn green when the indicated section is completed, allowing the user to clearly see when the form is ready to be submitted. A data picker is integrated with the `react-datepicker` NPM package.

### Splash Page and Navbar

The splash page uses the Slick.js library to provide an animated carousel. A navbar is always present throughout the website. The navbar sticks to the top of the screen, using the `react-sticky` library, to maintain navigation controls when scrolling through the long list of companies.

Sign in and sign up functionality is provided by means of a modal that opens via a link on the navbar that uses the `react-modal` library. This allows the user to control his or her session without disruption.

## Future Direction for the Project

The following features are planned for the project:

### Search Bar

A search bar will be included in the navbar so that companies be easily found by name.

### Current User Menus

If a user is logged in, a dropdown menu in the navbar will provide access to a list of the companies that the user has invested in and founded.

### Investor Details

Clicking on an investor in the list provided in the `companyDetailApp` component will open a modal that lists the companies that the investor has invested in and founded.

### Likes, Comments, and Updates

The `companyDetailApp` component will allow users to post likes and comments, and founders to post updates.
