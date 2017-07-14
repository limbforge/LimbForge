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
          <h2>Prosthesis</h2>
          <span className="arrow"></span>
          <span className="line"></span>
        </div>
        {this.props.availableAreas.prosthesis.selected ? this.renderComponents() : ''}
      </div>
    )
  }
};
