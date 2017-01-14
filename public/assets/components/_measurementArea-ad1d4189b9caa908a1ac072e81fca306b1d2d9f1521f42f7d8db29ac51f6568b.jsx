class MeasurementArea extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    //this.setState(nextProps);
  }
  render() {
    debugger;
    var measurementInputs = this.props.measurements == undefined ? "" : this.props.measurements.map((option) => {
      return (
        <div key={option.name} className="col-xs-6">
          <p className="label nested-label">{option.name}</p>
          <input id={option.name} type="text" onChange={this.props.updateDisplay} max={option.upper_range} min={option.lower_range} placeholder={option.lower_range + "-" + option.upper_range + option.measurement_unit.toLowerCase()} name={option.name}/>
        </div>
      );
    });

    var measurementArea = this.props.measurements == undefined ? "" :
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
            {measurementInputs}
          </div>
        </div>
      </div>;

    return (
      <div>
        {measurementArea}
      </div>
    )
  }
};
