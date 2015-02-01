var React = require('react');

var dom = React.DOM;
var rpt = React.PropTypes;

var style = {
    svg: {
        display: 'flex',
        minWidth: 200,
        minHeight: 200,
        alignItems: 'center',
        justifyContent: 'center'
    }
};

var SVG = React.createClass({

    displayName: 'ClassySVG',

    propTypes: {
        source: rpt.string.isRequired
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
