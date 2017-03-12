class SubmitArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var submitArea = this.props.measurements == undefined ? '' :
      <div className="row">
        <div className="col-xs-12">
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
