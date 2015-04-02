var React = require('react/addons');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var ListItem = require('./ListItem');
var style = require('./style');
var has = require('lodash.has');

var List = React.createClass({

  mixins: [ StyleResolverMixin, BrowserStateMixin ],

  render() {

    var children;

    if (this.props.items) {

      children = this.props.items.map((item, idx) => {

        if (typeof(item) === 'string') {
            item = {label: item};
        }
        
        return <ListItem
          {...item}
          key={has(item, 'key') ? item.key : idx}/>;
      });
    }
    else {
      children = React.Children.map(this.props.children, (child, idx) => {

        if (has(child.props, 'key')) {
          return child;
        }
        else {
          return React.addons.cloneWithProps(child, {key: idx});
        }
      });
    }

    return <div style={this.buildStyles(style.list)}>
      {children}
    </div>;
  }
});

module.exports = List;
