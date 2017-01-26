class AmputationLevelArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      y: 0,
      percentSelected: 0,
      areaSelected: '',
    };

    this.updatePercent = this.updatePercent.bind(this);
  }

  isSupportedAmputationLevel(level) {
    switch (level.name.toLowerCase()) {
      case 'transradial':
      case 'transhumeral':
        return true;
      default:
        return false;
    }
  }

  loadSvg() {
    const imageName = "diagram_" + this.props.specs.gender + "_" + this.props.specs.amputation_level + "_" + this.props.specs.orientation.charAt(0).toUpperCase();
    const imageURL = this.props.images[imageName];
    const imageStyle = {
      pointerEvents: 'none',
      userSelect: 'none',
    };

    const outerContainerStyle = {
      top: `${this.state.y - 190}px`,
      position: "relative",
      width: "240px",
      height: "3px",
      background: "#000000",
      zIndex: 100,
      display: 'block',
      margin: '0 auto'
    };

    return (
      <MouseDragger amountScrolled={this.props.amountScrolled} updatePercent={this.updatePercent}>
        <div className="outer-drag-container" style={outerContainerStyle}></div>
        <img id="limb-select-img" style={imageStyle} src={imageURL}/>
      </MouseDragger>
    );
  }

  updatePercent(percentSelected, y) {
    if (percentSelected !== this.state.percentSelected) {
      if (percentSelected < 10) {
        areaSelected = '';
      } else if (percentSelected < 20) {
        areaSelected = 'Shoulder Disarticulation';
      } else if (percentSelected < 40) {
        areaSelected = 'Transhumeral';
      } else if (percentSelected < 60) {
        areaSelected = 'Elbow Disarticulation';
      } else if (percentSelected < 70) {
        areaSelected = 'Transradial';
      } else if (percentSelected < 80) {
        areaSelected = 'Wrist Disarticulation';
      } else {
        areaSelected = 'Transcarpal';
      }

      this.setState({ percentSelected, y, areaSelected });
    }
  }

  loadAmutationLevelArea() {
    const amputationLevelOptions = this.props.levels.map(level => {
      return (
        <option disabled={this.isSupportedAmputationLevel(level) ? "" : "disabled"} value={level.name} key={level.id} >
          {level.name} {this.isSupportedAmputationLevel(level) ? "" : "(coming soon)"}
        </option>
      );
    });

    return (
      <div className="row">
        {this.loadSvg()}
        <div className="col-xs-12">
          <p className="label">Amputation Level</p>
          <select onChange={this.props.getComponents} value={this.state.areaSelected}>
            <option value="" >
              Select a level
            </option>
            {amputationLevelOptions}
          </select>
        </div>
        // continue button should be grey if the feature is "coming soon"
        <button onClick={() => {this.props.updateAvailableAreas('prosthesis')}}>CONTINUE</button>
      </div>
    );
  }

  render() {
    const classes = this.props.availableAreas.amputation.selected ? 'accordion-head active' : 'accordion-head';

    return (
      <div className={classes}>
        <h2>Amputation</h2>
        <span className="arrow"></span>
        <span className="line"></span>
        {this.props.availableAreas.amputation.selected ? this.loadAmutationLevelArea() : ""}
      </div>
    );
  }
};
