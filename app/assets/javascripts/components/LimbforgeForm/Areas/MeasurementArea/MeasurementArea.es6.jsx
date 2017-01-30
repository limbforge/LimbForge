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
      C_measurements = this.props.measurements.map(x => {
        if (x.name.charAt(0) == "C") {
          return x;
        }
      }).filter(n => {
        return n != undefined;
      });

      L_measurements = this.props.measurements.map(x => {
        if (x.name.charAt(0) == "L") {
          return x;
        }
      }).filter(n => {
        return n != undefined
      });
    };

    var cMeasurementInputs = C_measurements === undefined ? "" : C_measurements.map((option) => {
      return (
        <div key={option.name}>
          <p className="label nested-label c">{option.name}</p>
          <input id={option.name} type="text" onChange={this.props.updateDisplay} max={option.upper_range} min={option.lower_range} placeholder={option.lower_range + "-" + option.upper_range + 'cm'} name={option.name}/>
        </div>
      );
    });
    var lMeasurementInputs = L_measurements == undefined ? "" : L_measurements.map((option) => {
      return (
        <div key={option.name}>
          <p className="label nested-label l">{option.name}</p>
          <input id={option.name} type="text" onChange={this.props.updateDisplay} max={option.upper_range} min={option.lower_range} placeholder={option.lower_range + "-" + option.upper_range + 'cm'} name={option.name}/>
          <span></span>
        </div>
      );
    });
    var measurementArea = this.props.measurements === undefined ? "measurements" :
      <div className="tab-padding">
        <div className="row">
          <div>
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
      <div>
        <div onClick={()=> this.props.updateSelectedArea('measurements')} className={classes}>
          <div>
            <h2>Measurements</h2>
            <span className="arrow"></span>
          </div>
        </div>
        {this.props.availableAreas.measurements.selected ? this.renderMeasurementArea() : ''}
      </div>
    )
  }
};
