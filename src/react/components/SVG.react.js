var React = require('react');
var _     = require('underscore');

var dom = React.DOM;
var rpt = React.PropTypes;

var style = {
    svg: {
        display: 'flex',
        minWidth: '100%',
        minHeight: 200,
        alignItems: 'center',
        justifyContent: 'center'
    }
};

var SVG = React.createClass({

    displayName: 'ClassySVG',

    propTypes: {
        source: rpt.string.isRequired,
        changeList: rpt.object
    },

    componentDidMount: function () {
        if (this.props && this.props.hasOwnProperty('changeList')) {
            this._updateColors(this.props.changeList); 
        }
    },

    componentWillReceiveProps: function (newprops) {
        if (newprops && newprops.changeList) {
            this._updateColors(newprops.changeList); 
        }
    },

    _updateColors: function (changes) {

        if (changes) {

            var node = this.getDOMNode();
            var keys = Object.keys(changes);

            var changeNodes = _.flatten(keys.map(function (k) {

                return node.querySelectorAll('[fill~="' + k + '"]');

            }));

            if (changeNodes.length > 0) {

                var cn = Array.prototype.slice.apply(changeNodes[0]);

                cn.forEach(function (n) {

                    var c = n.getAttribute('fill');

                    n.setAttribute('fill', changes[c]);

                });
            }

        }
    },

    render: function () {
        return dom.div({
            style: style.svg,
            dangerouslySetInnerHTML: {
                __html: this.props.source
            }
        });
    }

});

module.exports = SVG;
