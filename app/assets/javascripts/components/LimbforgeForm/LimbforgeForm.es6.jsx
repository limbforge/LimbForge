const loader = new THREE.STLLoader();
const material = new THREE.MeshPhongMaterial( { color: 0x0f2045, specular: 0x0f2045, shininess: 0 } );

class LimbforgeForm extends React.Component {
  constructor(props) {
    super(props);
    this.downloaded = {
      td: undefined,
      devices: undefined,
    };
    this.state = {
      components: undefined,
      tds: undefined,
      isLoading: false,
      measurements: undefined,
      showNameArea: true,
      showAmputationLevelArea: false,
      showComponentArea: false,
      showMeasurementArea: false,
      specs: {
        gender: "male",
        component: undefined,
        component_object: undefined,
        amputationLevel: "Transcarpal",
        side: "left",
        C4: 250,
        L1: 250,
        TD: undefined,
      },
      availableAreas: {
        patient: {
          selected: true,
          available: true,
        },
        amputation: {
          selected: false,
          available: false,
        },
        prosthesis: {
          selected: false,
          available: false,
        },
        measurements: {
          selected: false,
          available: false,
        },
        td: {
          selected: false,
          available: false,
        },
        submit: {
          selected: false,
          available: false,
        },
      }
    };
    this.createZip = this.createZip.bind(this);
    this.getComponents = this.getComponents.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.updateGender = this.updateGender.bind(this);
    this.updateMeasurementsAndTds = this.updateMeasurementsAndTds.bind(this);
    this.getStls = this.getStls.bind(this);
    this.updateAvailableAreas = this.updateAvailableAreas.bind(this);
    this.updateSelectedArea = this.updateSelectedArea.bind(this);
    this.updateSpecs = this.updateSpecs.bind(this);
    this.updateComponentSpec = this.updateComponentSpec.bind(this);
    this.updateLoading = this.updateLoading.bind(this);
  }
  updateComponentSpec(component_id){
    var newState = this.state;
    var component_object = $.grep(this.state.components, function(e){ return e.id == component_id; });
    newState.specs.component_object = component_object[0];
    this.setState({specs: newState.specs});
  }
  // When we select a component, we want to grab the components list of measurements and tds
  updateMeasurementsAndTds(component_id) {
    const newState = this.state;
    newState.specs.component = component_id;
    newState.specs.TD = "phone";
    this.updateComponentSpec(component_id);
    const tdsUrl = this.props.tds_search_path + "?query=" + component_id;
    const measurementsUrl = this.props.measurements_search_path + "?query=" + component_id;

    $.ajax({
      url: tdsUrl,
      dataType: 'json',
      success: (data) => {
        newState.tds = data;
      },
      error: (error) => {
        console.log('getTD error', error, tdsUrl);
      }
    })
    .then(() => {
      $.ajax({
        url: measurementsUrl,
        dataType: 'json',
        success: (data) => {
          newState.measurements = data;
          newState.availableAreas.prosthesis.selected = false;
          newState.availableAreas.prosthesis.available = true;
          newState.availableAreas.measurements.selected = true;
          this.setState(newState);
        },
        error: (error) => {
          console.log('get measurements error', error, url);
        }
      });
    });
  }

  updateLoading(){
    if (this.state.isLoading){
      this.setState({isLoading: false});
    }
    else{
      this.setState({isLoading: true});
    }
  }

  getComponents(componentType) {
    const url = this.props.components_search_path + "?query="+componentType;
    $.ajax({
      url,
      dataType: 'json',
      success: (data) => {
          const newState = {
          components: data,
          tds: undefined,
          measurements: undefined,
          showAmputationLevelArea: false,
          showComponentArea: true
        };

        this.setState(newState);
      },
      error: (error) => {
        console.log('get components error', error, url);
      }
    });
  }

  getStls(stls) {
    var xhr = new XMLHttpRequest();

    var url = 'https://lf.fusion360.io/api/limbforge?parameters=%7B%22component%22%3A1%2C%22orientation%22%3A%22left%22%2C%22C4%22%3A250%2C%22L1%22%3A250%2C%22TD%22%3A%22phone%22%7D';
    xhr.open('GET', url, true);
    xhr.responseType = "blob";
    this.updateLoading();
    var new_this = this;
    xhr.onreadystatechange = function (){
      if (xhr.readyState === 4) {
        var blob = xhr.response;
        new_this.updateLoading();
        saveAs(blob, "filename.zip");
      }
    };
    xhr.send();
  }

