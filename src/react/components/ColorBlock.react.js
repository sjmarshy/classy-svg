var React = require('react');
var _     = require('underscore');

var rpt = React.PropTypes;
var dom = React.DOM;

var style = {
    colorBlock: {
        backgroundColor: '#FFF',
        width: '100%',
        height: 40
    }
};

var ColorBlock = React.createClass({

    displayName: 'ColorBlock',

    propTypes: {
        color: rpt.string.isRequired,
        onClick: rpt.func
    },

    getDefaultProps: function () {

        return {
            onClick: function () {}
        };
        
    },

    _style: function () {

        return _.extend(style.colorBlock, {
            backgroundColor: this.props.color
        });
        
    },

    _onClick: function (e) {

        e.preventDefault();
        e.stopPropagation();

        this.props.onClick(this.props.color);
        
    },

    render: function () {
        return dom.div({
            onClick: this._onClick,
            style: this._style() 
        });
    }

});

module.exports = ColorBlock;
