var Dispatcher = require('../dispatcher/dispatcher.js'),
    Store = require('flux/utils').Store,
    CompanyConstants = require('../constants/userConstants.js');

var CompanyStore = new Store(Dispatcher);

CompanyStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case CompanyConstants.COMPANIES_RECEIVED:
      break;

    case CompanyConstants.COMPANY_RECEIVED:
      break;
  }

  this.__emitChange();
};

module.exports = CompanyStore;
