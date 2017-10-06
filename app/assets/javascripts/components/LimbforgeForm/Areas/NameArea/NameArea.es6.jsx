class NameArea extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    $( "#tags" ).autocomplete({
      source: availableCities
    });
  }
  limitDigits(num, event){
    if (event.target.value.length > num) {
      event.target.value = event.target.value.slice(0, -1);
      if (event.target.nextSibling){
        event.target.nextSibling.focus();
      }
    }
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
          <div className="fname string col-xs-6">
            <input id="lname" className="" onChange={this.props.updateDisplay} type="text" placeholder="last" name="name"/>
          </div>
          <div className="lname string col-xs-6">
            <input id="fname" className="" type="text" onChange={this.props.updateDisplay} placeholder="first" name="name"/>
          </div>
        </div>
        <div id="date" className="row">
          <div className="col-xs-12">
            <p className="nested-label">Date of Birth</p>
            <input className="col-xs-4" type="number" onChange={ (event) => this.limitDigits(2, event)} placeholder="day"/>
            <input className="col-xs-4 month-input" onChange={(event) => this.limitDigits(2, event)} type="number" placeholder="month"/>
            <input className="col-xs-4" type="number" onChange={(event) => this.limitDigits(4,event)} placeholder="year"/>
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
        <div className="row">
          <div className="col-xs-12">
            <p className="nested-label">Select Gender</p>
          </div>
        </div>
        <div id="gender-select" className="row">
          <div className="col-xs-6">
            <label>
              <input id="gender" onClick={this.props.updateDisplay} type="radio" name="fb" value="male" checked={selected_gender == "male" ? "checked" : ""}/>
              <ManTorso selected_gender={this.props.gender}/>
            </label>
          </div>
          <div className="col-xs-6">
            <label>
              <input id="gender" onClick={this.props.updateDisplay} type="radio" name="fb" value="female" checked={selected_gender == "female" ? "checked" : ""}/>
              <WomanTorso selected_gender={this.props.gender}/>
            </label>
          </div>
        </div>
        <div id="date" className="row">
          <div className="col-xs-12">
            <p className="nested-label amputation-date">Date of Amputation</p>
            <input className="col-xs-4" type="number" onChange={ (event) => this.limitDigits(2, event)} placeholder="day"/>
            <input className="col-xs-4 month-input" onChange={(event) => this.limitDigits(2, event)} type="number" placeholder="month"/>
            <input className="col-xs-4" type="number" onChange={(event) => this.limitDigits(4,event)} placeholder="year"/>
          </div>
        </div>
        <AmputationCause />
      </div>
    );
  }

  render() {
    var classes =  this.props.availableAreas.patient.selected ? 'accordion-head active' : 'accordion-head';
    return (
      <div>
        <div onClick={()=>this.props.updateSelectedArea('patient')} className={classes}>
          <h2>Patient Information</h2>
          <span className="arrow"></span>
        </div>
        {this.props.availableAreas.patient.selected ? this.renderNameArea() : ''}
        <AmputationLevelArea
          availableAreas={this.props.availableAreas}
          availableLevels={this.props.availableLevels}
          updateAvailableAreas={this.props.updateAvailableAreas}
          updateDisplay={this.props.updateDisplay}
          updateSelectedArea={this.props.updateSelectedArea}
          selectedGender={this.props.selectedGender}
          updateSpecs={this.props.updateSpecs}
          getComponents={this.props.getComponents}
          levels={this.props.levels}
          components_search_path={this.props.components_search_path}
          images={this.props.images}
          specs={this.props.specs}
        />
      </div>
    )
  }
};
