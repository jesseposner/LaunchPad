# LaunchPad

[Heroku link][heroku]

[heroku]: http://lapad.herokuapp.com

## Minimum Viable Product

LaunchPad is a web application inspired by Kickstarter that will be built using Ruby on Rails and React.js. By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [ ] New account creation, login, and guest/demo login
- [ ] Smooth, bug-free navigation
- [ ] Adequate seed data to demonstrate the site's features
- [ ] The minimally necessary features for a Kickstarter-inspired site: company creation and saving, company investing, and company browsing
- [ ] Hosting on Heroku
- [ ] CSS styling that is satisfactorily visually appealing
- [ ] A production README, replacing this README

## Product Goals and Priorities

LaunchPad will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Create an account (MVP)
- [ ] Log in / Log out, including as a Guest/Demo User (MVP)
- [ ] Create and view companies (MVP)
- [ ] Create investments in companies (MVP)
- [ ] Search companies (expected feature, but not MVP)
- [ ] Comment on companies (expected feature, but not MVP)
- [ ] Like companies (expected feature, but not MVP)
- [ ] Create and view updates to companies (expected feature, but not MVP)

## Design Docs
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

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [x] create new project
- [x] create `User` model
- [x] authentication
- [x] user signup/signin pages
- [x] blank landing page after signin

### Phase 2: Companies Model, API, and basic APIUtil (1.5 days)

**Objective:** Companies can be created and read through
the API.

- [x] create `Company` model
- [x] seed the database with a small amount of test data
- [x] CRUD API for companies (`CompaniesController`)
- [x] jBuilder views for companies
- [x] setup Webpack & Flux scaffold
- [x] setup `APIUtil` to interact with the API
- [x] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Companies can be browsed and read with the user interface.

- [x] setup the flux loop with skeleton files
- [x] setup React Router
- implement each company component, building out the flux loop as needed.
  - [ ] `BrowserSelector`
  - [x] `BrowserIndex`
  - [x] `BrowserIndexItem`
  - [ ] `CompanyDetailTabs`
  - [ ] `CompanyDetailTabItem`

### Phase 4: Start Styling (0.5 days)

**Objective:** Existing pages (including singup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Company Creation and Investment (1 day)

**Objective:** Companies can be created with the user interface and invested in.

- implement each form component, building out the flux loop as needed.
  - [ ] `CompanyFormTabs`
  - [ ] `CompanyFormTabItem`
  - [ ] `InvestForm (modal)`
- Use CSS to style new views

### Phase 6: Splash Carousel and Navbar (1.5 days)

**Objective:** Splash page greets user and companies can be browsed in a carousel viewer and searched in a navbar.

- implement each company component, building out the flux loop as needed.
  - [ ] `SplashCarouselIndex`
  - [ ] `SplashCarouselIndexItem`
- Use CSS to style new views

### Phase 7: Comments, Likes, and Updates (1.5 days)

**Objective:** Companies can be liked, commented on, and updated.

- [ ] create `Like`, `Comment`, and `Update` models and join tables
- build out API, Flux loop, and components for:
  - [ ] fetching likes, comments, and updates for companies
  - [ ] adding likes, comments, and updates to companies
- [ ] Style new elements

### Phase 8: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Cap tables
- [ ] Edit company information
- [ ] Stripe integration
- [ ] Incorporation Documents
