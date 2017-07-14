class NameArea extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    $( "#tags" ).autocomplete({
      source: availableCities
    });
  }

  renderNameArea() {
    var selected_gender = this.props.gender;

    return (
      <div className="tab-padding">
        <div className="row">
          <div className="col-xs-12">
            <p className="nested-label">Patient Name</p>
          </div>
        </div>
        <div className="row">
          <div className="fname col-xs-6">
            <input id="fname" type="text" placeholder="First" name="name"/>
          </div>
          <div className="lname col-xs-6">
            <input id="lname" type="text" placeholder="Last" name="name"/>
          </div>
        </div>
        <AmputationCause />
        <div className="row">
          <div className="col-xs-12">
            <p className="nested-label">Select Gender</p>
          </div>
        </div>
        <div id="gender-select" className="row">
          <div className="col-xs-6">
            <label>
              <input id="gender" onChange={this.props.updateDisplay} type="radio" name="fb" value="male" checked={selected_gender == "male" ? "checked" : ""}/>
              <img  width="130px" height="172px" src={selected_gender == "male" ? this.props.man_diagram_selected : this.props.man_diagram }/>
            </label>
          </div>
          <div className="col-xs-6">
            <label>
              <input id="gender" onChange={this.props.updateDisplay} type="radio" name="fb" value="female" checked={selected_gender == "female" ? "checked" : ""}/>
              <img width="130px" height="172px" src={selected_gender == "female" ? this.props.woman_diagram_selected : this.props.woman_diagram  }/>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <p className="nested-label">Date of Amputation</p>
            <input type="text" data-provide='datepicker' />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <p className="nested-label">City of Residence</p>
          </div>
        </div>
        <div className="ui-widget">
          <input id="tags" />
        </div>
        <button style={{cursor: "pointer"}} onClick={() => {this.props.updateAvailableAreas('amputation')}}>CONTINUE</button>
      </div>
    );
  }

  render() {
    var classes =  this.props.availableAreas.patient.selected ? 'accordion-head active' : 'accordion-head';
    return (
      <div>
        <div onClick={()=>this.props.updateSelectedArea('patient')} className={classes}>
          <h2>Patient</h2>
          <span className="arrow"></span>
        </div>
        {this.props.availableAreas.patient.selected ? this.renderNameArea() : ''}
      </div>
    )
  }
};
