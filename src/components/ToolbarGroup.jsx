import React from 'react';
import Radium from 'radium';
import pureRender from 'pure-render-decorator';
import MatterBasics from '../utils/MatterBasics';

@Radium.Enhancer
@pureRender
@MatterBasics
export default class Toolbar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var s = _.assign({}, style.toolbarGroup, {
      flex: this.props.flex,
      width: this.props.width,
      justifyContent: this.props.justifyContent,
    });

    return <div style={s}>
      {this.props.children}
    </div>;
  }
});

module.exports = Toolbar;
