var React = require('react');
var Matter = require('../../');
var {List, ListItem} = Matter;
var merge = require('lodash.merge');

var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var componentPages = {
  Button: require('./componentPages/Button.jsx'),
  ButtonGroup: require('./componentPages/ButtonGroup.jsx'),
};

global.Matter = Matter;
global.React = React;

merge(global, Matter);

console.log('routes', routes);

// var App = React.createClass({
//   render: function () {
//     return (
//       <div>
//         {Object.keys(componentPages).map((key) => {
//           var Comp = componentPages[key];
//           return <Comp key={key}/>;
//         })}
//       </div>
//     );
//   }
// });
//
// React.render(<App/>, document.body);





var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func,
  },
  render: function () {

    var {router} = this.context;

    return (
      <div style={{width: 920, padding: '0 20px', margin: '0 auto', display: 'flex'}}>
        <div style={{width: 270}}>
          <List width={210}>
            {Object.keys(componentPages).map(name => {
              
              return <ListItem
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
  <Route name="app" path="/" handler={App}>
    {Object.keys(componentPages).map(name => {
      return <Route name={name} handler={componentPages[name]}/>;
    })}
    <DefaultRoute handler={componentPages.Button}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
