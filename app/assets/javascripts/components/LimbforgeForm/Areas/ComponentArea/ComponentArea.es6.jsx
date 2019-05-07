class ComponentArea extends React.Component {
  renderComponents() {
    const componentOptions = [];
    if (this.props.components != undefined){
      this.props.components.map((option) => {
        componentOptions.push(
          <ComponentListItem key={option} option={option} updateMeasurementsAndTds={this.props.updateMeasurementsAndTds}/>
        );
      });
    }

    return (
      <div id="components-list" className="row">
        <div className="col-xs-12 tab-padding">
          <p className="label">Select a Component</p>
          {componentOptions}
        </div>
      </div>
    );
  }

  render() {
    var classes =  this.props.availableAreas.prosthesis.selected ? 'accordion-head active' : 'accordion-head';
    return(
      <div>
        <div onClick={()=>this.props.updateSelectedArea('prosthesis')} className={classes}>
          <h2>Configuration</h2>
          <span className="arrow"></span>
          <span className="line"></span>
        </div>
        <MeasurementDiagram
          availableAreas={this.props.availableAreas}
          updateAvailableAreas={this.props.updateAvailableAreas}
          updateSelectedArea={this.props.updateSelectedArea}
          imageURL={this.props.imageURL}
          side={this.props.side}
          amputationLevel={this.props.amputationLevel}
          measurements={this.props.measurements}
          updateDisplay={this.props.updateDisplay}
        />
        {/* add the line underneath this if you want to show component options */}
        {/* {this.props.availableAreas.prosthesis.selected ? this.renderComponents() : ''}*/}
      </div>
    )
  }
};
