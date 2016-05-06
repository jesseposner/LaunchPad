var ApiUtil = require('../util/apiUtil.js'),
    Dispatcher = require('../dispatcher/dispatcher.js'),
    CompanyConstants = require('../constants/companyConstants');

var ClientActions = {
   fetchCurrentUser: function () {
     ApiUtil.fetchCurrentUser();
   },

   fetchCompany: function (id) {
     ApiUtil.fetchCompany(id);
   },

   fetchCompanies: function (page) {
     ApiUtil.fetchCompanies(page);
   },

   fetchTotalCompanies: function () {
     ApiUtil.fetchTotalCompanies();
   },

   setPosition: function (px) {
     Dispatcher.dispatch({
       actionType: CompanyConstants.POSITION_RECEIVED,
       px: px
     });
   },

   createUser: function (user) {
     ApiUtil.createUser(user);
   },

   createInvestment: function (investment) {
     ApiUtil.createInvestment(investment);
   },

   createCompany: function (company) {
     ApiUtil.createCompany(company);
   },

   createFounding: function (founding) {
     ApiUtil.createFounding(founding);
   },

   createSession: function (user) {
     ApiUtil.createSession(user);
   },

   deleteSession: function () {
     ApiUtil.deleteSession();
   }
 };

 module.exports = ClientActions;
