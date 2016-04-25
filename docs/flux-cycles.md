# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

## Company Cycles

### Companies API Request Actions

* `fetchAllCompanies`
  0. invoked from `SplashCarouselApp` `didMount` and `BrowserResultsIndex` `didMount`
  0. `GET /api/companies` is called
  0. `receiveAllCompanies` is set as the callback

* `createCompany`
  0. invoked from `CompanyFormApp` `onSubmit`
  0. `POST /api/companies` is called
  0. `receiveSingleCompany` is set as the callback

* `fetchSingleCompany`
  0. invoked from `CompanyDetailApp` `didMount`
  0. `GET /api/companies/:id` is called
  0. `receiveSingleCompany` is set as the callback

* `createInvestment`
  0. invoked from `InvestForm` `onSubmit`
  0. `POST /api/companies/:id/investments` is called
  0. `receiveSingleInvestment` is set as the callback

### Companies API Response Actions

* `receiveAllCompanies`
  0. invoked from an API callback
  0. `Company` store updates `_companies` and emits change

* `receiveSingleCompany`
  0. invoked from an API callback.
  0. `Company` store updates `_companies[id]` and emits change

* `receiveSingleInvestment`
  0. invoked from an API callback.
  0. `Company` store removes `_companies[id]` and emits change

### Store Listeners

* `BrowserResultsIndex` component listens to `Company` store.
* `InvestForm` component listens to `Company` store.

## SearchSuggestion Cycles

### SearchSuggestions API Request Actions

* `fetchSearchSuggestions`
  0. invoked from `SearchIndex` `onChange` when there is text
  0. `GET /api/companies` is called with `text` param
  0. `receiveSearchSuggestions` is set as the callback

### SearchSuggestions API Response Actions

* `receiveSearchSuggestions`
  0. invoked from an API callback
  0. `SearchSuggestion` store updates `_suggestions` and emits change

### SearchSuggestions Non-API Actions

* `removeSearchSuggestions`
  0. invoked from `SearchIndex` `onChange` when empty
  0. `SearchSuggestion` store resets `_suggestions` and emits change

### Store Listeners

* `SearchBarSuggestions` component listens to `SearchSuggestion` store
