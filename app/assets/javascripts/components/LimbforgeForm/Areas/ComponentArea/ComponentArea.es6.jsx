class ComponentArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var classes =  this.props.availableAreas.prosthesis.selected ? 'accordion-head active' : 'accordion-head';
    const componentOptions = [];
    if (this.props.components != undefined){
      this.props.components.map((option) => {
        componentOptions.push(
          <div className="device"  onClick={() => this.props.updateMeasurementsAndTds(option.id)} value={option.id} key={option.name}>
            <div className="device-img" style={{ backgroundImage: 'url(' + option.icon + ")" }}></div>
            <h2>{option.name}</h2>
            <p className="description">{option.description}</p>
            <div className="meta">
              <p><strong>by:</strong> {option.creator} </p>
              <p><strong>uses:</strong> {option.uses} </p>
              <p><strong>type:</strong> {option.component_type} </p>
              <p><strong>weight:</strong> {option.weight} </p>
              <p><strong>printTime:</strong> {option.print_time} </p>
            </div>
          </div>
        );
      });
    }
    var components = <div></div>;
    if (this.props.availableAreas.prosthesis.selected){
      components = this.props.components == undefined ? "" :
        <div className="row">
          <div className="col-xs-12 tab-padding">
            <p className="label">Select a Component</p>
            {componentOptions}
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
