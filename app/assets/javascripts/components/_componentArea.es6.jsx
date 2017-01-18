class ComponentArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var classes =  this.props.showComponentArea ? 'accordion-head active' : 'accordion-head';
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
    var components = <div></div>;
    if (this.props.showComponentArea){
      components = this.props.components == undefined ? "" :
        <div className="row">
          <div className="col-xs-12">
            <p className="label">Components</p>
            <select id="design-selector" onChange={this.props.updateMeasurementsAndTds}>
              <option value="">Select a Design</option>
              {componentOptions}
            </select>
          </div>
        </div>;
    };

    return(
      <div className={classes}>
        <h2>Prosthesis</h2>
        <span className="arrow"></span>
        <span className="line"></span>
        {components}
      </div>
    )
  }
};
