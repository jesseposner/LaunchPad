var Dispatcher = require('../dispatcher/dispatcher.js'),
    UserConstants = require('../constants/userConstants.js'),
    CompanyConstants = require('../constants/companyConstants.js');

 var ServerActions = {
   removeCurrentUser: function () {
     Dispatcher.dispatch({
       actionType: UserConstants.LOGOUT,
     });
   },

   receiveCurrentUser: function (user) {
     Dispatcher.dispatch({
       actionType: UserConstants.LOGIN,
       user: user
     });
   },

   receiveCompany: function (company) {
     Dispatcher.dispatch({
       actionType: CompanyConstants.COMPANY_RECEIVED,
       company: company
     });
   },

   receiveCompanies: function (companies) {
     Dispatcher.dispatch({
       actionType: CompanyConstants.COMPANIES_RECEIVED,
       companies: companies
     });
   },

   receiveTotalCompanies: function (total) {
     Dispatcher.dispatch({
       actionType: CompanyConstants.TOTAL_RECEIVED,
       total: total
     });
   },

   handleError: function (error) {
     Dispatcher.dispatch({
       actionType: UserConstants.ERROR,
       errors: error.responseJSON.errors
     });
   }
 };

 module.exports = ServerActions;
