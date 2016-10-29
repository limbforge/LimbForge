class AmputationLevelArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const amputationLevelOptions = this.props.levels.map((option) => {
      return (
        <option disabled={option.name == "20-80% Transradial" ? "" : "disabled"} value={option.id} key={option.id} >
          {option.name} {option.name != "20-80% Transradial" ? "(coming soon)" : ""}
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
    )
  }
};
