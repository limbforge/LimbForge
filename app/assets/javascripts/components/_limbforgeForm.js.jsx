var loader = new THREE.STLLoader();
var material = new THREE.MeshPhongMaterial( { color: 0x0f2045, specular: 0x0f2045, shininess: 0 } );

var LimbforgeForm = React.createClass({
  componentWillMount(){
  },
  create_zip: function() {
    if (typeof this.state.specs.L1 != "number" || this.state.specs.L1 > 320 || this.state.specs.L1 < 180) throw alert("Expected L1 size to be a number between 18cm - 32cm");
    if (typeof this.state.specs.C4 != "number" || this.state.specs.C4 > 280 || this.state.specs.C4 < 200) throw alert("Expected C4 size to be a number between 20cm - 28cm");

    var self = this;
    var zip = new JSZip();
    var today = new Date();
    var formatted_date =  today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    var zipFilename = $('#lname').val() + "_" + $('#fname').val() + "_forearm_" + self.state.specs.orientation + "_" + formatted_date + ".zip";
    var urls = [];
    populateURLS();

    //generate AWS urls for zip file
    function populateURLS() {
      urls.push('https://s3.amazonaws.com/limbforgestls/forearm/ebearm/'+ self.state.specs.orientation + '/forearm_ebearm_' + self.state.specs.orientation + '_C4-'+ self.state.specs.C4 +'_L1-'+ self.state.specs.L1 + '.stl');
      urls.push('https://s3.amazonaws.com/limbforgestls/EbeArm/EbeArm_wrist_unit+v1.stl');
      // add on terminal device adaptor
      if (self.state.specs.TD != undefined){
        urls.push('https://s3.amazonaws.com/limbforgestls/td/' + self.state.specs.TD + '/' + self.state.specs.orientation + '/td_' + self.state.specs.TD + '_' + self.state.specs.orientation + '.stl');
      }
    }


    var count = 0;
    // We're asynchronously asking for all of the files
    // We increment the count once each file is completely downloaded
    // Once the last file is downloaded (aka count == urls.length) then zip it and download it
    urls.forEach(function (url) {
      // Grab the filename from the url
      // For example if the url is http://google.com/awesome/foo.stl
      // We set filename = foo.stl
      var indexOfLastSlash = url.lastIndexOf('/');
      var filename = url.substring(indexOfLastSlash + 1);

      // Load a file from an external url and add it in a zip file
      // Beware! This will fail if the file is not binary
      // aka if it is a text file or an ascii stl model
      JSZipUtils.getBinaryContent(url, function (err, data) {
        if(err) {
          // Probably should do something better here...
          // For example if the file server is down, provide some kind of info to the user
          throw err;
        }

        // Add the file to the zip
        zip.file(filename, data, { binary: true });
        count++;

        // We're all done! Zip it and ship it
        if (count == urls.length) {
          zip.generateAsync({ type: "blob" })
          .then(function(zipFile) {
            saveAs(zipFile, zipFilename);
          });
        }
      });
    });
  },
  getInitialState() {
    return {
      components: undefined,
      tds: undefined,
      measurements:undefined,
      specs: {
        component: undefined,
        orientation: "left",
        C4: 250,
        L1: 250,
        TD: undefined
      }
    };
  },
  getComponents: function(event) {
    $.ajax({
      url: this.props.components_search_path + "?query="+event.target.value,
      dataType: 'json',
      success: function(data) {
        var newState = {
          components: data,
          tds: undefined,
          measurements: undefined
        };
        this.setState(newState);
      }.bind(this),
      error: function(data) {
      }.bind(this)
    });
  },
  getTDs: function(event) {
    $.ajax({
      url: this.props.tds_search_path + "?query="+event,
      dataType: 'json',
      success: function(data) {
        this.setState({tds: data});
      }.bind(this),
      error: function(data) {
      }.bind(this)
    });
  },
  getMeasurements: function(event) {
    var newSpecs = this.state.specs;
    newSpecs.component = event.target.value;
    this.getTDs(event.target.value);
    $.ajax({
      url: this.props.measurements_search_path + "?query="+event.target.value,
      dataType: 'json',
      success: function(data) {
        var newState = {
          specs: newSpecs,
          measurements: data,
        }
        this.setState(newState);
      }.bind(this),
      error: function(data) {
      }.bind(this)
    });
  },
  translateValueL1: function(input){
    // removing decimal from number
    var base_num = parseFloat(input.toFixed(1).toString().replace(".", ""));
    // round up to nearest 5
    var result = (((Math.ceil(base_num/5)*5)/10)*10);
    return result
  },
  translateValueC4: function(input){
    // removing decimal from number
    var base_num = parseFloat(input.toFixed(1).toString().replace(".", ""));
    // round down to nearest 5
    var result = (((Math.floor(base_num/5)*5)/10)*10);
    return result
  },
  updateDisplay: function(event) {
    var self = this;
    //if orientation selector changed
    if (event.target.value == "right" || event.target.value == "left") {
      var newSpecs = this.state.specs;
      newSpecs.orientation = event.target.value;
      this.setState({specs: newSpecs});
    }
    //if terminal devices selector changed
    else if (event.target.id == "terminal-devices-select"){
      if (this.state.specs.TD != undefined || this.state.specs.TD != ""){
        var newSpecs = this.state.specs;
        newSpecs.TD = event.target.value;
        this.setState({specs: newSpecs});
      }
      else{
        var newSpecs = this.state.specs;
        newSpecs.TD = undefined;
        this.setState({specs: newSpecs});
      }
    }
    //if L1 Changed
    else if (event.target.name == "L1") {
      var L1Value = Number(event.target.value);
      var L1Measurements = this.state.measurements.find(function(measurement) {
        return measurement.name == "L1";
      });
      if (L1Measurements && L1Measurements.lower_range < L1Value && L1Measurements.upper_range > L1Value) {
        var self = this;
        var newSpecs = this.state.specs;
        newSpecs.L1 = self.translateValueL1(L1Value);
        this.setState({specs: newSpecs});
      }
    }

    //if C4 Changed
    else if (event.target.name == "C4") {
      var C4Value = Number(event.target.value);
      var C4Measurements = this.state.measurements.find(function(measurement) {
        return measurement.name == "C4";
      });
      if (C4Measurements && C4Measurements.lower_range < C4Value && C4Measurements.upper_range > C4Value) {
        var self = this;
        var newSpecs = this.state.specs;
        newSpecs.C4 = self.translateValueC4(C4Value);
        this.setState({specs: newSpecs});
      }
    }
  },
  loadTD: function(){
    if (this.state.specs.TD != undefined){
      scene.remove(scene.children[4]);
      loader.load( 'https://s3.amazonaws.com/limbforgestls/td/' + this.state.specs.TD + '/' + this.state.specs.orientation + '/td_' + this.state.specs.TD + '_' + this.state.specs.orientation + '.stl', function ( geometry ) {
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( 0, 0, 3.3 );
        mesh.rotation.set(0, Math.PI, -Math.PI/2 );
        mesh.scale.set( .02, .02, .02 );

        mesh.castShadow = true;
        mesh.receiveShadow = false;

        scene.add( mesh );
        render();
      });
    }
  },
  loadNewDevices: function(){
    var self = this;

    if (this.state.specs.component != undefined){
      // LOAD NEW devices
      scene.remove(scene.children[3]);
      loader.load( 'https://s3.amazonaws.com/limbforgestls/forearm/ebearm/'+ self.state.specs.orientation + '/forearm_ebearm_' + self.state.specs.orientation + '_C4-'+ self.state.specs.C4 +'_L1-'+ self.state.specs.L1  + '.stl', function ( geometry ) {
        var mesh = new THREE.Mesh( geometry, material );
        if (self.state.specs.TD == undefined || self.state.specs.TD == "" ) {
          mesh.position.set( 0, 0, 0.0 );
        } else {
          mesh.position.set( 0, 0, 3.3 );
        }

        mesh.rotation.set( 0, 0, 0 );
        mesh.scale.set( .02, .02, .02 );

        mesh.castShadow = true;
        mesh.receiveShadow = false;

        scene.add( mesh );
        render();
      });
    }
  },
  render: function() {
    scene.remove(scene.children[3]);
    scene.remove(scene.children[4]);
    this.loadNewDevices();
    this.loadTD();
    var self = this;
    var amputationLevelOptions = this.props.levels.map(function(option) {
      return (
        <option disabled={option.name == "20-80% Transradial" ? "" : "disabled"} value={option.id} key={option.id} >
          {option.name} {option.name != "20-80% Transradial" ? "(coming soon)" : ""}
        </option>
      )
    });
    var componentArea = '';
    if (Array.isArray(this.state.components)) {
      var componentOptions = this.state.components.map(function(option) {
        return (
          <option value={option.id} key={option.name} >
            {option.name}
          </option>
        );
      });
      var componentArea = this.state.components === undefined ? '' :
      <div className="row">
        <div className="col-xs-12">
          <p className="label">Components</p>
          <select id="design-selector" onChange={this.getMeasurements}>
            <option value="">Select a Component</option>
            {componentOptions}
          </select>
        </div>
      </div>;
    }
    var submitArea = "";
    var measurementArea = '';
    if (Array.isArray(this.state.measurements)) {
      var submitArea =
        <div className="row">
          <div className="col-xs-12">
            <input type="submit" onClick={this.create_zip} value="Download Files"/>
          </div>
        </div>;
      var measurementInputs = this.state.measurements.map(function(option) {
        return (
          <div key={option.name} className="col-xs-6">
            <p className="label nested-label">{option.name}</p>
            <input id={option.name} type="text" onChange={self.updateDisplay} max={option.upper_range} min={option.lower_range} placeholder={option.lower_range + "-" + option.upper_range + option.measurement_unit.toLowerCase()} name={option.name}/>
          </div>
        );
      });
      var imageURL = this.state.specs.orientation === "right" ? this.props.documentation_img_L : this.props.documentation_img_R
      var measurementArea = this.state.measurements === undefined ? '' :
      <div>
        <div className="row">
          <div className="col-xs-12">
            <p className="label">Orientation</p>
            <select id="handedness-selector" onChange={this.updateDisplay}>
              <option selected="selected" value="left" key="left" >Left</option>
              <option value="right" key="right" >Right</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div>
            <p className="label measurements">Measurements (cm)</p>
            <img className="documentation" data-toggle="modal" data-target="#measurementModal" src={imageURL}/>
            {measurementInputs}
          </div>
        </div>
      </div>;
    }

    var tdArea = '';
    if (Array.isArray(this.state.tds)) {
      var tdOptions = this.state.tds.map(function(td) {
        return (
          <option value={td.name} key={td.name} >
            {td.name}
          </option>
        );
      });
      var tdArea = this.state.tds === undefined ? '' :
      <div className="row">
        <div className="col-xs-12">
          <p className="label">Terminal Devices</p>
          <select id="terminal-devices-select" onChange={this.updateDisplay}>
            <option value="" >Select a Terminal Device</option>
            {tdOptions}
          </select>
        </div>
      </div>
    }

    return (
      <div>
        <div id="limbforge">
          <img className="logo" src={this.props.logo_img} />
          <h1 id="title">LIMBFORGE</h1>
          <div className="row">
            <div className="col-xs-12">
              <p className="nested-label">Patient Name</p>
            </div>
          </div>

          <div className="row">
            <div className="fname col-xs-6">
              <p className="label nested-label">First</p>
              <input id="fname" type="text" placeholder="Max" name="name"/>
            </div>
            <div className="lname col-xs-6">
              <p className="label nested-label">Last</p>
              <input id="lname" type="text" placeholder="Hova" name="name"/>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <p className="label">Amputation Level</p>
              <select onChange={this.getComponents}>
                <option value="" >
                  Select a level
                </option>
                {amputationLevelOptions}
              </select>
            </div>
          </div>
          {componentArea}
          {measurementArea}
          {tdArea}
          {submitArea}
        </div>

        <div className="modal fade" id="measurementModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">How to measure</h4>
              </div>
              <div className="modal-body">
                <img src={imageURL}/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
});
