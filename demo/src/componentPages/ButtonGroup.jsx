var React = require('react');
var Template = require('./utils/Template.jsx');

var description = `
label: String`;

var code = `return <ButtonGroup>
  <Button label='first'/>
  <Button label='secound'/>
  <Button label='third' kind='colored'/>
  <Button label='fourth'/>
</ButtonGroup>;`;

module.exports = React.createClass({
  render() {

    return <Template
      title='ButtonGroup'
      description={description}
      code={code}/>;
  },
});