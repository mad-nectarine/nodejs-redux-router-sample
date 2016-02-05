'use strict';

var Redux = require('redux');
var ListDetailActions_1 = require('../actions/ListDetailActions');
//reducer
function selectedId() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case ListDetailActions_1.ListDetailActionTypes.SELECT:
            return action.id;
        default:
            return state;
    }
}
function items() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case ListDetailActions_1.ListDetailActionTypes.ADD:
            var items = [];
            items = items.concat(state);
            items.push(action.item);
            return items;
        case ListDetailActions_1.ListDetailActionTypes.UPDATE:
            return state.map(function (x) {
                if (x.id == action.item.id) {
                    return action.item;
                }
                return x;
            });
        case ListDetailActions_1.ListDetailActionTypes.REMOVE:
            return state.filter(function (x) {
                return x.id != action.id;
            });
        case ListDetailActions_1.ListDetailActionTypes.LOAD_LIST:
            return [].concat(action.items);
        default:
            return state;
    }
}
function message() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case ListDetailActions_1.ListDetailActionTypes.CHANGE_MESSAGE:
            return action.message;
        default:
            return state;
    }
}
function mode() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? "refer" : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case ListDetailActions_1.ListDetailActionTypes.CHANGE_MODE:
            return action.mode;
        default:
            return state;
    }
}
function inputItem() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case ListDetailActions_1.ListDetailActionTypes.CHANGE_INPUT:
            return action.input;
        default:
            return state;
    }
}
exports.Reducer = Redux.combineReducers({ selectedId: selectedId, items: items, message: message, mode: mode, inputItem: inputItem });
exports.default = exports.Reducer;