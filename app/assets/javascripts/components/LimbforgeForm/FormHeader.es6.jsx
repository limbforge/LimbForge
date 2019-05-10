class FormHeader extends React.Component {
  constructor(props){
    super(props)

    this.hackDownload = this.hackDownload.bind(this)
  }

  hackDownload(){
    //Copied from main form and reduced...this is a hack
    var zip = new JSZip();

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
    //These are the files we want another download for?
    zip.file('instructions.txt', urlToPromise('https://s3-us-west-2.amazonaws.com/limbforgedocs/instructions.txt'), {binary:true});
    zip.file('Passive.Transradial.Device.Assembly.Manual.pdf', urlToPromise('https://s3-us-west-2.amazonaws.com/limbforgedocs/Passive.Transradial.Device.Assembly.Manual.pdf'), {binary:true});

    // when everything has been downloaded, we can trigger the dl
  
    zip.generateAsync({type:"blob"})
    .then(function callback(blob) {
      // see FileSaver.js
      saveAs(blob, "limbforge_manual.zip");
    }, function (e) {
      console.log('oh noes', e);
    });
  }

  render(){
    const buttonCSSHACK = {
      background: '#357dc1',
      cursor: 'pointer',
      color: '#ffffff',
      fontSize: '13px',
      padding: '12px',
      textAlign: 'center'
    };

    return(
      <div>
        <div className="col-xs-12">
          <div id="sides" className="row">
            <form action="">
              
              <div className="col-xs-6" value="left">
                <div id="side" className="row side left" value="left" style={buttonCSSHACK} onClick={this.props.toggleSTL} >{this.props.loadSTL?`Hide Preview`:`Show Preview`}</div>
              </div>
              <div value="right" className="col-xs-6">
                <div id="side" className="row side right" value="right" style={buttonCSSHACK} onClick={this.hackDownload} >{`Get Manual`}</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
    
  }
}