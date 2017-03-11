class SubmitArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var submitArea = this.props.measurements == undefined ? '' :
      <div id="download-area" className="row tab-padding">
        <div className="col-xs-12">
          <input type="submit" onClick={this.props.createZip} value="Download STL Files"/>
        </div>
      </div>;
    return (
      <div>
        {submitArea}
      </div>
    )
  }
};
