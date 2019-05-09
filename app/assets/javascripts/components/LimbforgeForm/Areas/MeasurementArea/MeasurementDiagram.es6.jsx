class MeasurementDiagram extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        validInputs: false
      }
      this.checkInputs = this.checkInputs.bind(this)
    }
    componentWillReceiveProps(nextProps) {
    }

    checkInputs(event){

      this.props.updateDisplay(event)

      console.log("check inputs")

      var check = false
      
      check = this.props.measurements.reduce((acc, cv, ci, arr)=>{
        if(acc){
          console.log("cv", cv)
          var v = this.props.specs[cv.name]
          console.log(v)
          return (cv.lower_range <= v && v <= cv.upper_range)
        }else{
          console.log("Skipped", cv)
          return false
        }
      },true)

      console.log("Check2 ",check)

      this.setState({validInputs:check})
    }
    renderMeasurementArea() {
      console.log("Render C1", this.props.specs[`C1`])
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
              updateDisplay={this.checkInputs}
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
          {//make only available if measurements are correct
          }
          <div onClick={()=>this.props.updateSelectedArea('submit')}>
            <button className="continue-submit"
            style={this.state.validInputs? {} : { background: "grey" }}
            disabled={!this.state.validInputs}
            >CONTINUE</button>
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
  