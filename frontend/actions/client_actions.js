var ApiUtil = require('../util/api_util.js'),
    Dispatcher = require('../dispatcher/dispatcher.js'),
    UserConstants = require('../constants/userConstants.js');

var ClientActions = {
   removeCurrentUser: function () {
     Dispatcher.dispatch({
       actionType: UserConstants.LOGOUT,
     });
   }
 };

 module.exports = ClientActions;
