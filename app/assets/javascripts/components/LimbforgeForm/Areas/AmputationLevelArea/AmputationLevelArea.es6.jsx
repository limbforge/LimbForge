class AmputationLevelArea extends React.Component {
  constructor(props) {
    super(props);
  }

  renderAmputationLevelArea() {
    const amputationLevelOptions = this.props.levels.map((option) => {
      return (
        <option disabled={option.name == "Transradial" ? "" : "disabled"} value={option.id} key={option.id} >
          {option.name} {option.name != "Transradial" ? "(coming soon)" : ""}
        </option>
      )
    });

    return (
      <div className="row">
        <div className="col-xs-12">
          <p className="label">Amputation Level</p>
          <select onChange={this.props.getComponents}>
            <option value="" >
              Select a level
            </option>
            {amputationLevelOptions}
          </select>
        </div>
      </div>
    );
  }

  render() {
    var classes =  this.props.showAmputationLevelArea ? 'accordion-head active' : 'accordion-head';

    return (
      <div onClick={()=>this.props.updateSelectedArea('amputation')} className={classes}>
        <h2>Amputation</h2>
        <span className="arrow"></span>
        <span className="line"></span>
        {this.props.availableAreas.amputation.selected ? this.renderAmputationLevelArea() : ''}
      </div>
    )
  }
};
