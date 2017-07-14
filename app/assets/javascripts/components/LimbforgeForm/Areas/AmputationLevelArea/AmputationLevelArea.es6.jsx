class AmputationLevelArea extends React.Component {
  constructor(props) {
    super(props);
    this.handleAreaClick = this.handleAreaClick.bind(this);
  }

  isSupportedAmputationLevel(level) {
    switch (level.toLowerCase()) {
      case 'transradial':
        return true;
      default:
        return false;
    }
  }

  loadSvg() {

    const imageName = "al_" + this.props.specs.gender + "_" + this.props.specs.amputationLevel.toLowerCase().split(' ').join('_') + "_" + this.props.specs.side.charAt(0).toUpperCase();

    const imageURL = this.props.images[imageName];
    const imageStyle = {
      pointerEvents: 'none',
      userSelect: 'none',
      marginBottom: '-55px',
      marginTop: '-20px',
      position: 'relative',
      zIndex: '-1',
    };

    const imagedivStyle = {
      marginBottom: '60px',
      minHeight: '448px',
    };
    const imagedivStyle2 = {
      marginBottom: '40px',
    };

    const selectorStyle = {
      marginBottom: '-230px',
      position: 'absolute',
      top: '83px',
    };

    const selectorStyle2 = {
      marginBottom: '-230px',
      position: 'absolute',
      top: '110',
    };

    const selectedSide = {
      background: '#1578b5',
      cursor: 'pointer',
      color: '#ffffff',
      padding: '12px',
      textAlign: 'center'
    };

    const notSelectedSide = {
      background: '#ffffff',
      cursor: 'pointer',
      color: '#000000',
      padding: '12px',
      textAlign: 'center'
    };

    const maleSelect = (
      <svg style={selectorStyle} version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 599.3 692.7">

        <rect
          onClick = { () => { this.handleAreaClick('Shoulder Disarticulation') }}
          x="-0.4" y="0.000" opacity="0.3" fill="#1578B5" width="600.1" height="118px" stroke="#ffffff" strokeWidth="5px"/>
        <circle
          onClick = { () => { this.handleAreaClick('Shoulder Disarticulation') }}
          fill={this.props.specs.amputationLevel === 'Shoulder Disarticulation' ? '#000000' : '#ffffff'}
          cx="40.6" cy="84.6" r="14"/>

        <rect
          onClick = { () => { this.handleAreaClick('Transhumeral') }}
          x="-0.4" y="117" opacity="0.3" fill="#1578B5" width="600.1" height="99" stroke="#ffffff" strokeWidth="5px"/>
        <circle
          onClick = { () => { this.handleAreaClick('Transhumeral') }}
          fill={this.props.specs.amputationLevel === 'Transhumeral' ? '#000000' : '#ffffff'}
          cx="40.6" cy="168" r="14"
        />

        <rect
          onClick = { () => { this.handleAreaClick('Elbow Disarticulation') }}
          x="-0.4" y="215" opacity="0.3" fill="#1578B5" width="600.1" height="83" stroke="#ffffff" strokeWidth="5px"/>
        <circle
          onClick = { () => { this.handleAreaClick('Elbow Disarticulation') }}
          fill={this.props.specs.amputationLevel === 'Elbow Disarticulation' ? '#000000' : '#ffffff'}
          cx="40.6" cy="258" r="14"
        />

        <rect
          onClick = { () => { this.handleAreaClick('Transradial') }}
          x="-0.4" y="297" opacity="0.3" fill="#1578B5" width="600.1" height="54" stroke="#ffffff" strokeWidth="5px"/>
        <circle
          onClick = { () => { this.handleAreaClick('Transradial') }}
          fill={this.props.specs.amputationLevel === 'Transradial' ? '#000000' : '#ffffff'}
          cx="40.6" cy="325" r="14"
        />

        <rect
          onClick = { () => { this.handleAreaClick('Wrist Disarticulation') }}
          x="0" y="351" opacity="0.3" fill="#1578B5" width="600.1" height="46" stroke="#ffffff" strokeWidth="5px"/>
        <circle
          onClick = { () => { this.handleAreaClick('Wrist Disarticulation') }}
          fill={this.props.specs.amputationLevel === 'Wrist Disarticulation' ? '#000000' : '#ffffff'}
          cx="40.6" cy="376" r="14"
        />

        <rect
          onClick = { () => { this.handleAreaClick('Transcarpal') }}
          x="-0.4" y="397" opacity="0.3" fill="#1578B5" width="600.1" height="91.4" stroke="#ffffff" strokeWidth="5px"/>
        <circle
          onClick = { () => { this.handleAreaClick('Transcarpal') }}
          fill={this.props.specs.amputationLevel === 'Transcarpal' ? '#000000' : '#ffffff'}
          cx="40.6" cy="443" r="14"
        />
      </svg>
    );

    const femaleSelect = (
      <svg style={selectorStyle2} version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 599.3 692.7">

        <rect
          onClick = { () => { this.handleAreaClick('Shoulder Disarticulation') }}
          x="-0.4" y="0.000" opacity="0.3" fill="#1578B5" width="600.1" height="102px" stroke="#ffffff" strokeWidth="5px"/>
        <circle
          onClick = { () => { this.handleAreaClick('Shoulder Disarticulation') }}
          fill={this.props.specs.amputationLevel === 'Shoulder Disarticulation' ? '#000000' : '#ffffff'}
          cx="40.6" cy="54" r="14"/>

        <rect
          onClick = { () => { this.handleAreaClick('Transhumeral') }}
          x="-0.4" y="101" opacity="0.3" fill="#1578B5" width="600.1" height="90px" stroke="#ffffff" strokeWidth="5px"/>
        <circle
          onClick = { () => { this.handleAreaClick('Transhumeral') }}
          fill={this.props.specs.amputationLevel === 'Transhumeral' ? '#000000' : '#ffffff'}
          cx="40.6" cy="147" r="14"
        />

        <rect
          onClick = { () => { this.handleAreaClick('Elbow Disarticulation') }}
          x="-0.4" y="190" opacity="0.3" fill="#1578B5" width="600.1" height="56.4" stroke="#ffffff" strokeWidth="5px"/>
        <circle
          onClick = { () => { this.handleAreaClick('Elbow Disarticulation') }}
          fill={this.props.specs.amputationLevel === 'Elbow Disarticulation' ? '#000000' : '#ffffff'}
          cx="40.6" cy="218" r="14"
        />

        <rect
          onClick = { () => { this.handleAreaClick('Transradial') }}
          x="-0.4" y="246" opacity="0.3" fill="#1578B5" width="600.1" height="56" stroke="#ffffff" strokeWidth="5px"/>
        <circle
          onClick = { () => { this.handleAreaClick('Transradial') }}
          fill={this.props.specs.amputationLevel === 'Transradial' ? '#000000' : '#ffffff'}
          cx="40.6" cy="275" r="14"
        />

        <rect
          onClick = { () => { this.handleAreaClick('Wrist Disarticulation') }}
          x="-0.4" y="301" opacity="0.3" fill="#1578B5" width="600.1" height="38" stroke="#ffffff" strokeWidth="5px"/>
        <circle
          onClick = { () => { this.handleAreaClick('Wrist Disarticulation') }}
          fill={this.props.specs.amputationLevel === 'Wrist Disarticulation' ? '#000000' : '#ffffff'}
          cx="40.6" cy="320" r="14"
        />

        <rect
          onClick = { () => { this.handleAreaClick('Transcarpal') }}
          x="-0.4" y="338" opacity="0.3" fill="#1578B5" width="600.1" height="91.4" stroke="#ffffff" strokeWidth="5px"/>
        <circle
          onClick = { () => { this.handleAreaClick('Transcarpal') }}
          fill={this.props.specs.amputationLevel === 'Transcarpal' ? '#000000' : '#ffffff'}
          cx="40.6" cy="385" r="14"
        />
      </svg>
    );

    var genderSelect = this.props.selectedGender == "male" ? maleSelect : femaleSelect;

    return (
      <div>
        <div className="col-xs-12">
          <div id="sides" className="row">
            <form action="">
              <div className="label col-xs-4">
                <p className="label">SIDE:</p>
              </div>
              <div className="col-xs-4" value="left">
                <div id="side" className="row" value="left" onClick={this.props.updateDisplay} style={this.props.specs.side === "left" ? selectedSide : notSelectedSide }>Left</div>
              </div>
              <div value="right" className="col-xs-4" onClick={this.props.updateDisplay}>
                <div id="side" className="row" value="right" onClick={this.props.updateDisplay} style={this.props.specs.side === "right" ? selectedSide : notSelectedSide}>Right</div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-xs-12" style={this.props.specs.gender == "male" ? imagedivStyle : imagedivStyle2}>
          <p className="label amputation">Select Amputation Level</p>
          <img id="limb-select-img" style={imageStyle} src={imageURL}/>
          {genderSelect}
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
      <div id="AmputationLevel" className="row tab-padding">
        {this.loadSvg()}
        <div className="col-xs-12">
          <p>{this.props.specs.amputationLevel}</p>
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
