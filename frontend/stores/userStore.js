var Dispatcher = require('../dispatcher/dispatcher.js'),
    Store = require('flux/utils').Store,
    UserConstants = require('../constants/userConstants.js'),
    myStorage = localStorage;

var UserStore = new Store(Dispatcher);

var _currentUser = JSON.parse(myStorage.getItem("currentUser")),
    _errors;

UserStore.currentUser = function () {
  if (myStorage.getItem("currentUser") === "false"){
    return null;
  } else {
    return _currentUser;
  }
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
      logout();
      break;

    case UserConstants.ERROR:
      setErrors(payload.errors);
      break;
  }

  this.__emitChange();
};

function login(user) {
  _currentUser = user;
  myStorage.setItem("currentUser", JSON.stringify(user));
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
