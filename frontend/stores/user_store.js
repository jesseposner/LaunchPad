var Dispatcher = require('../dispatcher/dispatcher.js'),
    Store = require('flux/utils').Store;

var UserStore = new Store(Dispatcher);



module.exports = UserStore;
