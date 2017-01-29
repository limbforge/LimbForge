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

    var tdArea = (this.props.tds == undefined && Array.isArray(this.props.tds) && this.props.tds.length > 0) ? '' :
    <div className="row">
      <div className="col-xs-12">
        <p className="label">Terminal Devices</p>
        <select id="terminal-devices-select" onChange={this.props.updateDisplay}>
          {tdOptions}
        </select>
      </div>
    </div>;

    return (
      <div className="tab-padding">
        {tdArea}
      </div>
    )
  }
};
