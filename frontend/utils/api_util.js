var ServerActions = require('../actions/serverActions.js'),
    ClientActions = require('../actions/clientActions.js');

 module.exports = {
   fetchCurrentUser: function () {
     $.ajax({
       url: 'api/session',
       success: function (user) {
         ServerActions.receiveCurrentUser(user);
       },
       error: function (error) {
         ServerActions.handleError(error);
       }
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
     $.ajax({
       url: 'api/session',
       success: function () {
         ClientActions.removeCurrentUser();
       },
       error: function (error) {
         ServerActions.handleError(error);
       }
     });
   }
 };
