var ServerActions = require('../actions/serverActions'),
    ClientActions = require('../actions/clientActions');

 module.exports = {
   fetchCurrentUser: function () {
     $.ajax({
       url: 'api/session',
       success: function (user) {
         ServerActions.receiveCurrentUser(user);
       },
     });
   },

   fetchCompany: function (id) {
     $.ajax({
       url: 'api/companies/' + id,
       success: function (company) {
         ServerActions.receiveCompany(company);
       }
     });
   },

   fetchCompanies: function (page) {
     $.ajax({
       url: 'api/companies',
       data: { page: page },
       success: function (companies) {
         ServerActions.receiveCompanies(companies);
       }
     });
   },

   fetchTotalCompanies: function () {
     $.ajax({
       url: 'api/companies',
       data: { total: true },
       success: function (total) {
         ServerActions.receiveTotalCompanies(total);
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

   createInvestment: function (investment) {
     $.ajax({
       url: 'api/investment',
       method: 'POST',
       data: { investment: investment },
       success: function (company) {
         ServerActions.receiveCompany(company);
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
