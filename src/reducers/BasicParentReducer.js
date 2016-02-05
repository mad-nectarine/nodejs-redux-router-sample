'use strict';

var Redux = require('redux');
var BasicParentActions_1 = require('../actions/BasicParentActions');
//reducer
function message() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case BasicParentActions_1.BasicParentActionTypes.CHANGE_MESSAGE:
            return action.message;
        default:
            return state;
    }
}
exports.Reducer = Redux.combineReducers({ message: message });
exports.default = exports.Reducer;