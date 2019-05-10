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
      loadSTL: false,
      measurements: undefined,
      availableLevels: undefined,
      specs: {
        fname: "",
        lname: "",
        PL_1: 0,
        PL_2: 0,
        PL_3: 0,
        PL_4: 0,
        gender: "",
        man_hover: false,
        woman_hover: false,
        component: undefined,
        component_object: undefined,
        amputationLevel: "",
        selected_wrist_size: 1,
        side: "",
        C1: "15",
        C2: "24",
        C3: "24",
        C4: "24",
        C6: "25",
        L1: "27",
        L2: "28",
        L4: "16",
        TD: undefined,
        nozzle_width: 0.4,
        wrist_sizes: [
          {title: "very loose", value: "1"},
          {title: "loose", value: "2"},
          {title: "tight",value: "3"},
          {title: "very tight",value: "4"},
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
          available: true,
        },
      }
    };
    this.createZip = this.createZip.bind(this);
    this.getComponents = this.getComponents.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.updateMeasurementsAndTds = this.updateMeasurementsAndTds.bind(this);
    this.updateAvailableAreas = this.updateAvailableAreas.bind(this);
    this.updateSelectedArea = this.updateSelectedArea.bind(this);
    this.updateNozzleWidth = this.updateNozzleWidth.bind(this);
    this.updateSpecs = this.updateSpecs.bind(this);
    this.updateComponentSpec = this.updateComponentSpec.bind(this);
    this.updateLoading = this.updateLoading.bind(this);
    this.roundUpNumber = this.roundUpNumber.bind(this);
    this.roundDownNumber = this.roundDownNumber.bind(this);
    this.toggleSTL = this.toggleSTL.bind(this)
  }

  toggleSTL(){
    console.log("Toggle STL")
    var b = !this.state.loadSTL
    this.setState({loadSTL:b})
  }

  updateComponentSpec(component_id){
    var newState = this.state;
    var component_object = $.grep(this.state.components, function(e){ return e.id == component_id; });
    newState.specs.component_object = component_object[0];
    this.setState({specs: newState.specs});
  }

  updateNozzleWidth(event){
    var newState = this.state;
    newState.specs.nozzle_width = event.target.value;
    this.setState(newState);
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
          this.setState(newState);
        },
        error: (error) => {
          console.log('get measurements error', error, url);
        }
      });
    });
  }

  updateLoading(){
    console.log("Loading", this.state.isLoading)
    if (this.state.isLoading){
      this.setState({isLoading: false});
    }
    else{
      this.setState({isLoading: true});
    }
    console.log("Loading", this.state.isLoading)
  }

  getComponents(componentType) {
    //componentType is an id and comes in from AmputationLevelArea
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
          showComponentArea: true,
        };
        this.setState(newState);
        //This is a hack, I am not sure if components_search_path would return more than one
        //But since it is a list, I will just take the first one
        if(this.state.components.length >= 1){
          this.updateMeasurementsAndTds(this.state.components[0].id)
        }else{
          console.log("Request components error", data)
        }
        
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
 
  createZip() {  
    this.updateLoading();
    const today = new Date();
    const formatted_date =  today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    const name = this.state.specs.fname == "" ? this.state.specs.lname + "_" : this.state.specs.fname + "_" + this.state.specs.lname + "_";
    const patientName = name == "_" ? "" : name;
    var revision = this.state.specs.gender == "male" ? 1 : 17;
    ///OH, another set up urls....
    var urls = [
      {
        link: `https://s3.amazonaws.com/limbforgestls/TD/${this.state.specs.gender.charAt(0)}PTD1/r${revision}/build/${this.state.specs.side.charAt(0).toUpperCase()}/info_C1-${this.roundDownNumber(this.state.specs.C1)}_L4-${this.roundDownNumber(this.state.specs.L4)}.stl`,
        name: `${patientName.toUpperCase()}TERMINAL DEVICE_r15_C1=${this.state.specs.C1}_L4=${this.state.specs.L4}`
      }
    ];
    if (this.state.specs.amputationLevel == 'Transhumeral'){
      urls.push({
        link: `https://s3.amazonaws.com/limbforgestls/${this.state.specs.component_object.folder}/r${this.state.specs.component_object.version}/${this.state.specs.side.charAt(0).toUpperCase()}/info_C1-${this.roundDownNumber(this.state.specs.C1)}_C4-${this.roundDownNumber(this.state.specs.C4)}_nz=${this.state.specs.nozzle_width}.stl`,
        name: `${patientName.toUpperCase()}FOREARM_r${this.state.specs.component_object.version}_${this.state.specs.side.charAt(0).toUpperCase()}_C1=${this.state.specs.C1}_C4=${this.state.specs.C4}${this.state.specs.amputationLevel == 'Transhumeral' ? '' : '_L1=${this.state.specs.L1}'}_nz=${this.state.specs.nozzle_width}`
      });
    }
    else{
      urls.push({
        link: `https://s3.amazonaws.com/limbforgestls/forearm-QTC/r20/${this.state.specs.side.charAt(0).toUpperCase()}/info_C1-${this.roundDownNumber(this.state.specs.C1)}_C4-${this.roundDownNumber(this.state.specs.C4)}_L1-${this.roundUpNumber(this.state.specs.L1)}.stl`,
        name: `${patientName.toUpperCase()}FOREARM_r20_${this.state.specs.side.charAt(0).toUpperCase()}_C1=${this.state.specs.C1}_C4=${this.state.specs.C4}_L1=${this.state.specs.L1}_nz=${this.state.specs.nozzle_width}`
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

    //These are the files we want another download for?
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
    if(this.state.loadSTL){
      if (this.state.specs.TD != undefined){
        var revision = this.state.specs.gender == "male" ? 1 : 17;
        const s3url =  'https://s3.amazonaws.com/limbforgestls/TD/' + this.state.specs.gender.charAt(0) + 'PTD1/r'+ revision +'/preview/'+ this.state.specs.side.charAt(0).toUpperCase() +'/info_C1-' + this.roundDownNumber(this.state.specs.C1) + '_L4-'+ this.roundDownNumber(this.state.specs.L4) + '.stl'
        if (this.downloaded.td !== s3url) {
          this.downloaded.td = s3url;
          loader.load(s3url, (geometry) => {
            const mesh = new THREE.Mesh( geometry, material );
            mesh.name = 'terminalDevice';
            mesh.position.set( 5, 0, 3.3 );
            mesh.scale.set( .04, .04, .04 );
            mesh.castShadow = true;
            mesh.receiveShadow = false;
            scene.remove(scene.getObjectByName('terminalDevice'));
            scene.add( mesh );
            renderThreeJS();
          });
        }
      }
    }
  }

  loadNewDevices() {
    console.log("Load new devices")
    if(this.state.loadSTL){
      if (this.state.specs.component != undefined){
        const s3url =  this.state.specs.amputationLevel == 'Transhumeral' ? 
          'https://s3.amazonaws.com/limbforgestls/forearm-QTC/r' + this.state.specs.component_object.version + '/preview/' + this.state.specs.side.charAt(0).toUpperCase() + '/info_C4-' + this.roundDownNumber(this.state.specs.C4) + '_C6-'+ this.roundDownNumber(this.state.specs.C6) + '_L2-'+ this.roundDownNumber(this.state.specs.L2) + '.stl' :
          'https://s3.amazonaws.com/limbforgestls/forearm-QTC/r20' + '/' + this.state.specs.side.charAt(0).toUpperCase() + '/info_C1-' + this.roundDownNumber(this.state.specs.C1) + '_C4-'+ this.roundDownNumber(this.state.specs.C4) + '_L1-'+ this.roundUpNumber(this.state.specs.L1) + '.stl';
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
            mesh.scale.set( .04, .04, .04 );

            mesh.castShadow = true;
            mesh.receiveShadow = false;
            scene.remove(scene.getObjectByName('device'));
            scene.add( mesh );
            renderThreeJS();
          });
        }
      }
    }
  }

  // Whenever the form reaches a checkpoint, update the ability for that part of the form to be selected
  updateAvailableAreas(area) {
    //used early
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
    //used later
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
          imageURL={imageURL}
          side={this.state.specs.side}
          amputationLevel={this.state.specs.amputationLevel}
          measurements={this.state.measurements}
          specs={this.state.specs}
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
          availableAreas={this.state.availableAreas}
          tds={this.state.tds}
          level={this.state.specs.amputationLevel}
          specs={this.state.specs}
          wrist_sizes= {this.state.specs.wrist_sizes}
          updateNozzleWidth={this.updateNozzleWidth}
          />
          <SubmitArea
          availableAreas={this.state.availableAreas}
          createZip={this.createZip}
          measurements={this.state.measurements}
          isLoading={this.state.isLoading}
          loadingImg={this.props.images.loading_img}
          />

          <FormExtras loadSTL={this.state.loadSTL} toggleSTL={this.toggleSTL}/>
        </div>
        
        <LimbforgeFooter />
        
      </div>
    );
  }
}
