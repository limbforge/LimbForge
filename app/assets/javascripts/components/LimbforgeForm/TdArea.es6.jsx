class TdArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var tdOptions = this.props.tds == undefined ? '' : this.props.tds.map((td) => {
      return (
        <option value={td.name} key={td.name} >
          {td.name}
        </option>
      );
    });

    var tdArea = (this.props.tds !== undefined && Array.isArray(this.props.tds) && this.props.tds.length > 0) ?
    <div className="row">
      <div className="col-xs-12">
        <p>* Enter measurements above in increments of .5cm *</p>
        <p className="label">Terminal Devices</p>
        <select id="TD" onChange={this.props.updateDisplay}>
          {tdOptions}
        </select>
      </div>
    </div>
    : '';

    var wristArea = (this.props.tds !== undefined && Array.isArray(this.props.tds) && this.props.tds.length > 0) ?
    <div>
      <WristArea
        updateDisplay={this.props.updateDisplay}
        wrist_sizes= {this.props.wrist_sizes}
      />
    </div> : '';

    return (
      <div className="tab-padding td-area">
        {tdArea}
        {wristArea}
      </div>
    )
  }
};
