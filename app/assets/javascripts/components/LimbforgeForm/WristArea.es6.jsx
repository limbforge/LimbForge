class WristArea extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var plOptions = this.props.wrist_sizes.map((pl) => {
      return (
        <option value={pl.value} key={pl.value} >
          {pl.title}
        </option>
      );
    });
    return (
      <div>
        <div className="measurement-container">
        <p className="label">Wrist Options</p>
          <select id="selected_wrist_size" onChange={this.props.updateDisplay}>
            {plOptions}
          </select>
        </div>
      </div>
    )
  }
};
