'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _ReduxFullPageLayout = require('../components/layouts/ReduxFullPageLayout');

var _ReduxFullPageLayout2 = _interopRequireDefault(_ReduxFullPageLayout);

var _SpaApp = require('../apps/SpaApp');

var App = _interopRequireWildcard(_SpaApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Spa = (function (_React$Component) {
    _inherits(Spa, _React$Component);

    function Spa() {
        _classCallCheck(this, Spa);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Spa).apply(this, arguments));
    }

    _createClass(Spa, [{
        key: 'render',
        value: function render() {
            return React.createElement(_ReduxFullPageLayout2.default, { "title": this.props.title, "pageName": "spa", "store": this.props.store, "isDevelopment": this.props.isDevelopment }, React.createElement(App.SpaApp, { "title": this.props.title }));
        }
    }]);

    return Spa;
})(React.Component);

exports.default = Spa;

module.exports = Spa;