class AmputationLevelArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: 'left',
      y: 700,
      percentSelected: 100,
      areaSelected: 'transradial',
    };

    this.updatePercent = this.updatePercent.bind(this);
    this.updateOrientation = this.updateOrientation.bind(this);
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

  updateOrientation(event) {
    const orientation = event.target.value;
    this.setState({ orientation });
  }

  loadSvg() {
    const imageName = this.isSupportedAmputationLevel({ name: this.state.areaSelected }) ?
    "diagram_" + this.props.specs.gender + "_" +
    (this.state.areaSelected === '' ? 'none' : this.state.areaSelected.toLowerCase()) +
    "_" + this.state.orientation.charAt(0).toUpperCase() :
    "diagram_" + this.props.specs.gender + "_none_" + this.state.orientation.charAt(0).toUpperCase()
    const imageURL = this.props.images[imageName];

    const imageStyle = {
      pointerEvents: 'none',
      userSelect: 'none',
    };

    const yOffset = 290;
    const outerContainerStyle = {
      top: `${this.state.y - yOffset}px`,
      position: "relative",
      width: "240px",
      height: "3px",
      background: "#000000",
      zIndex: 100,
      display: 'block',
      margin: '0 auto'
    };

    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <p className="label">Orientation:</p>
            <select onChange={this.updateOrientation} value={this.state.orientation}>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>
        <MouseDragger amountScrolled={this.props.amountScrolled} updatePercent={this.updatePercent}>
          <div className="outer-drag-container" style={outerContainerStyle}></div>
          <img id="limb-select-img" style={imageStyle} src={imageURL}/>
        </MouseDragger>
      </div>
    );
  }

  updatePercent(percentSelected, y) {
    if (percentSelected !== this.state.percentSelected) {
      if (percentSelected < 19) {
        areaSelected = '';
      } else if (percentSelected < 32) {
        areaSelected = 'Shoulder Disarticulation';
      } else if (percentSelected < 52) {
        areaSelected = 'Transhumeral';
      } else if (percentSelected < 60) {
        areaSelected = 'Elbow Disarticulation';
      } else if (percentSelected < 76) {
        areaSelected = 'Transradial';
      } else if (percentSelected < 82) {
        areaSelected = 'Wrist Disarticulation';
      } else {
        areaSelected = 'Transcarpal';
      }

      this.setState({ percentSelected, y, areaSelected });
    }
  }

  loadAmutationLevelArea() {
    let levelSelected = undefined;
    const amputationLevelOptions = this.props.levels.map(level => {
      if (level.name === this.state.areaSelected) {
        levelSelected = level;
      }
      return (
        <option disabled={this.isSupportedAmputationLevel(level) ? "" : "disabled"} value={level.name} key={level.id} >
          {level.name} {this.isSupportedAmputationLevel(level) ? "" : "(coming soon)"}
        </option>
      );
    });

    const buttonStyle = levelSelected !== undefined && this.isSupportedAmputationLevel(levelSelected) ? {} : { background: "grey" };
    const buttonDisabled = levelSelected === undefined || !this.isSupportedAmputationLevel(levelSelected);
    return (
      <div className="row">
        {this.loadSvg()}
        <div className="col-xs-12">
          <p className="label">Amputation Level: {this.state.areaSelected}</p>
        </div>
        <button
          style={buttonStyle}
          onClick={() => {
            this.props.updateAvailableAreas('prosthesis');
            this.props.getComponents(levelSelected.id);
          }}
          disabled={buttonDisabled}>CONTINUE
        </button>
      </div>
    );
  }

  render() {
    const classes = this.props.availableAreas.amputation.selected ? 'accordion-head active' : 'accordion-head';

    return (
      <div>
        <div onClick={()=>this.props.updateSelectedArea('amputation')} className={classes}>
          <h2>Amputation</h2>
          <span className="arrow"></span>
          <span className="line"></span>
        </div>
        {this.props.availableAreas.amputation.selected ? this.loadAmutationLevelArea() : ""}
      </div>
    );
  }
};
