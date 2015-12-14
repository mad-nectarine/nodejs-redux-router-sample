'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Reducer = undefined;

var _redux = require('redux');

var Redux = _interopRequireWildcard(_redux);

var _ListDetailParentActions = require('../actions/ListDetailParentActions');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _getinitialItems() {
    return [{ id: "0001", name: "item-0001" }, { id: "0002", name: "item-0002" }, { id: "0003", name: "item-0003" }, { id: "0004", name: "item-0004" }, { id: "0005", name: "item-0005" }];
}
//reducer
function selectedId() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case _ListDetailParentActions.ListDetailParentActionTypes.SELECT:
            return action.id;
        default:
            return state;
    }
}
function items() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? _getinitialItems() : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case _ListDetailParentActions.ListDetailParentActionTypes.ADD:
            var items = [];
            items.concat(state);
            items.push(action.item);
            return items;
        case _ListDetailParentActions.ListDetailParentActionTypes.UPDATE:
            return state.map(function (x) {
                if (x.id == action.item.id) {
                    return action.item;
                }
                return x;
            });
        case _ListDetailParentActions.ListDetailParentActionTypes.REMOVE:
            return state.filter(function (x) {
                return x.id != action.id;
            });
        case _ListDetailParentActions.ListDetailParentActionTypes.RELOAD:
            return _getinitialItems();
        default:
            return state;
    }
}
var Reducer = exports.Reducer = Redux.combineReducers({ selectedId: selectedId, items: items });
exports.default = Reducer;