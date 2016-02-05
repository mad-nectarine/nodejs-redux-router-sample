'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// == import installed modules ==
var React = require('react');
var react_router_1 = require('react-router');

var AppContainer = function (_React$Component) {
    _inherits(AppContainer, _React$Component);

    function AppContainer(props) {
        _classCallCheck(this, AppContainer);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AppContainer).call(this, props));

        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    _createClass(AppContainer, [{
        key: 'handleClick',
        value: function handleClick(event) {
            event.preventDefault();
            this.props.pushState(null, '/app/basic/parent/child/custom');
            //if not connect actions to props
            // const { dispatch } = this.props;
            // dispatch(pushState(null, '/parent/child/custom'));
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement("div", null, React.createElement("h1", null, "App Container"), React.createElement("div", { "className": "side-contents" }, React.createElement("ul", { "className": "links list" }, React.createElement("li", { "className": "unselectable" }, React.createElement("p", null, "Basic"), React.createElement("ul", null, React.createElement("li", null, React.createElement(react_router_1.Link, { "to": "/app/basic/parent" }, "/parent")), React.createElement("li", null, React.createElement(react_router_1.Link, { "to": "/app/basic/parent/child" }, "/parent/child")), React.createElement("li", null, React.createElement(react_router_1.Link, { "to": "/app/basic/parent/child/123" }, "/parent/child/123")), React.createElement("li", null, React.createElement("a", { "href": "#", "onClick": this.handleClick }, "/parent/child/custom(click) ")))), React.createElement("li", { "className": "unselectable" }, React.createElement("p", null, "List-Detail"), React.createElement("ul", null, React.createElement("li", null, React.createElement(react_router_1.Link, { "to": "/app/list" }, "/")), React.createElement("li", null, React.createElement(react_router_1.Link, { "to": "/app/list/detail" }, "/detail")))), React.createElement("li", { "className": "unselectable" }, React.createElement("p", null, "Authentication"), React.createElement("ul", null, React.createElement("li", null, React.createElement(react_router_1.Link, { "to": "/app/auth/login" }, "/login")), React.createElement("li", null, React.createElement(react_router_1.Link, { "to": "/app/auth/needAuth" }, "/needAuth")))))), React.createElement("div", { "className": "main-contents" }, React.createElement("section", null, this.props.children)));
        }
    }]);

    return AppContainer;
}(React.Component);

exports.AppContainer = AppContainer;
exports.default = AppContainer;