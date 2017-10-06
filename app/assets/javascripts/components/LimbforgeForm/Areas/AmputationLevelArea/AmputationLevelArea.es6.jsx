class AmputationLevelArea extends React.Component {
  constructor(props) {
    super(props);
    this.handleAreaClick = this.handleAreaClick.bind(this);
  }

  isSupportedAmputationLevel(level) {
    var levelSlug = level.toLowerCase().replace(/\s/g, '');
    var hasDevices = this.props.availableLevels ? this.props.availableLevels.filter(function(n){ return n['slug'] == levelSlug })[0] : '';
    return hasDevices['has_devices'];
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

    const imageStyleFemale = {
      pointerEvents: 'none',
      userSelect: 'none',
      marginBottom: '-93px',
      marginTop: '-59px',
      position: 'relative',
      zIndex: '-1',
    }

    const imagedivStyle = {
      minHeight: '448px',
    };
    const imagedivStyle2 = {
      marginBottom: '40px',
    };

    const selectorStyle = {
      marginBottom: '-230px',
      position: 'absolute',
      top: '69px',
    };

    const selectorStyle2 = {
      marginBottom: '-230px',
      position: 'absolute',
      top: '69px',
    };

    const selectedSide = {
      background: '#357dc1',
      cursor: 'pointer',
      color: '#ffffff',
      fontSize: '13px',
      padding: '12px',
      textAlign: 'center'
    };

    const notSelectedSide = {
      background: '#bfbfbf',
      cursor: 'pointer',
      color: '#ffffff',
      fontSize: '13px',
      padding: '12px',
      textAlign: 'center'
    };
    var rectangleStyleDefault = "#bfbfbf";
    var rectangleStyleHover = "#6c9bb9";
    var rectangleStyleSelected = "#207fd3";
    const maleSelect = (
      <svg style={selectorStyle} version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 599.3 692.7">
        <circle
          onClick = { () => { this.handleAreaClick('Shoulder Disarticulation') }}
          fill={this.props.specs.amputationLevel === 'Shoulder Disarticulation' ? '#207fd3' : '#ffffff'}
          stroke='#357dc1'
          strokeWidth="1px"
          cx="40.6" cy="84.6" r="14"/>
        <rect
          onClick = { () => { this.handleAreaClick('Shoulder Disarticulation') }}
          x="-0.4" y="0.000" opacity="0.3" fill={this.props.specs.amputationLevel === 'Shoulder Disarticulation' ? rectangleStyleSelected : rectangleStyleDefault} width="600.1" height="149px" stroke="#ffffff" strokeWidth="5px"/>
        
        <circle
          onClick = { () => { this.handleAreaClick('Transhumeral') }}
          fill={this.props.specs.amputationLevel === 'Transhumeral' ? '#207fd3' : '#ffffff'}
          stroke='#357dc1'
          strokeWidth="1px"
          cx="40.6" cy="224" r="14"
        />
        <rect
          onClick = { () => { this.handleAreaClick('Transhumeral') }}
          x="-0.4" y="148" opacity="0.3" fill={this.props.specs.amputationLevel === 'Transhumeral' ? rectangleStyleSelected : rectangleStyleDefault} width="600.1" height="150" stroke="#ffffff" strokeWidth="5px"/>
        
        <circle
          onClick = { () => { this.handleAreaClick('Elbow Disarticulation') }}
          fill={this.props.specs.amputationLevel === 'Elbow Disarticulation' ? '#207fd3' : '#ffffff'}
          stroke='#357dc1'
          strokeWidth="1px"
          cx="40.6" cy="340" r="14"
        />
        <rect
          onClick = { () => { this.handleAreaClick('Elbow Disarticulation') }}
          x="-0.4" y="297" opacity="0.3" fill={this.props.specs.amputationLevel === 'Elbow Disarticulation' ? rectangleStyleSelected : rectangleStyleDefault} width="600.1" height="83" stroke="#ffffff" strokeWidth="5px"/>

        <circle
          onClick = { () => { this.handleAreaClick('Transradial') }}
          fill={this.props.specs.amputationLevel === 'Transradial' ? '#207fd3' : '#ffffff'}
          stroke='#357dc1'
          strokeWidth="1px"
          cx="40.6" cy="424" r="14"
        />
        <rect
          onClick = { () => { this.handleAreaClick('Transradial') }}
          x="-0.4" y="379" opacity="0.3" fill={this.props.specs.amputationLevel === 'Transradial' ? rectangleStyleSelected : rectangleStyleDefault} width="600.1" height="90" stroke="#ffffff" strokeWidth="5px"/>
        
        <circle
          onClick = { () => { this.handleAreaClick('Wrist Disarticulation') }}
          fill={this.props.specs.amputationLevel === 'Wrist Disarticulation' ? '#207fd3' : '#ffffff'}
          stroke='#357dc1'
          strokeWidth="1px"
          cx="40.6" cy="490" r="14"
        />
        <rect
          onClick = { () => { this.handleAreaClick('Wrist Disarticulation') }}
          x="0" y="468" opacity="0.3" fill={this.props.specs.amputationLevel === 'Wrist Disarticulation' ? rectangleStyleSelected : rectangleStyleDefault} width="600.1" height="46" stroke="#ffffff" strokeWidth="5px"/>
        
        <circle
          onClick = { () => { this.handleAreaClick('Transcarpal') }}
          fill={this.props.specs.amputationLevel === 'Transcarpal' ? '#207fd3' : '#ffffff'}
          stroke='#357dc1'
          strokeWidth="1px"
          cx="40.6" cy="546" r="14"
        />
        <rect
          onClick = { () => { this.handleAreaClick('Transcarpal') }}
          x="-0.4" y="513" opacity="0.3" fill={this.props.specs.amputationLevel === 'Transcarpal' ? rectangleStyleSelected : rectangleStyleDefault} width="600.1" height="80" stroke="#ffffff" strokeWidth="5px"/>
      </svg>
    );

    const femaleSelect = (
      <svg style={selectorStyle2} version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 599.3 692.7">
        <circle
          onClick = { () => { this.handleAreaClick('Shoulder Disarticulation') }}
          fill={this.props.specs.amputationLevel === 'Shoulder Disarticulation' ? '#207fd3' : '#ffffff'}
          stroke='#357dc1'
          strokeWidth="1px"
          cx="40.6" cy="73" r="14"/>
        <rect
          onClick = { () => { this.handleAreaClick('Shoulder Disarticulation') }}
          x="-0.4" y="0.000" opacity="0.3" fill={this.props.specs.amputationLevel === 'Shoulder Disarticulation' ? rectangleStyleSelected : rectangleStyleDefault} width="600.1" height="136px" stroke="#ffffff" strokeWidth="5px"/>
        
        <circle
          onClick = { () => { this.handleAreaClick('Transhumeral') }}
          fill={this.props.specs.amputationLevel === 'Transhumeral' ? '#207fd3' : '#ffffff'}
          stroke='#357dc1'
          strokeWidth="1px"
          cx="40.6" cy="200" r="14"
        />
        <rect
          onClick = { () => { this.handleAreaClick('Transhumeral') }}
          x="-0.4" y="136" opacity="0.3" fill={this.props.specs.amputationLevel === 'Transhumeral' ? rectangleStyleSelected : rectangleStyleDefault} width="600.1" height="117px" stroke="#ffffff" strokeWidth="5px"/>
        
        <circle
          onClick = { () => { this.handleAreaClick('Elbow Disarticulation') }}
          fill={this.props.specs.amputationLevel === 'Elbow Disarticulation' ? '#207fd3' : '#ffffff'}
          stroke='#357dc1'
          strokeWidth="1px"
          cx="40.6" cy="294" r="14"
        />
        <rect
          onClick = { () => { this.handleAreaClick('Elbow Disarticulation') }}
          x="-0.4" y="253" opacity="0.3" fill={this.props.specs.amputationLevel === 'Elbow Disarticulation' ? rectangleStyleSelected : rectangleStyleDefault} width="600.1" height="78.4" stroke="#ffffff" strokeWidth="5px"/>
        
        <circle
          onClick = { () => { this.handleAreaClick('Transradial') }}
          fill={this.props.specs.amputationLevel === 'Transradial' ? '#207fd3' : '#ffffff'}
          stroke='#357dc1'
          strokeWidth="1px"
          cx="40.6" cy="368" r="14"
        />
        <rect
          onClick = { () => { this.handleAreaClick('Transradial') }}
          x="-0.4" y="331" opacity="0.3" fill={this.props.specs.amputationLevel === 'Transradial' ? rectangleStyleSelected : rectangleStyleDefault} width="600.1" height="70" stroke="#ffffff" strokeWidth="5px"/>

        <circle
          onClick = { () => { this.handleAreaClick('Wrist Disarticulation') }}
          fill={this.props.specs.amputationLevel === 'Wrist Disarticulation' ? '#207fd3' : '#ffffff'}
          stroke='#357dc1'
          strokeWidth="1px"
          cx="40.6" cy="420" r="14"
        />
        <rect
          onClick = { () => { this.handleAreaClick('Wrist Disarticulation') }}
          x="-0.4" y="401" opacity="0.3" fill={this.props.specs.amputationLevel === 'Wrist Disarticulation' ? rectangleStyleSelected : rectangleStyleDefault} width="600.1" height="38" stroke="#ffffff" strokeWidth="5px"/>
        
        <circle
          onClick = { () => { this.handleAreaClick('Transcarpal') }}
          fill={this.props.specs.amputationLevel === 'Transcarpal' ? '#207fd3' : '#ffffff'}
          stroke='#357dc1'
          strokeWidth="1px"
          cx="40.6" cy="464" r="14"
        />
        <rect
          onClick = { () => { this.handleAreaClick('Transcarpal') }}
          x="-0.4" y="439" opacity="0.3" fill={this.props.specs.amputationLevel === 'Transcarpal' ? rectangleStyleSelected : rectangleStyleDefault} width="600.1" height="65.4" stroke="#ffffff" strokeWidth="5px"/>

      </svg>
    );

    var genderSelect = this.props.selectedGender == "male" ? maleSelect : femaleSelect;

    return (
      <div>
        <div className="col-xs-12">
          <div id="sides" className="row">
            <form action="">
              <div>
                <p className="nested-label side-select">Select Amputation Side:</p>
              </div>
              <div className="col-xs-6" value="left">
                <div id="side" className="row" value="left" onClick={this.props.updateDisplay} style={this.props.specs.side === "left" ? selectedSide : notSelectedSide }>left</div>
              </div>
              <div value="right" className="col-xs-6" onClick={this.props.updateDisplay}>
                <div id="side" className="row right" value="right" onClick={this.props.updateDisplay} style={this.props.specs.side === "right" ? selectedSide : notSelectedSide}>right</div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-xs-12" style={this.props.specs.gender == "male" ? imagedivStyle : imagedivStyle2}>
          <p className="label amputation">Select Amputation Level: <span className="selected-level">{this.props.specs.amputationLevel}</span> <span className="coming-soon">{this.isSupportedAmputationLevel(this.props.specs.amputationLevel) ? "" : "(coming soon)"}</span></p>
          <img id="limb-select-img" style={this.props.specs.gender == "male" ? imageStyle : imageStyleFemale} src={imageURL}/>
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
    return (
      <div>
        {this.props.availableAreas.patient.selected ? this.loadAmutationLevelArea() : ""}
      </div>
    );
  }
};
