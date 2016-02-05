'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var MessageArea_1 = require('./MessageArea');

var ListDetailParent = function (_React$Component) {
    _inherits(ListDetailParent, _React$Component);

    function ListDetailParent() {
        _classCallCheck(this, ListDetailParent);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ListDetailParent).apply(this, arguments));
    }

    _createClass(ListDetailParent, [{
        key: 'handleSelect',
        value: function handleSelect(item, event) {
            if (item) {
                this.props.select(item.id);
                this.props.pushState(null, 'detail');
            }
        }
    }, {
        key: 'handleModeChange',
        value: function handleModeChange(mode, event) {
            this.props.changeMode(mode);
        }
    }, {
        key: 'handleLoad',
        value: function handleLoad(event) {
            this.props.loadList();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            //get values from props
            var _props = this.props;
            var items = _props.items;
            var selectedId = _props.selectedId;
            var message = _props.message;

            var itemsDom = null;
            var addHandler = function addHandler(e) {
                _this2.handleModeChange("add", e);
            };
            var updateHandler = function updateHandler(e) {
                _this2.handleModeChange("update", e);
            };
            var removeHandler = function removeHandler(e) {
                _this2.handleModeChange("remove", e);
            };
            var hasSelected = undefined;
            if (items && items.length) {
                itemsDom = items.map(function (item) {
                    var isSelected = item.id == selectedId;
                    var className = isSelected ? "selected" : "";
                    var click = _this2.handleSelect.bind(_this2, item);
                    if (isSelected) {
                        hasSelected = true;
                    }
                    return React.createElement("li", { "className": className, "key": item.id, "onClick": click }, item.name);
                });
            } else {
                itemsDom = React.createElement("li", null, "no items");
            }
            return React.createElement("section", null, React.createElement("h2", null, "List"), React.createElement(MessageArea_1.default, { "message": message }), React.createElement("section", null, React.createElement("div", { "className": "operations" }, React.createElement("input", { "type": "button", "value": "Load", "onClick": this.handleLoad.bind(this) }), React.createElement("input", { "type": "button", "value": "Add", "onClick": addHandler.bind(this) }), React.createElement("input", { "type": "button", "value": "Update", "onClick": updateHandler.bind(this), "disabled": !hasSelected }), React.createElement("input", { "type": "button", "value": "Remove", "onClick": removeHandler.bind(this), "disabled": !hasSelected })), React.createElement("ul", { "className": "list" }, itemsDom)), React.createElement("section", null, this.props.children));
        }
    }]);

    return ListDetailParent;
}(React.Component);

exports.ListDetailParent = ListDetailParent;