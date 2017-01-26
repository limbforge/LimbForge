class MeasurementArea extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    //this.setState(nextProps);
  }

  renderMeasurementArea() {
    var C_measurements = [];
    var L_measurements = [];
    if (this.props.measurements){
      C_measurements = (
        this.props.measurements.map(function(x){
         if (x.name.charAt(0) == "C") { return x}
        }).filter(function(n){ return n != undefined })
      );
      L_measurements = (
        this.props.measurements.map(function(x){
         if (x.name.charAt(0) == "L") { return x}
        }).filter(function(n){ return n != undefined })
      );
    };

    var cMeasurementInputs = C_measurements == undefined ? "" : C_measurements.map((option) => {
      return (
        <div key={option.name}>
          <p className="label nested-label">{option.name}</p>
          <input id={option.name} type="text" onChange={this.props.updateDisplay} max={option.upper_range} min={option.lower_range} placeholder={option.lower_range + "-" + option.upper_range + option.measurement_unit.toLowerCase()} name={option.name}/>
        </div>
      );
    });
    var lMeasurementInputs = L_measurements == undefined ? "" : L_measurements.map((option) => {
      return (
        <div key={option.name}>
          <p className="label nested-label">{option.name}</p>
          <input id={option.name} type="text" onChange={this.props.updateDisplay} max={option.upper_range} min={option.lower_range} placeholder={option.lower_range + "-" + option.upper_range + option.measurement_unit.toLowerCase()} name={option.name}/>
        </div>
      );
    });

    var measurementArea = this.props.measurements === undefined ? "measurements" :
      <div>
        <div className="row">
          <div className="col-xs-12">
            <p className="label">Orientation</p>
            <select id="handedness-selector" onChange={this.props.updateDisplay}>
              <option selected="selected" value="left" key="left" >Left</option>
              <option value="right" key="right" >Right</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div>
            <p className="label measurements">Measurements (cm)</p>
            <img className="documentation" data-toggle="modal" data-target="#measurementModal" src={this.props.imageURL}/>
            <div className="col-xs-6">
              {cMeasurementInputs}
            </div>
            <div className="col-xs-6">
              {lMeasurementInputs}
            </div>
          </div>
        </div>
      </div>;

      return measurementArea;
  }

  render() {
    var classes =  this.props.availableAreas.measurements.selected ? 'accordion-head active' : 'accordion-head';

    return (
      <div onClick={()=> this.props.updateSelectedArea('measurements')} className={classes}>
        <h2>Measurements</h2>
        <span className="arrow"></span>
        <span className="line"></span>
        {this.props.availableAreas.measurements.selected ? this.renderMeasurementArea() : ''}
      </div>
    )
  }
};
