class AmputationLevelArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const amputationLevelOptions = this.props.levels.map((option) => {
      return (
        <option disabled={option.name == "Transradial" ? "" : "disabled"} value={option.id} key={option.id} >
          {option.name} {option.name != "Transradial" ? "(coming soon)" : ""}
        </option>
      )
    });
    var amputationLevelArea = <div></div>

    if (this.props.showAmputationLevelArea){
      amputationLevelArea = (
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

    return (
      <div>
        {amputationLevelArea}
      </div>
    )
  }
};
