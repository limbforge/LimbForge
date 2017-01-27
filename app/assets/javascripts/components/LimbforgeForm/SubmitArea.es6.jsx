class SubmitArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var submitArea = this.props.measurements == undefined ? '' :
      <div id="download-area" className="row tab-padding">
        <div className="col-xs-12">
          <label>
            <input type='checkbox'/>
            <span></span>
            Download gcode
          </label>
          <label>
            <input type='checkbox'/>
            <span></span>
            Download STLs
          </label>
          <input type="submit" onClick={this.props.createZip} value="Download Files"/>
        </div>
      </div>;
    return (
      <div>
        {submitArea}
      </div>
    )
  }
};
