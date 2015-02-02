var React   = require('react');
var request = require('superagent');

var rpt = React.PropTypes;

var SVGPage = React.createFactory(
        require('../../react/components/SVGPage.react'));

var Index = React.createClass({

    displayName: 'Index',

    propTypes: {
        svg: rpt.string.isRequired
    },

    render: function () {

        return SVGPage({
            source: this.props.svg
        });
    }

});

request('/image', function (err, response) {

    if (err || response.status !== 200) {
        throw err || new Error(response.text);
    }

    return React.render(
            React.createFactory(Index)({ svg: response.text }),
            document.querySelector('[data-r-app]'));

});
