class WristArea extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var plOptions = this.props.wrist_sizes.map((pl) => {
      return (
        <div>
          <input type="checkbox" id={"PL_" + pl.value} value={pl.value} key={pl.value} onChange={this.props.updateDisplay}>
          </input>
          <p className="wrist-title">{pl.title}</p>
        </div>
      );
    });
    return (
      <div>
        <div className="string">
        <p className="label">Wrist Options</p>
          {plOptions}
        </div>
      </div>
    )
  }
};
