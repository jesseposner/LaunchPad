var ServerActions = require('../actions/server_actions'),
    ClientActions = require('../actions/client_actions');

 module.exports = {
   fetchCurrentUser: function () {
     $.ajax({
       url: 'api/session',
       success: function (user) {
         ServerActions.receiveCurrentUser(user);
       },
     });
   },

   createUser: function (clientUser) {
     $.ajax({
       url: 'api/user',
       method: 'POST',
       data: { user: clientUser },
       success: function (serverUser) {
         ServerActions.receiveCurrentUser(serverUser);
       },
       error: function (error) {
         ServerActions.handleError(error);
       }
     });
   },

   createSession: function (clientUser) {
     $.ajax({
       url: 'api/session',
       method: 'POST',
       data: { user: clientUser },
       success: function (serverUser) {
         ServerActions.receiveCurrentUser(serverUser);
       },
       error: function (error) {
         ServerActions.handleError(error);
       }
     });
   },

   deleteSession: function () {
    //  ServerActions is present but ClientActions is an empty object???
    ClientActions;
    debugger;
     $.ajax({
       url: 'api/session',
       method: 'DELETE',
       success: function () {
         ServerActions.removeCurrentUser();
       },
       error: function (error) {
         ServerActions.handleError(error);
       }
     });
   }
 };
