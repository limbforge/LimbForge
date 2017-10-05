const loader = new THREE.STLLoader();
const material = new THREE.MeshPhongMaterial( { color: 0x0f2045, specular: 0x0f2045, shininess: 0 } );

class LimbforgeForm extends React.Component {
  constructor(props) {
    super(props);
    this.downloaded = {
      td: undefined,
      devices: undefined,
    };
    this.getAvailableLevels();
    this.state = {
      components: undefined,
      tds: undefined,
      isLoading: false,
      measurements: undefined,
      availableLevels: undefined,
      showNameArea: true,
      showAmputationLevelArea: false,
      showComponentArea: false,
      showMeasurementArea: false,
      specs: {
        fname: "",
        lname: "",
        PL_1: 0,
        PL_2: 0,
        PL_3: 0,
        PL_4: 0,
        gender: "male",
        man_hover: false,
        woman_hover: false,
        component: undefined,
        component_object: undefined,
        amputationLevel: "Transcarpal",
        selected_wrist_size: 1,
        side: "left",
        C1: "18",
        C4: "24",
        C6: "25",
        L1: "27",
        L2: "30",
        TD: undefined,
        wrist_sizes: [
          {
            title: "very loose",
            value: "1"
          },
          {
            title: "loose",
            value: "2"
          },
          {
            title: "tight",
            value: "3"
          },
          {
            title: "very tight",
            value: "4"
          },
        ]
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
    this.getAvailableLevels = this.getAvailableLevels.bind(this);
    this.createZip = this.createZip.bind(this);
    this.getComponents = this.getComponents.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.updateMeasurementsAndTds = this.updateMeasurementsAndTds.bind(this);
    this.getStls = this.getStls.bind(this);
    this.updateAvailableAreas = this.updateAvailableAreas.bind(this);
    this.updateSelectedArea = this.updateSelectedArea.bind(this);
    this.updateSpecs = this.updateSpecs.bind(this);
    this.updateComponentSpec = this.updateComponentSpec.bind(this);
    this.updateLoading = this.updateLoading.bind(this);
    this.roundUpNumber = this.roundUpNumber.bind(this);
    this.roundDownNumber = this.roundDownNumber.bind(this);
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

  getAvailableLevels(){
    const url = "https://fusion360.io/api/ui/amputationLevels";
    $.ajax({
      url: url,
      dataType: 'json',
      success: (data) => {
        const newState = {
          availableLevels: data['amputationLevels']
        };
        this.setState(newState);
      },
      error: (error) => {
        console.log('get available levels error', error, url);
      }
    });
  }

  getComponents(componentType) {
    const url = this.props.components_search_path + "?query="+componentType;
    $.ajax({
      url: url,
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

  roundUpNumber(input){
    // removing decimal from number
    var base_num = parseFloat(parseFloat(input).toFixed(1).toString().replace(".", ""));
    // round up to nearest 5
    var result = (Math.ceil(base_num/5)*5);
    return result
  }

  roundDownNumber(input){
    // removing decimal from number
    var base_num = parseFloat(parseFloat(input).toFixed(1).toString().replace(".", ""));
    // round down to nearest 5
    var result = (Math.floor(base_num/5)*5);
    return result
  }

  getStls(stls) {
    var urls = this.state.specs.amputationLevel == 'Transhumeral' ?
    [
      'https://s3.amazonaws.com/limbforgestls/${this.state.specs.component_object.folder}/r${this.state.specs.component_object.version}/${this.state.specs.side.charAt(0).toUpperCase()}/info_C1-${this.roundDownNumber(this.state.specs.C1)}_C4-${this.roundDownNumber(this.state.specs.C4)}.stl',
      'https://s3.amazonaws.com/limbforgestls/PTD-a/${this.state.specs.side.charAt(0).toUpperCase()}/info_C1-${this.roundDownNumber(this.state.specs.C1)}.stl',
      'https://s3.amazonaws.com/limbforgestls/QTC-coupler/r12/info_PL-${this.state.specs.selected_wrist_size}.stl'
    ] :
    [
      'https://s3.amazonaws.com/limbforgestls/${this.state.specs.component_object.folder}/r${this.state.specs.component_object.version}/${this.state.specs.side.charAt(0).toUpperCase()}/info_C1-${this.roundDownNumber(this.state.specs.C1)}_C4-${this.roundDownNumber(this.state.specs.C4)}_L1-${this.roundUpNumber(this.state.specs.L1)}.stl',
      'https://s3.amazonaws.com/limbforgestls/PTD-a/${this.state.specs.side.charAt(0).toUpperCase()}/info_C1-${this.roundDownNumber(this.state.specs.C1)}.stl',
      'https://s3.amazonaws.com/limbforgestls/QTC-coupler/r12/info_PL-${this.state.specs.selected_wrist_size}.stl'
    ];

    var xhr = new XMLHttpRequest();
    urls.forEach(function(url) {
      xhr.open('GET', url, true);
      xhr.responseType = "blob";
    });

    this.updateLoading();
    var new_this = this;

    xhr.onreadystatechange = function (){
      if (xhr.readyState === 4) {
        var blob = xhr.response;
        new_this.updateLoading();
        saveAs(blob, "LimbForge.zip");
        this.updateLoading();
      }
    };
    xhr.send();
  }

  createZip() {
    if (this.state.specs.L1 > 32 || this.state.specs.L1 < 19) throw alert("Expected L1 size to be a number between 19cm - 32cm");
    if (this.state.specs.C1 > 18 || this.state.specs.C1 < 14.5) throw alert("Expected C1 size to be a number between 14.5cm - 18cm");
    if (this.state.specs.C4 > 28 || this.state.specs.C4 < 20) throw alert("Expected C4 size to be a number between 20cm - 28cm");
    this.updateLoading();
    const today = new Date();
    const formatted_date =  today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    const name = this.state.specs.fname == "" ? this.state.specs.lname + "_" : this.state.specs.fname + "_" + this.state.specs.lname + "_";
    const patientName = name == "_" ? "" : name;
    var urls = [
      {
        link: `https://s3.amazonaws.com/limbforgestls/PTD-a/${this.state.specs.side.charAt(0).toUpperCase()}/info_C1-${this.roundDownNumber(this.state.specs.C1)}.stl`,
        name: `${patientName.toUpperCase()}TERMINAL DEVICE_r15_C1=${this.state.specs.C1}`
      },
      {
        link: `https://s3.amazonaws.com/limbforgestls/QTC-coupler/r12/info_PL-${this.state.specs.selected_wrist_size}.stl`,
        name: `${patientName.toUpperCase()}WRIST_r12_PL${this.state.specs.selected_wrist_size}`
      },
    ];
    if (this.state.specs.amputationLevel == 'Transhumeral'){
      urls.push({
        link: `https://s3.amazonaws.com/limbforgestls/${this.state.specs.component_object.folder}/r${this.state.specs.component_object.version}/${this.state.specs.side.charAt(0).toUpperCase()}/info_C1-${this.roundDownNumber(this.state.specs.C1)}_C4-${this.roundDownNumber(this.state.specs.C4)}.stl`,
        name: `${patientName.toUpperCase()}FOREARM_r${this.state.specs.component_object.version}_${this.state.specs.side.charAt(0).toUpperCase()}_C1=${this.state.specs.C1}_C4=${this.state.specs.C4}${this.state.specs.amputationLevel == 'Transhumeral' ? '' : '_L1=${this.state.specs.L1}'}`
      });
    }
    else{
      urls.push({
        link: `https://s3.amazonaws.com/limbforgestls/${this.state.specs.component_object.folder}/r${this.state.specs.component_object.version}/${this.state.specs.side.charAt(0).toUpperCase()}/info_C1-${this.roundDownNumber(this.state.specs.C1)}_C4-${this.roundDownNumber(this.state.specs.C4)}_L1-${this.roundUpNumber(this.state.specs.L1)}.stl`,
        name: `${patientName.toUpperCase()}FOREARM_r${this.state.specs.component_object.version}_${this.state.specs.side.charAt(0).toUpperCase()}_C1=${this.state.specs.C1}_C4=${this.state.specs.C4}_L1=${this.state.specs.L1}`
      });
    }
    for (var i=0; i< 4; i++) {
      urls.push(
        { link: "https://s3.amazonaws.com/limbforgestls/QTC-coupler/r12/info_PL-" + (i + 1) +".stl",
          name: "WRIST_COUPLER_" + this.state.specs.wrist_sizes[i]["title"].replace(/\s+/g,"_").toUpperCase()
        }
      )
    }
    /**
    * Fetch the content and return the associated promise.
    * @param {String} url the url of the content to fetch.
    * @return {Promise} the promise containing the data.
    */
    function urlToPromise(url) {
      return new Promise(function(resolve, reject) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
          if(err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    }

    var zip = new JSZip();
    urls.forEach((url) => {
      var filename = url.name + '.stl';
      zip.file(filename, urlToPromise(url.link), {binary:true});
    });

    zip.file('instructions.txt', urlToPromise('https://s3-us-west-2.amazonaws.com/limbforgedocs/instructions.txt'), {binary:true});
    zip.file('Passive.Transradial.Device.Assembly.Manual.pdf', urlToPromise('https://s3-us-west-2.amazonaws.com/limbforgedocs/Passive.Transradial.Device.Assembly.Manual.pdf'), {binary:true});

    // when everything has been downloaded, we can trigger the dl
    newThis = this;
    zip.generateAsync({type:"blob"})
    .then(function callback(blob) {
      // see FileSaver.js
      newThis.updateLoading();
      saveAs(blob, patientName + "limbforge_files.zip");
    }, function (e) {
      console.log('oh noes', e);
    });
  }
  updateSpecs(specs) {
    this.setState({ specs });
  }

  updateDisplay(event) {
    newSpec = this.state.specs;
    const eventClass = event.target.parentElement.getAttribute('class') == null ? "" : event.target.parentElement.getAttribute('class');
    newSpec[event.target.id] = !eventClass.includes("string") ? event.target.getAttribute('value') : event.target.value;
    this.setState({specs: newSpec});
  }
  loadTD() {
    if (this.state.specs.TD != undefined){
      const s3url =  'https://s3.amazonaws.com/limbforgestls/PTD-a/'+ this.state.specs.side.charAt(0).toUpperCase() + '/info_C1-'+ this.roundDownNumber(this.state.specs.C1) +'.stl';
      if (this.downloaded.td !== s3url) {
        this.downloaded.td = s3url;
        loader.load(s3url, (geometry) => {
          const mesh = new THREE.Mesh( geometry, material );
          mesh.name = 'terminalDevice';
          mesh.position.set( 5, 0, 3.3 );
          mesh.rotation.set(0, Math.PI, -Math.PI);
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
      const s3url =  this.state.specs.amputationLevel == 'Transhumeral' ? 
        'https://s3.amazonaws.com/limbforgestls/'+ this.state.specs.component_object.folder + '/r' + this.state.specs.component_object.version + '/preview/' + this.state.specs.side.charAt(0).toUpperCase() + '/info_C4-' + this.roundDownNumber(this.state.specs.C4) + '_C6-'+ this.roundDownNumber(this.state.specs.C6) + '_L2-'+ this.roundDownNumber(this.state.specs.L2) + '.stl' :
        'https://s3.amazonaws.com/limbforgestls/'+ this.state.specs.component_object.folder + '/r' + this.state.specs.component_object.version + '/' + this.state.specs.side.charAt(0).toUpperCase() + '/info_C1-' + this.roundDownNumber(this.state.specs.C1) + '_C4-'+ this.roundDownNumber(this.state.specs.C4) + '_L1-'+ this.roundUpNumber(this.state.specs.L1) + '.stl';
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
      <NameArea
        gender={this.state.specs.gender}
        availableLevels={this.state.availableLevels}
        availableAreas={this.state.availableAreas}
        updateAvailableAreas={this.updateAvailableAreas}
        updateSelectedArea={this.updateSelectedArea}
        showNameArea={this.state.showNameArea}
        updateDisplay={this.updateDisplay}
        availableLevels={this.state.availableLevels}
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
      level={this.state.specs.amputationLevel}
      specs={this.state.specs}
      wrist_sizes= {this.state.specs.wrist_sizes}
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
