var Dispatcher = require('../dispatcher/dispatcher.js'),
    Store = require('flux/utils').Store,
    UserConstants = require('../constants/userConstants.js');

var UserStore = new Store(Dispatcher);

var _currentUser,
    _errors;

UserStore.currentUser = function () {
  if (_currentUser) return $.extend({}, _currentUser);
};

UserStore.errors = function () {
  if (_errors) return [].slice.call(_errors);
};

UserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case UserConstants.LOGIN:
      login(payload.user);
      break;

    case UserConstants.LOGOUT:
      logout(payload.user);
      break;

    case UserConstants.ERROR:
      setErrors(payload.user);
      break;
  }

  this.__emitChange();
};

function login(user) {
  _currentUser = user;
  _errors = null;
}

function logout() {
  _currentUser = null;
  _errors = null;
}

function setErrors(errors) {
  _errors = errors;
}

module.exports = UserStore;
