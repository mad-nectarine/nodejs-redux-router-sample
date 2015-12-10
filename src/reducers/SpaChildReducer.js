'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Reducer = undefined;

var _redux = require('redux');

var Redux = _interopRequireWildcard(_redux);

var _SpaChildActions = require('../actions/SpaChildActions');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//reducer
function message() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case _SpaChildActions.SpaChildActionTypes.CHANGE_MESSAGE:
            return action.message;
        default:
            return state;
    }
}
var Reducer = exports.Reducer = Redux.combineReducers({ message: message });
exports.default = Reducer;