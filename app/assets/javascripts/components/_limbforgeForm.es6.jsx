const loader = new THREE.STLLoader();
const material = new THREE.MeshPhongMaterial( { color: 0x0f2045, specular: 0x0f2045, shininess: 0 } );

class LimbforgeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      components: undefined,
      tds: undefined,
      measurements: undefined,
      specs: {
        component: undefined,
        orientation: "left",
        C4: 250,
        L1: 250,
        TD: undefined
      },
    };
    this.createZip = this.createZip.bind(this);
    this.getComponents = this.getComponents.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.updateMeasurementsAndTds = this.updateMeasurementsAndTds.bind(this);
  }

  // When we select a component, we want to grab the components list of measurements and tds
  updateMeasurementsAndTds(event) {
    const newState = this.state;
    newState.specs.component = event.target.value;

    const tdsUrl = this.props.tds_search_path + "?query=" + event.target.value;
    const measurementsUrl = this.props.measurements_search_path + "?query=" + event.target.value;

    $.ajax({
      url: tdsUrl,
      dataType: 'json',
      success: (data) => {
        newState.tds = data;
      },
      error: (error) => {
        console.log('getTD error', error, url);
      }
    })
    .then(() => {
      $.ajax({
        url: measurementsUrl,
        dataType: 'json',
        success: (data) => {
          newState.measurements = data;
          console.log('just received new measurements', newState);
          this.setState(newState);
        },
        error: (error) => {
          console.log('get measurements error', error, url);
        }
      });
    });
  }

  getComponents(event) {
    const url = this.props.components_search_path + "?query="+event.target.value;
    $.ajax({
      url,
      dataType: 'json',
      success: (data) => {
        const newState = {
          components: data,
          tds: undefined,
          measurements: undefined
        };
        this.setState(newState);
      },
      error: (error) => {
        console.log('get components error', error, url);
      }
    });
  }
  //generate AWS urls for zip file
  populateURLS(urls) {
    urls.push('https://s3.amazonaws.com/limbforgestls/forearm/ebearm/'+ this.state.specs.orientation + '/forearm_ebearm_' + this.state.specs.orientation + '_C4-'+ this.state.specs.C4 +'_L1-'+ this.state.specs.L1 + '.stl');
    urls.push('https://s3.amazonaws.com/limbforgestls/EbeArm/EbeArm_wrist_unit+v1.stl');
    // add on terminal device adaptor
    if (this.state.specs.TD != undefined){
      urls.push('https://s3.amazonaws.com/limbforgestls/td/' + this.state.specs.TD + '/' + this.state.specs.orientation + '/td_' + this.state.specs.TD + '_' + this.state.specs.orientation + '.stl');
    }
  }

  createZip() {
    if (typeof this.state.specs.L1 != "number" || this.state.specs.L1 > 320 || this.state.specs.L1 < 180) throw alert("Expected L1 size to be a number between 18cm - 32cm");
    if (typeof this.state.specs.C4 != "number" || this.state.specs.C4 > 280 || this.state.specs.C4 < 200) throw alert("Expected C4 size to be a number between 20cm - 28cm");

    const zip = new JSZip();
    const today = new Date();
    const formatted_date =  today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    const zipFilename = $('#lname').val() + "_" + $('#fname').val() + "_forearm_" + this.state.specs.orientation + "_" + formatted_date + ".zip";
    const urls = [];
    this.populateURLS(urls);

    let count = 0;
    // We're asynchronously asking for all of the files
    // We increment the count once each file is completely downloaded
    // Once the last file is downloaded (aka count == urls.length) then zip it and download it
    urls.forEach((url) => {
      // Grab the filename from the url
      // For example if the url is http://google.com/awesome/foo.stl
      // We set filename = foo.stl
      const indexOfLastSlash = url.lastIndexOf('/');
      const filename = url.substring(indexOfLastSlash + 1);

      // Load a file from an external url and add it in a zip file
      // Beware! This will fail if the file is not binary
      // aka if it is a text file or an ascii stl model
      JSZipUtils.getBinaryContent(url, (err, data) => {
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
          .then((zipFile) => {
            saveAs(zipFile, zipFilename);
          });
        }
      });
    });
  }

  translateValueL1(input) {
    // removing decimal from number
    const base_num = parseFloat(input.toFixed(1).toString().replace(".", ""));
    // round up to nearest 5
    const result = (((Math.ceil(base_num/5)*5)/10)*10);
    return result
  }

  translateValueC4(input) {
    // removing decimal from number
    const base_num = parseFloat(input.toFixed(1).toString().replace(".", ""));
    // round down to nearest 5
    const result = ((Math.floor(base_num / 5) * 5) / 10) * 10;
    return result
  }

  updateDisplay(event) {
    //if orientation selector changed
    if (event.target.value == "right" || event.target.value == "left") {
      const newSpecs = this.state.specs;
      newSpecs.orientation =event.target.value;
      this.setState({specs: newSpecs});
    }
    //if terminal devices selector changed
    else if (event.target.id == "terminal-devices-select"){
      if (this.state.specs.TD != undefined || this.state.specs.TD != ""){
        const newSpecs = this.state.specs;
        newSpecs.TD = event.target.value;
        this.setState({specs: newSpecs});
      } else {
        const newSpecs = this.state.specs;
        newSpecs.TD = undefined;
        this.setState({specs: newSpecs});
      }
    //if L1 Changed
    } else if (event.target.name == "L1") {
      const L1Value = Number(event.target.value);
      const L1Measurements = this.state.measurements.find((measurement) => {
        return measurement.name == "L1";
      });
      if (L1Measurements && L1Measurements.lower_range < L1Value && L1Measurements.upper_range > L1Value) {
        const newSpecs = this.state.specs;
        newSpecs.L1 = this.translateValueL1(L1Value);
        this.setState({ specs: newSpecs });
      }
    }

    //if C4 Changed
    else if (event.target.name == "C4") {
      const C4Value = Number(event.target.value);
      const C4Measurements = this.state.measurements.find((measurement) => {
        return measurement.name == "C4";
      });
      if (C4Measurements && C4Measurements.lower_range < C4Value && C4Measurements.upper_range > C4Value) {
        const newSpecs = this.state.specs;
        newSpecs.C4 = this.translateValueC4(C4Value);
        this.setState({ specs: newSpecs });
      }
    }
  }

  loadTD() {
    if (this.state.specs.TD != undefined){
      scene.remove(scene.children[4]);
      const s3url = 'https://s3.amazonaws.com/limbforgestls/td/' + this.state.specs.TD + '/' + this.state.specs.orientation + '/td_' + this.state.specs.TD + '_' + this.state.specs.orientation + '.stl';
      loader.load(s3url, (geometry) => {
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( 0, 0, 3.3 );
        mesh.rotation.set(0, Math.PI, -Math.PI/2 );
        mesh.scale.set( .02, .02, .02 );

        mesh.castShadow = true;
        mesh.receiveShadow = false;

        scene.add( mesh );
        render();
      });
    }
  }

  loadNewDevices() {
    if (this.state.specs.component != undefined){
      // LOAD NEW devices
      scene.remove(scene.children[3]);
      const s3url = 'https://s3.amazonaws.com/limbforgestls/forearm/ebearm/'+ this.state.specs.orientation + '/forearm_ebearm_' + this.state.specs.orientation + '_C4-'+ this.state.specs.C4 +'_L1-'+ this.state.specs.L1  + '.stl';
      loader.load(s3url, (geometry) => {
        const mesh = new THREE.Mesh( geometry, material );
        if (this.state.specs.TD == undefined || this.state.specs.TD == "" ) {
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
  }

  render() {
    scene.remove(scene.children[3]);
    scene.remove(scene.children[4]);
    this.loadNewDevices();
    this.loadTD();
    var imageURL = this.state.specs.orientation === "right" ? this.props.documentation_img_L : this.props.documentation_img_R;
    return (
      <div>
        <div id="limbforge">
          <img className="logo" src={this.props.logo_img} />
          <h1 id="title">LIMBFORGE</h1>
          <NameArea/>
          <AmputationLevelArea
            getComponents={this.getComponents}
            levels={this.props.levels}
            components_search_path={this.props.components_search_path}
          />
          <ComponentArea
            updateMeasurementsAndTds={this.updateMeasurementsAndTds}
            updateDisplay={this.updateDisplay}
            components={this.state.components}
          />
          <MeasurementArea
            imageURL={imageURL}
            measurements={this.state.measurements}
            updateDisplay={this.updateDisplay}
          />
          <TdArea
            updateDisplay={this.updateDisplay}
            tds={this.state.tds}
          />
          <SubmitArea
            createZip={this.createZip}
            measurements={this.state.measurements}
          />
        </div>
        <MeasurementModal
          imageURL={imageURL}
          measurements={this.state.measurements}
        />
      </div>
    );
  }
}
