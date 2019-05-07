class MeasurementDiagram extends React.Component {
    constructor(props) {
      super(props);
    }
    componentWillReceiveProps(nextProps) {
    }
    renderMeasurementArea() {

      var C_measurements = [];
      var L_measurements = [];
      var measurements = [];
      //make sure measurements have been defined
      if(this.props.measurements){
        measurements = this.props.measurements
      }
      C_measurements = measurements.map(x => {
        if (x.name.charAt(0) == "C") {
          return x;
        }
      }).filter(n => {
        return n != undefined;
      });
  
      L_measurements = measurements.map(x => {
        if (x.name.charAt(0) == "L") {
          return x;
        }
      }).filter(n => {
        return n != undefined
      });

      //can probably add initial range check here
      var cMeasurementInputs = C_measurements === undefined ? "" : C_measurements.map((option) => {
        return (
          <div key={option.name}>
            <p className="label nested-label measurement-icon c">{option.name}</p>
            <MeasurementInput
              name={option.name}
              side = {this.props.side}
              amputationLevel={this.props.amputationLevel}
              updateDisplay={this.props.updateDisplay}
              max = {option.upper_range}
              min = {option.lower_range}
            />
          </div>
        );
      });
      var lMeasurementInputs = L_measurements == undefined ? "" : L_measurements.map((option) => {
        return (
          <div key={option.name}>
            <p className="label nested-label measurement-icon l">{option.name}</p>
            <MeasurementInput
              name={option.name}
              side = {this.props.side}
              amputationLevel={this.props.amputationLevel}
              updateDisplay={this.props.updateDisplay}
              max = {option.upper_range}
              min = {option.lower_range}
            />
          </div>
        );
      });
      var style = {
        height: '488px'
      };
      var measurementArea = 
        <div id="measurements" className="tab-padding" style={style}>
          <div className="row">
            <div style={style}>
              <img className="documentation" data-target="#measurementModal" src={this.props.imageURL}/>
              <div className="col-xs-6">
                {cMeasurementInputs}
              </div>
              <div className="col-xs-6">
                {lMeasurementInputs}
              </div>
            </div>
          </div>
          <div onClick={()=>this.props.updateSelectedArea('submit')}>
            <button className="continue-submit">CONTINUE</button>
          </div>
        </div>;
  
        return measurementArea;
    }
  
    render() {
      var classes =  this.props.availableAreas.prosthesis.selected ? 'accordion-head active' : 'accordion-head';
      return (
        <div>
          {this.props.availableAreas.prosthesis.selected ? this.renderMeasurementArea() : ''}
        </div>
      )
    }
  };
  