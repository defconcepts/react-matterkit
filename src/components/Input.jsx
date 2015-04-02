var React = require('react/addons');
var { PureRenderMixin } = React;
var { StyleResolverMixin, BrowserStateMixin } = require('radium');
var merge = require('lodash/object/merge');
var has = require('lodash/object/has');
var _isFinite = require('lodash/lang/isFinite');
var isArray = require('lodash/lang/isArray');
var style = require('./style');
var Icon = require('./Icon');
var List = require('./List');
var CustomDrag = require('../utils/CustomDrag');
var levenshtein = require('fast-levenshtein');

var Input = React.createClass({

  mixins: [ StyleResolverMixin, BrowserStateMixin ],

  getDefaultProps() {
    return {
      disabled: false,
      draggable: true,
      precision: 0,
      dragSpeed: 1,
      defaultValue: 0,
      min: undefined,
      max: undefined,
      hints: undefined,
      maxVisibleHints: 12,
    };
  },

  getInitialState() {
    return {
      value: this.props.value,
      error: false,
    };
  },

  componentWillMount() {
    this._validate(this.state.value);
  },

  componentDidMount() {

    new CustomDrag({
      deTarget: this.getDOMNode(),
      onDown: (e) => {

        if (this.props.type !== 'number' || !this.props.draggable) {

          return false;
        }

        return {
          value: this.props.value,
          moved: false,
        };
      },
      onDrag: (md) => {

        md.moved = true;

        var value = md.value + md.dx * this.props.dragSpeed;
        this._onChange(value);
      },
      onUp: (md) => {
        if (!md.moved) this.refs.input.getDOMNode().focus();
      }
    });
  },

  componentWillReciveProps(nextProps) {

    if(has(nextProps, 'value')) {

      this.setState({value: nextProps.value});
    }
  },

  _onChange(value) {

    if (this.props.type === 'number') {

      value = this._formatNumber(value);
    }

    this.setState({value});

    this._validate(value);

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  },

  _formatNumber(value) {

    var min = this.props.min,
      max = this.props.max,
      precision = this.props.precision;

    if (_isFinite(min)) value = Math.max(min, value);
    if (_isFinite(max)) value = Math.min(max, value);

    value = parseFloat(value.toFixed(precision));

    return value;
  },

  _validate(value) {

    if (typeof(this.props.validate) === 'function') {

      this.setState({error: !this.props.validate(value)});
    }
  },

  renderHints() {

    var value = this.state.value;
    var hintsProp = this.props.hints;
    var hints = [];

    if (!value || !hintsProp) {
      return null;
    }

    if (typeof(hintsProp) === 'function') {

      hints = hints(value);
    }
    else if (isArray(hintsProp)) {

      let matches = [];

      hintsProp.forEach(hint => {

        var dist = levenshtein.get(value, hint);

        if (dist < 32) {
          matches.push({hint, dist});
        }
      });

      matches.sort((a, b) => a.dist - b.dist);

      let l = Math.min(matches.length, this.props.maxVisibleHints);
      for (let i = 0; i < l; ++i) {

        hints.push(matches[i].hint);
      }
    }

    if (hints.length === 0) {
      return null;
    }
console.log(hints)
    return <List items={hints}/>;
  },

  render: function () {

    var type = this.props.type;

    if (type === 'number') type = 'tel';

    return <div
      style = {this.buildStyles(style.input, {disabled: this.props.disabled})}>

      <input
        ref='input'
        {...this.getBrowserStateEvents()}
        style = {style.inputReset}
        value = {this.state.value}
        palceholder = {this.props.palceholder}
        type = {type}
        name = {this.props.name}
        pattern = {this.props.pattern}
        onChange = {e => this._onChange(e.target.value)}
        disabled = {this.props.disabled}/>

      <Addon
        icon={this.props.addonIcon}
        label={this.props.addonLabel}
        background={this.props.addonBackground}
        onClick={this.props.addonOnClick}/>


      {this.renderHints()}
    </div>;
  }
});




var Addon = React.createClass({

  mixins: [ StyleResolverMixin, BrowserStateMixin ],

  render() {

    if (!this.props.label && !this.props.icon) {
      return <div hidden={true}/>;
    }

    var icon = this.props.icon ? <Icon icon={this.props.icon}/> : undefined;

    return <span
      {...this.getBrowserStateEvents()}
      style = {this.buildStyles(style.inputAddon)}
      onClick={this.props.onClick}>

      {this.props.label}
      {icon}

    </span>;
  },
});

module.exports = Input;
