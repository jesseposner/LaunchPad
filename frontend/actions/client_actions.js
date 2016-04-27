var ApiUtil = require('../util/api_util.js'),
    Dispatcher = require('../dispatcher/dispatcher.js'),
    UserConstants = require('../constants/userConstants.js');

var ClientActions = {
   removeCurrentUser: function () {
     Dispatcher.dispatch({
       actionType: UserConstants.LOGOUT,
     });
   },

   fetchCurrentUser: function () {
     ApiUtil.fetchCurrentUser();
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
