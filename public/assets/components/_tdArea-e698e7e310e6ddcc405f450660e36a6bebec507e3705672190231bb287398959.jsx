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

    var tdArea = this.props.tds == undefined ? '' :
    <div className="row">
      <div className="col-xs-12">
        <p className="label">Terminal Devices</p>
        <select id="terminal-devices-select" onChange={this.props.updateDisplay}>
          <option value="" >Select a Terminal Device</option>
          {tdOptions}
        </select>
      </div>
    </div>;

    return (
      <div>
        {tdArea}
      </div>
    )
  }
};