  createZip() {
    if (typeof this.state.specs.L1 != "number" || this.state.specs.L1 > 320 || this.state.specs.L1 < 180) throw alert("Expected L1 size to be a number between 18cm - 32cm");
    if (typeof this.state.specs.C4 != "number" || this.state.specs.C4 > 280 || this.state.specs.C4 < 200) throw alert("Expected C4 size to be a number between 20cm - 28cm");

    const zip = new JSZip();
    const today = new Date();
    const formatted_date =  today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    const zipFilename = $('#lname').val() + "_" + $('#fname').val() + "_forearm_" + this.state.specs.side + "_" + formatted_date + ".zip";
    const stls = [];
    this.updateLoading();
    this.getStls(stls);
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

  updateSpecs(specs) {
    this.setState({ specs });
  }

  updateDisplay(event) {
    //if side selector changed
    if (event.target.value == "right" || event.target.value == "left") {
      const newSpecs = this.state.specs;
      newSpecs.side =event.target.value;
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
      const s3url =  this.state.specs.component_object.folder == "xhparm" ? "" : 'https://s3.amazonaws.com/limbforgestls/td/' + this.state.specs.TD + '/' + this.state.specs.side + '/td_' + this.state.specs.TD + '_' + this.state.specs.side + '.stl';
      if (this.downloaded.td !== s3url) {
        this.downloaded.td = s3url;
        loader.load(s3url, (geometry) => {
          const mesh = new THREE.Mesh( geometry, material );
          mesh.name = 'terminalDevice';
          mesh.position.set( 5, 0, 3.3 );
          mesh.rotation.set(0, Math.PI, -Math.PI/2 );
          mesh.scale.set( .02, .02, .02 );

          mesh.castShadow = true;
          mesh.receiveShadow = false;
          scene.remove(scene.getObjectByName('terminalDevice'));
          scene.add( mesh );
          renderThreeJS();
        });
      }
    }
  }

  loadNewDevices() {
    if (this.state.specs.component != undefined){
      // LOAD NEW devices
      const s3url =  this.state.specs.component_object.folder == "xhparm" ? 'https://s3.amazonaws.com/limbforgestls/forearm/xhparm/xhparm.stl' : 'https://s3.amazonaws.com/limbforgestls/forearm/ebearm/'+ this.state.specs.side + '/forearm_ebearm_' + this.state.specs.side + '_C4-'+ this.state.specs.C4 +'_L1-'+ this.state.specs.L1  + '.stl';
      if (this.downloaded.devices !== s3url) {
        this.downloaded.devices = s3url;
        loader.load(s3url, (geometry) => {
          const mesh = new THREE.Mesh( geometry, material );
          mesh.name = 'device';
          if (this.state.specs.TD == undefined || this.state.specs.TD == "" ) {
            mesh.position.set( 5, 0, 0.0 );
          } else {
            mesh.position.set( 5, 0, 3.3 );
          }

          mesh.rotation.set( 0, 0, 0 );
          mesh.scale.set( .02, .02, .02 );

          mesh.castShadow = true;
          mesh.receiveShadow = false;
          scene.remove(scene.getObjectByName('device'));
          scene.add( mesh );
          renderThreeJS();
        });
      }
    }
  }
  updateGender(e){
    newState = this.state;
    newState.specs.gender = e.target.value;
    this.setState(newState);
  }

  toggleNameArea(){
    this.setState({showNameArea: false});
    this.setState({showAmputationLevelArea: true});
  }

  // Whenever the form reaches a checkpoint, update the ability for that part of the form to be selected
  updateAvailableAreas(area) {
    const availableAreas = this.state.availableAreas;
    for (const key of Object.keys(availableAreas)) {
      const value = availableAreas[key];
      value.selected = false;
    }
    availableAreas[area].selected = true;
    availableAreas[area].available = true;
    this.setState({ availableAreas });
  }

  updateSelectedArea(area) {
    // Don't update unless the areas being passed in is available
    if (this.state.availableAreas[area].available) {
      const availableAreas = this.state.availableAreas;
      // Reset each area to not selected, then the passed area to selected
      for (const key of Object.keys(availableAreas)) {
        // Toggle the selected area and set everything else to false
        if (key === area) {
        // If we click on an open area, this will make sure it closes
          if (availableAreas[area].selected) {
            availableAreas[key].selected = false;
          } else {
            availableAreas[key].selected = true;
          }
        } else {
          availableAreas[key].selected = false;
        }
      }
      this.setState({ availableAreas });
    }
  }

  render() {
    this.loadNewDevices();
    this.loadTD();
    var imageName = "diagram_" + this.state.specs.gender + "_" + this.state.specs.amputationLevel.toLowerCase() + "_" + this.state.specs.side.charAt(0).toUpperCase();
    var imageURL = this.props.images[imageName];
    return (
      <div>
        <div id="limbforge">
          <img className="logo" src={this.props.logo_img} />
          <h1 id="title">LIMBFORGE</h1>
          <a href={this.props.sign_out_path} data-method="delete"> sign out </a>
          <NameArea
            gender={this.state.specs.gender}
            availableAreas={this.state.availableAreas}
            updateAvailableAreas={this.updateAvailableAreas}
            updateSelectedArea={this.updateSelectedArea}
            showNameArea={this.state.showNameArea}
            man_diagram={this.props.images.man_diagram}
            man_diagram_selected={this.props.images.man_diagram_selected}
            woman_diagram={this.props.images.woman_diagram}
            woman_diagram_selected={this.props.images.woman_diagram_selected}
            updateGender={this.updateGender}
            />
          <AmputationLevelArea
            availableAreas={this.state.availableAreas}
            updateAvailableAreas={this.updateAvailableAreas}
            updateSelectedArea={this.updateSelectedArea}
            selectedGender={this.state.specs.gender}
            updateSpecs={this.updateSpecs}
            getComponents={this.getComponents}
            levels={this.props.levels}
            components_search_path={this.props.components_search_path}
            images={this.props.images}
            specs={this.state.specs}
          />
          <ComponentArea
            availableAreas={this.state.availableAreas}
            updateAvailableAreas={this.updateAvailableAreas}
            updateSelectedArea={this.updateSelectedArea}
            updateMeasurementsAndTds={this.updateMeasurementsAndTds}
            updateDisplay={this.updateDisplay}
            components={this.state.components}
          />
          <MeasurementArea
            availableAreas={this.state.availableAreas}
            updateAvailableAreas={this.updateAvailableAreas}
            updateSelectedArea={this.updateSelectedArea}
            imageURL={imageURL}
            side={this.state.specs.side}
            amputationLevel={this.state.specs.amputationLevel}
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
            isLoading={this.state.isLoading}
            loadingImg={this.props.images.loading_img}
          />
        </div>
        <MeasurementModal
          imageURL={imageURL}
          measurements={this.state.measurements}
        />
        <LimbforgeFooter />
      </div>
    );
  }
}
