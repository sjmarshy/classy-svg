var React  = require('react');
var chroma = require('chroma-js');
var _      = require('underscore');

var dom = React.DOM;
var rpt = React.PropTypes;

var SVG        = React.createFactory(require('./SVG.react.js'));
var ColorBlock = React.createFactory(require('./ColorBlock.react'));

function _isHex (str) {
    return str.search(/(?:^#[A-F0-9]{6})|(?:^#[A-F0-9]{3}$)/) !== -1;
}

var style = {
    cb: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        margin: '0 5px'
    },
    page: {
        display: 'flex',
        flexWrap: 'nowrap'
    }
};

// grab the colors out of the SVG, man
var SVGPage = React.createClass({

    displayName: 'SVGPage',

    propTypes: {
        source: rpt.string.isRequired
    },

    componentDidMount: function () {
        this.forceUpdate();
    },

    _getSVGColors: function () {

        var node = this.refs.svg.getDOMNode();

        return Array.prototype.slice.apply(node.querySelectorAll('[fill]')).
            filter(function (child) {
                return _isHex(child.getAttribute('fill'));
            }).
            map(function (child) {
                return child.getAttribute('fill');
            });
    },

    _selectColor: function (color) {

        this.setState({
            selectedColor: color
        });
        
    },

    render: function () {

        var colors;
        var colorBlocks;
        var _this = this;
        var changeList = {};
        var svgProps = {
            ref: 'svg',
            source: this.props.source
        };

        if (this.isMounted()) {
            colors = this._getSVGColors();
        } else {
            colors = [];
        }

        colorBlocks = colors.map(function (col, i) {

            return dom.div({ style: style.cb },
                    ColorBlock({
                        key: 'c-' + i,
                        color: col,
                        onClick: _this._selectColor
                    }),
                    dom.p({}, col));
            
        });
        


        if (this.state && this.state.hasOwnProperty('selectedColor')) {
            var c = this.state.selectedColor;
            changeList[c] = chroma(c).brighten().hex();
        }

        return dom.div({},
                dom.div({ style: style.page }, colorBlocks),
                SVG(_.extend(svgProps, {
                    changeList: changeList
                })));
    }

});

module.exports = SVGPage;
