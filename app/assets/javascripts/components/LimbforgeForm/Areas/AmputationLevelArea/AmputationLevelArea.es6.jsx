class AmputationLevelArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      y: 700,
      percentSelected: 100,
    };

    this.updatePercent = this.updatePercent.bind(this);
    this.updateOrientation = this.updateOrientation.bind(this);
  }

  isSupportedAmputationLevel(level) {
    switch (level.toLowerCase()) {
      case 'transradial':
      case 'transhumeral':
        return true;
      default:
        return false;
    }
  }

  updateOrientation(event) {
    const orientation = event.target.value;
    if (this.props.specs.orientation !== orientation) {
      const newSpecs = this.props.specs;
      newSpecs.orientation = orientation;
      this.props.updateSpecs(newSpecs);
    }
  }

  loadSvg() {
    const imageName = this.isSupportedAmputationLevel(this.props.specs.amputationLevel) ?
    "diagram_" + this.props.specs.gender + "_" +
    (this.props.specs.amputationLevel === '' ? 'none' : this.props.specs.amputationLevel.toLowerCase()) +
    "_" + this.props.specs.orientation.charAt(0).toUpperCase() :
    "diagram_" + this.props.specs.gender + "_none_" + this.props.specs.orientation.charAt(0).toUpperCase()
    const imageURL = this.props.images[imageName];

    const imageStyle = {
      pointerEvents: 'none',
      userSelect: 'none',
      marginBottom: '-25px'
    };

    const yOffset = 160;
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

    const outerContainerArrowStyle= {
      position: "relative",
      top: `${this.state.y - (yOffset + 115)}px`,
      zIndex: 100,
      left: "265px",
      width: "30px",
      display: "inline-block",
      height: "30px",
      backgroundColor: "black"
    };

    return (
      <div>
          <div className="col-xs-12">
            <p className="label">Orientation:</p>
            <select onChange={this.updateOrientation} value={this.props.specs.orientation}>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
        <MouseDragger amountScrolled={this.props.amountScrolled} updatePercent={this.updatePercent}>
          <div className="outer-drag-container" style={outerContainerStyle}></div>
          <div className="outer-drag-container-arrow" style={outerContainerArrowStyle}></div>
          <img id="limb-select-img" style={imageStyle} src={imageURL}/>
        </MouseDragger>
      </div>
    );
  }

  updatePercent(percentSelected, y) {
    let areaSelected;
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

      this.setState({ percentSelected, y });
      if (this.props.specs.amputationLevel !== areaSelected) {
        const newSpecs = this.props.specs;
        newSpecs.amputationLevel = areaSelected;
        this.props.updateSpecs(newSpecs);
      }
    }
  }

  loadAmutationLevelArea() {
    let levelSelected = undefined;
    const amputationLevelOptions = this.props.levels.map(level => {
      if (level.name === this.props.specs.amputationLevel) {
        levelSelected = level;
      }
      return (
        <option disabled={this.isSupportedAmputationLevel(level.name) ? "" : "disabled"} value={level.name} key={level.id} >
          {level.name} {this.isSupportedAmputationLevel(level.name) ? "" : "(coming soon)"}
        </option>
      );
    });

    const buttonStyle = levelSelected !== undefined && this.isSupportedAmputationLevel(levelSelected.name) ? {} : { background: "grey" };
    const buttonDisabled = levelSelected === undefined || !this.isSupportedAmputationLevel(levelSelected.name);
    return (
      <div className="row">
        {this.loadSvg()}
        <div className="col-xs-12">
          <p className="label">Amputation Level: {this.props.specs.amputationLevel}</p>
          <button
            style={buttonStyle}
            onClick={() => {
              this.props.updateAvailableAreas('prosthesis');
              this.props.getComponents(levelSelected.id);
            }}
            disabled={buttonDisabled}>CONTINUE
          </button>
        </div>
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
        </div>
        {this.props.availableAreas.amputation.selected ? this.loadAmutationLevelArea() : ""}
      </div>
    );
  }
};
