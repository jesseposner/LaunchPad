var Dispatcher = require('../dispatcher/dispatcher.js'),
    Store = require('flux/utils').Store,
    CompanyConstants = require('../constants/companyConstants.js');

var CompanyStore = new Store(Dispatcher);

var _companies = {},
    _total = 0;

CompanyStore.all = function () {
  return Object.keys(_companies).map(function (id) {
    return _companies[id];
  });
};

CompanyStore.find = function (id) {
  return _companies[id];
};

CompanyStore.total = function () {
  return _total;
};

CompanyStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case CompanyConstants.COMPANIES_RECEIVED:
      updateCompanies(payload.companies);
      break;

    case CompanyConstants.COMPANY_RECEIVED:
      updateCompany(payload.company);
      break;

    case CompanyConstants.TOTAL_RECEIVED:
      updateTotal(payload.total);
      break;
  }

  this.__emitChange();
};

function updateCompanies(companies) {
  companies.forEach(function (company) {
    _companies[company.id] = company;
  });
}

function updateCompany(company) {
  _companies[company.id] = company;
}

function updateTotal(total) {
  _total = total.total;
}

module.exports = CompanyStore;
