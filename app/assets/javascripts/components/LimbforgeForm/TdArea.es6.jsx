class TdArea extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var showDevices = this.props.tds !== undefined && Array.isArray(this.props.tds) && this.props.tds.length > 0;
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

    var tdArea = (showDevices) ?
    <div className="row">
      <div className="col-xs-12">
        <p className="label">Terminal Devices</p>
        <select id="TD" onChange={this.props.updateDisplay}>
          {tdOptions}
        </select>
      </div>
      <div className="col-xs-12">
        <p className="label">Nozzle Width</p>
        <select id="Nozzle" onChange={this.props.updateDisplay}>
          <option key="0.4">0.4 mm</option>
          <option key="0.6">0.6 mm</option>
        </select>
      </div>
    </div>
    : '';

    var wristArea = (showDevices) ?
      <div className="row">
        <WristArea
        updateDisplay={this.props.updateDisplay}
        wrist_sizes= {this.props.wrist_sizes}
        />
      </div> : '';

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
