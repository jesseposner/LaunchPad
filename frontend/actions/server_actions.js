var Dispatcher = require('../dispatcher/dispatcher.js'),
    UserConstants = require('../constants/userConstants.js');

 var ServerActions = {
   receiveCurrentUser: function (user) {
     Dispatcher.dispatch({
       actionType: UserConstants.LOGIN,
       user: user
     });
   },

   handleError: function (error) {
     debugger;
     Dispatcher.dispatch({
       actionType: UserConstants.ERROR,
       errors: error.responseJSON.errors
     });
   }
 };

 module.exports = ServerActions;
