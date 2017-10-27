class MeasurementDiagram extends React.Component {
    constructor(props) {
      super(props);
    }
    componentWillReceiveProps(nextProps) {
    }
    renderMeasurementArea() {
      var transradial_measurements = [
        {
          lower_range: 18,
          measurement_unit: "cm",
          name: "L1",
          step: 0.5,
          upper_range: 32,
        },
        {
          lower_range: 20,
          measurement_unit: "cm",
          name: "L2",
          step: 0.5,
          upper_range: 28,
        },
        {
          lower_range: 13,
          measurement_unit: "cm",
          name: "L4",
          step: 0.5,
          upper_range: 19,
        },
        {
          lower_range: 20,
          measurement_unit: "cm",
          name: "C4",
          step: 0.5,
          upper_range: 28,
        },
        {
          lower_range: 20,
          measurement_unit: "cm",
          name: "C3",
          step: 0.5,
          upper_range: 28,
        },
        {
          lower_range: 20,
          measurement_unit: "cm",
          name: "C2",
          step: 0.5,
          upper_range: 28,
        },
        {
          lower_range: 14,
          measurement_unit: "cm",
          name: "C1",
          step: 0.5,
          upper_range: 18,
        },
      ];
      var C_measurements = [];
      var L_measurements = [];
      C_measurements = transradial_measurements.map(x => {
        if (x.name.charAt(0) == "C") {
          return x;
        }
      }).filter(n => {
        return n != undefined;
      });
  
      L_measurements = transradial_measurements.map(x => {
        if (x.name.charAt(0) == "L") {
          return x;
        }
      }).filter(n => {
        return n != undefined
      });
  
      var cMeasurementInputs = C_measurements === undefined ? "" : C_measurements.map((option) => {
        return (
          <div key={option.name}>
            <p className="label nested-label measurement-icon c">{option.name}</p>
            <div className="measurement-container string">
              <input id={option.name} className={this.props.side + " " + this.props.amputationLevel} type="integer" onChange={this.props.updateDisplay} max={option.upper_range} min={option.lower_range} placeholder={"XX.X cm"} name={option.name}/>
            </div>
          </div>
        );
      });
      var lMeasurementInputs = L_measurements == undefined ? "" : L_measurements.map((option) => {
        return (
          <div key={option.name}>
            <p className="label nested-label measurement-icon l">{option.name}</p>
            <div className="measurement-container string">
              <input id={option.name} className={this.props.side + " " + this.props.amputationLevel} type="integer" onChange={this.props.updateDisplay} max={option.upper_range} min={option.lower_range} placeholder={"XX.X cm"} name={option.name}/>
            </div>
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
  