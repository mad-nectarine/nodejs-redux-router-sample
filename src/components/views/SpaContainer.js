'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactRouter = require('react-router');

var _MessageArea = require('./MessageArea');

var _MessageArea2 = _interopRequireDefault(_MessageArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpaContainer = (function (_React$Component) {
    _inherits(SpaContainer, _React$Component);

    function SpaContainer(props) {
        _classCallCheck(this, SpaContainer);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SpaContainer).call(this, props));

        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleChangeClick = _this.handleChangeClick.bind(_this);
        return _this;
    }

    _createClass(SpaContainer, [{
        key: 'handleClick',
        value: function handleClick(event) {
            event.preventDefault();
            this.props.pushState(null, '/parent/child/custom');
            //if not connect actions to props
            // const { dispatch } = this.props;
            // dispatch(pushState(null, '/parent/child/custom'));
        }
    }, {
        key: 'handleChangeClick',
        value: function handleChangeClick(event) {
            event.preventDefault();
            this.props.changeMessage(this.refs["message"].value);
            //if not connect actions to props
            // const { dispatch } = this.props;
            //dispatch(IndexActions.changeMessage({ text: "test", type: "error" }));
        }
    }, {
        key: 'render',
        value: function render() {
            var links = ['/', '/parent?foo=bar', '/parent/child?bar=baz', '/parent/child/123?baz=foo'].map(function (l, index) {
                return React.createElement("li", null, React.createElement(_reactRouter.Link, { "to": l, "key": index }, l));
            });
            var message = this.props.message ? { type: "info", text: this.props.message } : { type: "error", text: "no message" };
            return React.createElement("div", null, React.createElement("h1", null, "App Container"), React.createElement("div", { "className": "side-contents" }, React.createElement("ul", { "className": "links list" }, links, React.createElement("li", null, React.createElement("a", { "href": "#", "onClick": this.handleClick }, "/parent/child/custom")))), React.createElement("div", { "className": "main-contents" }, React.createElement("section", null, React.createElement("div", { "className": "input-form" }, React.createElement("h1", null, "Message"), React.createElement("p", null, React.createElement("input", { "type": "text", "ref": "message" }), React.createElement("input", { "type": "button", "value": "Change", "onClick": this.handleChangeClick })), React.createElement("p", null, React.createElement(_MessageArea2.default, { "message": message })))), React.createElement("section", null, this.props.children)));
        }
    }]);

    return SpaContainer;
})(React.Component);

exports.default = SpaContainer;