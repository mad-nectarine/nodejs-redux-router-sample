'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var MessageArea_1 = require('./MessageArea');

var BasicParent = function (_React$Component) {
    _inherits(BasicParent, _React$Component);

    function BasicParent(props) {
        _classCallCheck(this, BasicParent);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BasicParent).call(this, props));

        _this.handleChangeClick = _this.handleChangeClick.bind(_this);
        return _this;
    }

    _createClass(BasicParent, [{
        key: 'handleChangeClick',
        value: function handleChangeClick(event) {
            event.preventDefault();
            this.props.changeMessage(this.refs["message"].value);
            //if not connect actions to props
            // const { dispatch } = this.props
            //dispatch(IndexActions.changeMessage({ text: "test", type: "error" }))
        }
    }, {
        key: 'render',
        value: function render() {
            //get values from props
            var message = this.props.message;
            //create elements

            var messageProps = message ? { type: "info", text: message } : { type: "error", text: "no message" };
            return React.createElement("section", null, React.createElement("h2", null, "Parent"), React.createElement("section", null, React.createElement("div", { "className": "input-form" }, React.createElement("h1", null, "Message"), React.createElement("p", null, React.createElement("input", { "type": "text", "ref": "message" }), React.createElement("input", { "type": "button", "value": "Change", "onClick": this.handleChangeClick })), React.createElement("p", null, React.createElement(MessageArea_1.default, { "message": messageProps })))), this.props.children);
        }
    }]);

    return BasicParent;
}(React.Component);

exports.BasicParent = BasicParent;