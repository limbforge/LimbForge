class ComponentArea extends React.Component {
  constructor(props) {
    super(props);
  }

  renderComponents() {
    const componentOptions = [];
    if (this.props.components != undefined){
      this.props.components.map((option) => {
        componentOptions.push(
          <option value={option.id} key={option.name} >
            {option.name}
          </option>
        );
      });
    }

    const components = this.props.components === undefined ?
    "" :
    <div className="row">
      <div className="col-xs-12">
        <p className="label">Components</p>
        <select
          id="design-selector"
          onChange={event => {
            this.props.updateMeasurementsAndTds(event);
            this.props.updateAvailableAreas('measurements');
          }}>
          <option value="">Select a Design</option>
          {componentOptions}
        </select>
      </div>
    </div>;

    return components;
  }

  render() {
    var classes =  this.props.availableAreas.prosthesis.selected ? 'accordion-head active' : 'accordion-head';

    return(
      <div onClick={()=> this.props.updateSelectedArea('prosthesis')} className={classes}>
        <h2>Prosthesis</h2>
        <span className="arrow"></span>
        <span className="line"></span>
        {this.props.availableAreas.prosthesis.selected ? this.renderComponents() : ''}
      </div>
    )
  }
};
