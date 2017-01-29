class AmputationLevelArea extends React.Component {
  constructor(props) {
    super(props);
    this.updateOrientation = this.updateOrientation.bind(this);
    this.handleAreaClick = this.handleAreaClick.bind(this);
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
      marginBottom: '-75px'
    };

    const imagedivStyle = {
      marginBottom: '-300px'
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
        <div style={imagedivStyle}>
          <img id="limb-select-img" style={imageStyle} src={imageURL}/>
          <svg style={selectorStyle} version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 599.3 692.7">
            <rect onClick = { () => { this.handleAreaClick('Shoulder Disarticulation') }} x="-0.4" y="0.000" opacity="0.2" fill="#1578B5" width="600.1" height="175.8"/>
            <rect onClick = { () => { this.handleAreaClick('Transhumeral') }}             x="-0.4" y="175.8" opacity="0.3" fill="#1578B5" width="600.1" height="201.1"/>
            <rect onClick = { () => { this.handleAreaClick('Elbow Disarticulation') }}    x="-0.4" y="376.9" opacity="0.4" fill="#1578B5" width="600.1" height="57.3"/>
            <rect onClick = { () => { this.handleAreaClick('Transradial') }}              x="-0.4" y="434.3" opacity="0.5" fill="#1578B5" width="600.1" height="122.5"/>
            <rect onClick = { () => { this.handleAreaClick('Wrist Disarticulation') }}    x="-0.4" y="556.8" opacity="0.6" fill="#1578B5" width="600.1" height="44.6"/>
            <rect onClick = { () => { this.handleAreaClick('Transcarpal') }}              x="-0.4" y="601.3" opacity="0.7" fill="#1578B5" width="600.1" height="91.4"/>
            <circle
              fill={this.props.specs.amputationLevel === 'Shoulder Disarticulation' ? '#000000' : 'none'}
              stroke="#000000"
              strokeMiterlimit="10"
              cx="40.6"
              cy="84.6"
              r="16.1"
            />
            <circle
              fill={this.props.specs.amputationLevel === 'Transhumeral' ? '#000000' : 'none'}
              stroke="#000000"
              strokeMiterlimit="10"
              cx="40.6"
              cy="276.4"
              r="16.1"
            />
            <circle
              fill={this.props.specs.amputationLevel === 'Elbow Disarticulation' ? '#000000' : 'none'}
              stroke="#000000"
              strokeMiterlimit="10"
              cx="40.6"
              cy="405.6"
              r="16.1"
            />
            <circle
              fill={this.props.specs.amputationLevel === 'Transradial' ? '#000000' : 'none'}
              stroke="#000000"
              strokeMiterlimit="10"
              cx="40.6"
              cy="495.8"
              r="16.1"
            />
            <circle
              fill={this.props.specs.amputationLevel === 'Wrist Disarticulation' ? '#000000' : 'none'}
              stroke="#000000"
              strokeMiterlimit="10"
              cx="40.6"
              cy="579"
              r="16.1"
            />
            <circle
              fill={this.props.specs.amputationLevel === 'Transcarpal' ? '#000000' : 'none'}
              stroke="#000000"
              strokeMiterlimit="10"
              cx="40.6"
              cy="647"
              r="16.1"
            />
          </svg>
        </div>
      </div>
    );
  }

  handleAreaClick(area) {
    if (this.props.specs.amputationLevel !== area) {
      const newSpecs = this.props.specs;
      newSpecs.amputationLevel = area;
      this.props.updateSpecs(newSpecs);
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
