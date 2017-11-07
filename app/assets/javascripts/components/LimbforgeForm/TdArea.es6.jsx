class TdArea extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var showNozzle = this.props.availableAreas["submit"].selected;
    var tdOptions = this.props.tds == undefined ? '' : this.props.tds.map((td) => {
      return (
        <option value={td.name} key={td.name} >
          {td.name}
        </option>
      );
    });
    var elbowArea = (this.props.level == "Transhumeral") && showDevices  ? 
      <div className="row">
        <p className="label">Elbow Devices</p>
        <select id="Elbow">
          <option>Select Elbow</option>
        </select>
      </div> : '';

    var tdArea = (showNozzle) ?
    <div className="row">
      <div className="col-xs-12">
        <p className="label">Nozzle Width</p>
        <select id="Nozzle" onChange={this.props.updateNozzleWidth}>
          <option value="0.4" key="0.4">0.4 mm</option>
          <option value="0.6" key="0.6">0.6 mm</option>
        </select>
      </div>
    </div>
    : '';

    var forearmArea = (this.props.level == "Transhumeral") && showDevices  ?
    <div className="row">
      <ForearmArea
      updateDisplay={this.props.updateDisplay}
      />
    </div> : '';

    return (
      <div className="tab-padding td-area">
        {tdArea}
      </div>
    )
  }
};
