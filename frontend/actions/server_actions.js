var Dispatcher = require('../dispatcher/dispatcher.js'),
    UserConstants = require('../constants/userConstants.js');

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

   handleError: function (error) {
     Dispatcher.dispatch({
       actionType: UserConstants.ERROR,
       errors: error.responseJSON.errors
     });
   }
 };

 module.exports = ServerActions;
