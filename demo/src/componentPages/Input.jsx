var React = require('react/addons');
var Template = require('./utils/Template.jsx');

global.fakeNames = `Yadira Smith,Meggie Wolf PhD,Hermina Trantow,Mrs. Gladys Heathcote,Mekhi Mann,Maida Veum,Makenzie Abshire,Loyal Raynor,Brisa Okuneva,Mariela McKenzie,Elise Auer,Eleonore Sipes,Libbie Labadie,Darrel Toy,Rylee McLaughlin,Kara Schiller,Sophie Rogahn,Alivia Huels,Brennon VonRueden,Efren Ankunding,Queenie Waters,Myrtis Kris II,Vaughn Nolan,Terrence Emard,Ahmed Vandervort,Cassandre Schmitt DDS,Walter Goodwin Jr.,Mattie Carroll,Mr. Cortney Gulgowski,Waino Schumm,Mr. Mark Gleason,Hailee Parker,Mathias Gottlieb Sr.,Santino Greenholt I,Ms. Archibald Tromp,Matilda Padberg,Domingo Marks,Lonny Ernser,Nicolette Douglas,Gavin Prosacco,Irving Abshire,Meaghan O'Kon,Israel Prohaska,Ms. Carmella Lemke,Marta Moore IV,Kim Daniel,Rafael Dare,Ettie Runolfsson,Nils Mayert,Dawson Lind,Deron Larkin,Barrett Walter,Reece Ziemann,Vella Waelchi,Dewitt Thompson,D'angelo Davis,Edgar Kassulke,Daisy Senger,Michele Homenick IV,Amelie Halvorson DDS,Pattie Davis,Marisa Dooley,Arlene Bergstrom,Adah Konopelski,Eleonore Beahan,Maya Schultz,Osbaldo Jaskolski,Elenora Greenholt,Ambrose Runolfsdottir,Sammy Fritsch,Bettye Bogan,Lilly Block,Lila Roberts,Marion Ferry,Leon Mills,Ladarius Hand,Estell Bernhard I,Dr. Shany Kirlin,Janet Reynolds,Lyric Hilll,Maude Fritsch,Fredrick McLaughlin,Natalie Dooley,Adrien Champlin,Kenyon Boyer,Mariela Rice,Kirsten Howell III,Miss Kasey Dickinson,Salvador Abbott,Albin McClure,Ms. Cole Dare,Odell Herzog,Janessa O'Conner,Vivien Schaefer,Natalie Hagenes,King Hahn,Shanny Jaskolski,Nyah Quitzon,Joan Brekke,Guy Windler,Tess Hackett,Roman Strosin,Kobe Fisher V,Miss Leopold Kuphal,Ona Larkin,Jensen Schulist,Eldred Thiel,Dock Miller,Kira Medhurst,Molly DuBuque IV,Amalia Bernier,Murray Ratke,Brooklyn Funk,Deborah Hoeger,Mrs. Pietro Stanton,Alene Robel,Montana Parker,Destany Runte,Antonina Blick III,Chelsea Wisozk,Allie White,Roxane Ankunding,Laurine Olson`.split(',');

// gloabl.ValueRefresher = React.createClass({
//   getInitialState() {
//     var state = {};
//
//
//
//   },
//   render() {
//
//     React.Children.map(this.props.children, (child, idx) => {
//
//       return React.addons.cloneWithProps(child, {
//         onChange(value) {this.setState({[idx]: value})}
//       });
//     });
//
//     return {
//       <div>{children}</div>
//     }
//   }
// })

var description = `
label: String`;

var codes = [

`<Input
  value={4}
  addonIcon='github'
  addonBackground='transparent'
  validate={v => parseInt(v) !== 4}
  onChange={v=>console.log(v)}/>`,

`<Input
  value={4}
  type='number'/>`,

`<Input
  placeholder='typeahead'
  hints={fakeNames}/>`,

`(() => {
var App = React.createClass({
  getInitialState() {
    return {unit: 'px'}
  },
  handleAddonClick() {
    var unit = this.state.unit === 'px' ? '%' : 'px'
    this.setState({unit})
  },
  render() {
    return <Input
      value={44}
      addonLabel={this.state.unit}
      addonOnClick={this.handleAddonClick}/>
  }
});

return <App/>
})()`,

`<MultiTypeInput types={[
    {
      type: 'number',
      addonLabel: 'px',
    },
    {
      type: 'number',
      addonLabel: '%',
      prepareExportValue: value => value + '%',
    },
    {
      type: 'string',
      addonIcon: 'quote-right',
      hints: ['auto', 'inherits'],
    },
  ]}
  value='32'
  chooseType = {value => {
    if (_.isFinite(value) || _.endsWith(value, 'px')) return 0;
    else if (_.endsWith(value, '%')) return 1;
    else return 2;
  }}
  onChange = {value => console.log(value)}/>`,
];

module.exports = React.createClass({
  render() {

    return <Template
      title='ButtonGroup'
      description={description}
      codes={codes}/>;
  },
});