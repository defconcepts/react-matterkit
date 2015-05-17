require('./index.html');//for the webpack build

var React = require('react');
var Matter = require('matterkit');
var {List, ListItem, style} = Matter;
var merge = require('lodash/object/merge');
var kebabCase = require('lodash/string/kebabCase');

var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Redirect = Router.Redirect;


var componentPages = {
  Button: require('./componentPages/Button.jsx'),
  // Checkbox: require('./componentPages/Checkbox.jsx'),
  // ColorInput: require('./componentPages/ColorInput.jsx'),
  // Icon: require('./componentPages/Icon.jsx'),
  // Input: require('./componentPages/Input.jsx'),
  ItemGroup: require('./componentPages/ItemGroup.jsx'),
  // MultiTypeInput: require('./componentPages/MultiTypeInput.jsx'),
  // Toggle: require('./componentPages/Toggle.jsx'),
};

global.Matter = Matter;
global.React = React;

merge(global, Matter);

console.log('routes', routes);





var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func,
  },
  render: function () {

    var {router} = this.context;

    var styleCont = merge({}, style.font, {
      width: 920,
      padding: '0 20px',
      margin: '12px auto',
      display: 'flex',
      color: style.fontColor.normal,
    });

    return (
      <div style={styleCont}>
        <div style={{width: 270}}>
            <Matter.Button label='dasist'/>
          <List style={{width: 210}}>
            {Object.keys(componentPages).map(name => {

              return <ListItem
                key={name}
                label={name}
                onClick={()=>router.transitionTo(name)}
                selected={router.isActive(name)}/>;
            })}
          </List>
        </div>
        <div style={{width: 650}}>
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
    {Object.keys(componentPages).map(name => {

      return <Route
        key={name}
        name={name}
        path={kebabCase(name)}
        handler={componentPages[name]}/>;
    })}
    <Redirect from='' to='Button' />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.querySelector('#react-mount'));
});
// React.render(<Matter.Button label='button' items={['foo', 'bar', 'qux']}/>, document.querySelector('#react-mount'));
