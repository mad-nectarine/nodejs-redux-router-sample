'use strict';

var redux_1 = require('redux');
var BasicChildActions_1 = require('../actions/BasicChildActions');
//reducer
function message() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case BasicChildActions_1.BasicChildActionTypes.CHANGE_MESSAGE:
            return action.message;
        default:
            return state;
    }
}
exports.Reducer = redux_1.combineReducers({ message: message });
exports.default = exports.Reducer;