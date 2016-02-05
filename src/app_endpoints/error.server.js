'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PlainFullPageLayout_1 = require('../components/layouts/PlainFullPageLayout');
var DefaultLayout_1 = require('../components/layouts/DefaultLayout');

var Error = function (_React$Component) {
    _inherits(Error, _React$Component);

    function Error() {
        _classCallCheck(this, Error);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Error).apply(this, arguments));
    }

    _createClass(Error, [{
        key: 'render',
        value: function render() {
            return React.createElement(PlainFullPageLayout_1.default, { "title": this.props.title }, React.createElement(DefaultLayout_1.default, { "title": this.props.message }, React.createElement("h2", null, this.props.error.status), React.createElement("pre", null, this.props.error.stack)));
        }
    }]);

    return Error;
}(React.Component);

exports.Error = Error;
module.exports = Error;