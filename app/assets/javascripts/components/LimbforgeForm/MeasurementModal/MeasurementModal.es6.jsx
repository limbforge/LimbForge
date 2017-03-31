class MeasurementModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var style = {
      maxWidth: '400px',
      display: 'block',
      margin: '0 auto',
    };
    var modal = this.props.measurements == undefined ?
    <div>stuff goes here</div> :
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">How to measure</h4>
        </div>
        <div className="modal-body">
          <img style={style} src={this.props.imageURL}/>
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
