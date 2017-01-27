class MeasurementModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var modal = this.props.measurements == undefined ?
    <div>stuff goes here</div> :
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">How to measure</h4>
        </div>
        <div className="modal-body">
          <img src={this.props.imageURL}/>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>;
    return (
      <div className="modal fade" id="measurementModal" role="dialog">
        {this.props.mod}
        {modal}
      </div>
    )
  }
};
