"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListDetailChild = (function (_React$Component) {
    _inherits(ListDetailChild, _React$Component);

    function ListDetailChild() {
        _classCallCheck(this, ListDetailChild);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ListDetailChild).apply(this, arguments));
    }

    _createClass(ListDetailChild, [{
        key: "render",
        value: function render() {
            //get values from props
            var _props = this.props;
            var mode = _props.mode;
            var inputItem = _props.inputItem;

            return React.createElement("section", null, React.createElement("h2", null, "Detail"), React.createElement("section", null, React.createElement("div", { "className": "input-form" }, React.createElement("p", null, React.createElement("label", null, "ID"), this._getIdDom.bind(this)(inputItem, mode)), React.createElement("p", null, React.createElement("label", null, "Name"), this._getNameDom.bind(this)(inputItem, mode))), React.createElement("div", { "className": "operations" }, this._getSubmitDom.bind(this)(mode))));
        }
    }, {
        key: "_handleChangeInputValue",
        value: function _handleChangeInputValue(event) {
            var id = this.refs["id"].value;
            var name = this.refs["name"].value;
            this.props.changeInput({ id: id, name: name });
        }
    }, {
        key: "_handleSubmitClick",
        value: function _handleSubmitClick(mode, event) {
            var id = this.refs["id"].value;
            var name = this.refs["name"].value;
            switch (mode) {
                case "add":
                    this.props.add({ id: id, name: name });
                    break;
                case "update":
                    this.props.update({ id: id, name: name });
                    break;
                case "remove":
                    this.props.remove(id);
                    break;
                default:
                    break;
            }
        }
    }, {
        key: "_getIdDom",
        value: function _getIdDom(item, mode) {
            var canInput = mode == "add";
            var id = item ? item.id : "";
            if (canInput) {
                return React.createElement("input", { "type": "text", "value": id, "ref": "id", "onChange": this._handleChangeInputValue.bind(this) });
            }
            return React.createElement("input", { "type": "text", "value": id, "ref": "id", "disabled": true });
        }
    }, {
        key: "_getNameDom",
        value: function _getNameDom(item, mode) {
            var canInput = mode == "add" || mode == "update";
            var name = item ? item.name : "";
            if (canInput) {
                return React.createElement("input", { "type": "text", "value": name, "ref": "name", "onChange": this._handleChangeInputValue.bind(this) });
            }
            return React.createElement("input", { "type": "text", "value": name, "ref": "name", "disabled": true });
        }
    }, {
        key: "_getSubmitDom",
        value: function _getSubmitDom(mode) {
            var _this2 = this;

            switch (mode) {
                case "add":
                case "update":
                case "remove":
                    var click = function click(e) {
                        _this2._handleSubmitClick(mode, e);
                    };
                    return React.createElement("input", { "type": "button", "value": mode, "onClick": click.bind(this) });
                default:
                    break;
            }
            return null;
        }
    }]);

    return ListDetailChild;
})(React.Component);

exports.default = ListDetailChild;