'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Reducer = undefined;

var _redux = require('redux');

var Redux = _interopRequireWildcard(_redux);

var _ListDetailActions = require('../actions/ListDetailActions');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//reducer
function selectedId() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case _ListDetailActions.ListDetailActionTypes.SELECT:
            return action.id;
        default:
            return state;
    }
}
function items() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case _ListDetailActions.ListDetailActionTypes.ADD:
            var items = [];
            items = items.concat(state);
            items.push(action.item);
            return items;
        case _ListDetailActions.ListDetailActionTypes.UPDATE:
            return state.map(function (x) {
                if (x.id == action.item.id) {
                    return action.item;
                }
                return x;
            });
        case _ListDetailActions.ListDetailActionTypes.REMOVE:
            return state.filter(function (x) {
                return x.id != action.id;
            });
        case _ListDetailActions.ListDetailActionTypes.LOAD_LIST:
            return [].concat(action.items);
        default:
            return state;
    }
}
function message() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case _ListDetailActions.ListDetailActionTypes.CHANGE_MESSAGE:
            return action.message;
        default:
            return state;
    }
}
function mode() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? "refer" : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case _ListDetailActions.ListDetailActionTypes.CHANGE_MODE:
            return action.mode;
        default:
            return state;
    }
}
function inputItem() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case _ListDetailActions.ListDetailActionTypes.CHANGE_INPUT:
            return action.input;
        default:
            return state;
    }
}
var Reducer = exports.Reducer = Redux.combineReducers({ selectedId: selectedId, items: items, message: message, mode: mode, inputItem: inputItem });
exports.default = Reducer;