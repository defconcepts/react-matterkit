var React = require('react');
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var style = require('../style');
var Icon = require('../Icon');

var Button = React.createClass({

  mixins: [ StyleResolverMixin, BrowserStateMixin ],

  getDefaultProps() {
    return {
      selected: false,
    };
  },

  render() {

    var icon;
    if (this.props.icon) {
      icon = <Icon icon={this.props.icon}
        style={{marginRight:this.props.text ? 4 : 0}}/>;
    }

    return <div
      {...this.getBrowserStateEvents()}
      style={this.buildStyles(style.tabLabel, {
        selected: this.props.selected,
        first: this.props.first,
        notFirst: !this.props.first,
        last: this.props.last,
      })}
      onClick={this.props.onClick}>
      {icon}
      {this.props.label}
    </div>;
  }
});

module.exports = Button;