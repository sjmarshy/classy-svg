var React   = require('react');
var request = require('superagent');

var rpt = React.PropTypes;

var SVG = React.createFactory(
        require('../../react/components/SVG.react'));

var Index = React.createClass({

    displayName: 'Index',

    propTypes: {
        svg: rpt.string.isRequired
    },

    render: function () {

        return SVG({
            source: this.props.svg
        });
    }

});

request('/image', function (err, response) {

    if (err || response.status !== 200) {
        throw err || new Error(response.text);
    }

    return React.render(Index({ svg: response.text }),
            document.querySelector('[data-r-app]'));

});
