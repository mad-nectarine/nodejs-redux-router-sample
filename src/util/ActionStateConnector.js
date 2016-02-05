"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ActionStateConnector = function () {
    function ActionStateConnector() {
        _classCallCheck(this, ActionStateConnector);
    }

    _createClass(ActionStateConnector, [{
        key: "connect",
        value: function connect(arg) {
            if (typeof arg === "string") {
                this._connectedStatePath = arg;
            }
            if (typeof arg === "function") {
                this._getStateFunction = arg;
            }
        }
    }, {
        key: "get",
        value: function get(getState) {
            var state = getState();
            return this._getConnectedState(state);
        }
    }, {
        key: "getOrOriginal",
        value: function getOrOriginal(getState) {
            var original = getState();
            var state = this._getConnectedState(original);
            if (state) {
                return state;
            }
            return original;
        }
    }, {
        key: "_getConnectedState",
        value: function _getConnectedState(state) {
            if (this._connectedStatePath) {
                return this._getConnectedStateByPath(state);
            }
            if (this._getStateFunction) {
                return this._getStateFunction(state);
            }
            return null;
        }
    }, {
        key: "_getConnectedStateByPath",
        value: function _getConnectedStateByPath(state) {
            var path = this._connectedStatePath;
            if (path) {
                var paths = path.split(".");
                for (var i = 0; i < paths.length; i++) {
                    var p = paths[0];
                    if (state[p] === undefined) {
                        return null;
                    }
                    state = state[p];
                }
                return state;
            }
            return null;
        }
    }]);

    return ActionStateConnector;
}();

exports.ActionStateConnector = ActionStateConnector;
function ConnectedState() {
    return new ActionStateConnector();
}
exports.default = ConnectedState;