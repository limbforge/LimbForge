class AmputationLevelArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      y: 700,
      percentSelected: 100,
    };

    this.updatePercent = this.updatePercent.bind(this);
    this.updateOrientation = this.updateOrientation.bind(this);
    this.handleAreaClick = this.handleAreaClick.bind(this);
  }

  handleAreaClick(area) {
    console.log('woo!', area);
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

    const imageName = "al_" + this.props.specs.gender + "_" + this.props.specs.amputationLevel.toLowerCase().split(' ').join('_') + "_" + this.props.specs.orientation.charAt(0).toUpperCase();

    const imageURL = this.props.images[imageName];
    const imageStyle = {
      pointerEvents: 'none',
      userSelect: 'none',
      marginBottom: '-25px'
    };

    const selectorStyle = {
      marginBottom: '-25px',
      position: 'relative',
      top: '-330px',
    };

    return (
      <div>
          <div className="col-xs-12">
            <p className="label">Orientation:</p>
            <select onChange={this.updateOrientation} value={this.props.specs.orientation}>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
            <p className="label">Select Amputation Level</p>
          </div>
        <div>
          <img id="limb-select-img" style={imageStyle} src={imageURL}/>
          <svg style={selectorStyle} version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 599.3 692.7">
            <rect onClick = { () => { this.handleAreaClick(1) }} y="175.8" opacity="0.3" fill="#1578B5" width="600.1" height="201.1"/>
            <rect onClick = { () => { this.handleAreaClick(2) }} id="al_select_2" x="-0.4" y="376.9" opacity="0.4" fill="#1578B5" width="600.1" height="57.3"/>
            <rect onClick = { () => { this.handleAreaClick(3) }} id="al_select_3" x="-0.4" y="434.3" opacity="0.5" fill="#1578B5" width="600.1" height="122.5"/>
            <rect onClick = { () => { this.handleAreaClick(4) }} id="al_select_4" y="556.8" opacity="0.6" fill="#1578B5" width="600.1" height="44.6"/>
            <rect onClick = { () => { this.handleAreaClick(5) }} id="al_select_5" x="-0.4" y="601.3" opacity="0.7" fill="#1578B5" width="600.1" height="91.4"/>
            <circle fill="none" stroke="#000000" strokeMiterlimit="10" cx="40.6" cy="647" r="16.1"/>
            <circle fill="none" stroke="#000000" strokeMiterlimit="10" cx="40.6" cy="579" r="16.1"/>
            <circle stroke="#000000" strokeMiterlimit="10" cx="40.6" cy="495.8" r="16.1"/>
            <circle fill="none" stroke="#000000" strokeMiterlimit="10" cx="40.6" cy="405.6" r="16.1"/>
            <circle fill="none" stroke="#000000" strokeMiterlimit="10" cx="40.6" cy="276.4" r="16.1"/>
            <circle fill="none" stroke="#000000" strokeMiterlimit="10" cx="40.6" cy="84.6" r="16.1"/>
          </svg>
        </div>
      </div>
    );
  }

  updatePercent(percentSelected, y) {
    let areaSelected;
    if (percentSelected !== this.state.percentSelected) {
      if (percentSelected < 21) {
        areaSelected = '';
      } else if (percentSelected < 30) {
        areaSelected = 'Shoulder Disarticulation';
      } else if (percentSelected < 51) {
        areaSelected = 'Transhumeral';
      } else if (percentSelected < 58) {
        areaSelected = 'Elbow Disarticulation';
      } else if (percentSelected < 70) {
        areaSelected = 'Transradial';
      } else if (percentSelected < 76) {
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
      <div className="row tab-padding">
        {this.loadSvg()}
        <div className="col-xs-12">
          <p className="label">Selected Level: </p>
          <p><strong>{this.props.specs.amputationLevel}</strong></p>
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
