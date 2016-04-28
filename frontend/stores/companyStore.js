var Dispatcher = require('../dispatcher/dispatcher.js'),
    Store = require('flux/utils').Store,
    CompanyConstants = require('../constants/companyConstants.js');

var CompanyStore = new Store(Dispatcher);

var _companies = {};

CompanyStore.all = function () {
  return Object.keys(_companies).map(function (id) {
    return _companies[id];
  });
};

CompanyStore.find = function (id) {
  return _companies[id];
};

CompanyStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case CompanyConstants.COMPANIES_RECEIVED:
      updateCompanies(payload.companies);
      break;

    case CompanyConstants.COMPANY_RECEIVED:
      updateCompany(payload.company);
      break;
  }

  this.__emitChange();
};

function updateCompanies(companies) {
  _companies = {};
  companies.forEach(function (company) {
    _companies[company.id] = company;
  });
}

function updateCompany(company) {
  _companies[company.id] = company;
}

module.exports = CompanyStore;
