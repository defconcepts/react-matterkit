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
var fuzzy = require('fuzzy');

var Input = React.createClass({

  mixins: [ StyleResolverMixin, BrowserStateMixin ],

  getDefaultProps() {
    return {
      disabled: false,
      draggable: true,
      precision: 12,
      dragSpeed: 1,
      value: '',
      type: 'text',
      min: undefined,
      max: undefined,
      hints: undefined,
      maxVisibleHints: 12,
    };
  },

  getInitialState() {
    return {
      value: undefined,
      error: false,
    };
  },

  componentWillMount() {
    this.handleValue(this.props.value);
  },

  componentDidMount() {

    new CustomDrag({
      deTarget: this.getDOMNode(),
      onDown: (e) => {

        if (this.props.type !== 'number' || !this.props.draggable) {

          return false;
        }

        return {
          value: this.state.value,
          moved: false,
        };
      },
      onDrag: (md) => {
        md.moved = true;

        var value = md.value + md.dx * this.props.dragSpeed;
        this.handleValue(value);
      },
      onUp: (md) => {
        if (!md.moved) {

          let node = this.refs.input.getDOMNode();
          node.focus();
          node.select();
        }
      }
    });
  },

  componentWillReceiveProps(nextProps) {

    this.handleValue(nextProps.value, nextProps);
  },

  componentDidUpdate(prevProps, prevState) {

    var {exportValue} = this.state;

    if (exportValue !== prevState.exportValue &&
      exportValue !== this.props.value && 
      this.props.onChange) {

      this.props.onChange(exportValue);
    }
  },

  handleValue(value, props) {

    props = props || this.props;

    value = this._formatValue(value, props);

    var {prepareExportValue} = props;
    var exportValue = prepareExportValue ? prepareExportValue(value) : value;

    this.setState({value, exportValue});

    this._validate(value);
  },

  _formatValue(value, props) {

    props = props || this.props;

    if (props.type === 'number') {
      value =  this._formatNumber(value);
    }
    else if (props.type === 'text') {
      value += '';
    }

    if (props.formatValue) {
      value = props.formatValue(value);
    }

    return value;
  },

  _formatNumber(value) {

    var min = this.props.min,
      max = this.props.max,
      precision = this.props.precision;

    value = parseFloat(value);

    if (_isFinite(min)) value = Math.max(min, value);
    if (_isFinite(max)) value = Math.min(max, value);

    value = parseFloat(value.toFixed(precision));

    return _isFinite(value) ? value : 0;
  },

  _validate(value) {

    if (typeof(this.props.validate) === 'function') {

      this.setState({error: !this.props.validate(value)});
    }
  },

  renderHints() {

    var {value, lastlySelectedHint} = this.state;

    if (value === lastlySelectedHint || !value || !this.props.hints) {
      return null;
    }

    var hints = fuzzy.filter(value, this.props.hints, {
      pre: '<strong>',
      post:'</strong>',
    });

    hints.splice(12);

    hints = hints.map(hint => {
      return {
        label: <span dangerouslySetInnerHTML={{__html: hint.string}}/>,
        onClick: ()=> {
          var value = this._formatValue(hint.original);
          this.setState({value, lastlySelectedHint: value});
        },
      };
    });

    if (hints.length === 0) {
      return null;
    }
    return <List items={hints} style={{
      position: 'absolute',
      zIndex: 1,
      top: '100%',
      left: 0,
      width: '100%',
    }}/>;
  },

  render: function () {

    return <div
      style = {this.buildStyles(style.input)}>

      <input
        ref='input'
        {...this.getBrowserStateEvents()}
        style = {style.inputReset}
        value = {this.state.value}
        palceholder = {this.props.palceholder}
        type = 'text'
        name = {this.props.name}
        pattern = {this.props.pattern}
        onChange = {e => this.handleValue(e.target.value)}
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
