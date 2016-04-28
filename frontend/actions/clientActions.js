var ApiUtil = require('../util/apiUtil.js'),
    Dispatcher = require('../dispatcher/dispatcher.js');

var ClientActions = {
   fetchCurrentUser: function () {
     ApiUtil.fetchCurrentUser();
   },

   fetchCompany: function (id) {
     ApiUtil.fetchCompany(id);
   },

   fetchCompanies: function () {
     ApiUtil.fetchCompanies();
   },

   createUser: function (user) {
     ApiUtil.createUser(user);
   },

   createSession: function (user) {
     ApiUtil.createSession(user);
   },

   deleteSession: function () {
     ApiUtil.deleteSession();
   }
 };

 module.exports = ClientActions;
