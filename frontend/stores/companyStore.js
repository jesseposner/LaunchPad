var Dispatcher = require('../dispatcher/dispatcher.js'),
    Store = require('flux/utils').Store,
    CompanyConstants = require('../constants/companyConstants.js');

var CompanyStore = new Store(Dispatcher);

var _companies = {},
    _search = {},
    _total = 0,
    _pos = 0;

CompanyStore.all = function () {
  return Object.keys(_companies).reverse().map(function (id) {
    return _companies[id];
  });
};

CompanyStore.find = function (id) {
  return _companies[id];
};

CompanyStore.searchResults = function () {
  return Object.keys(_search).map(function (id) {
    return _search[id];
  });
};

CompanyStore.total = function () {
  return _total;
};

CompanyStore.pos = function () {
  return _pos;
};

CompanyStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case CompanyConstants.COMPANIES_RECEIVED:
      updateCompanies(payload.companies);
      break;

    case CompanyConstants.COMPANY_RECEIVED:
      updateCompany(payload.company);
      break;

    case CompanyConstants.SEARCH_RESULTS_RECEIVED:
      updateSearch(payload.companies);
      break;

    case CompanyConstants.TOTAL_RECEIVED:
      updateTotal(payload.total);
      break;

    case CompanyConstants.POSITION_RECEIVED:
      updatePosition(payload.px);
      break;
  }

  this.__emitChange();
};

function updateCompanies(companies) {
  companies.forEach(function (company) {
    _companies[company.id] = company;
  });
}

function updateSearch(companies) {
  _search = {};
  
  companies.forEach(function (company) {
    _search[company.id] = company;
  });
}

function updateCompany(company) {
  _companies[company.id] = company;
}

function updateTotal(total) {
  _total = total.total;
}

function updatePosition(px) {
  _pos = px;
}

module.exports = CompanyStore;
