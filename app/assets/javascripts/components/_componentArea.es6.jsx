class ComponentArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const componentOptions = [];
    if (this.props.components != undefined){
      this.props.components.map((option) => {
        componentOptions.push(
          <option value={option.id} key={option.name} >
            {option.name}
          </option>
        );
      });
    }
    var components = this.props.components == undefined ? "" :
      <div className="row">
        <div className="col-xs-12">
          <p className="label">Components</p>
          <select id="design-selector" onChange={this.props.updateMeasurementsAndTds}>
            <option value="">Select a Component</option>
            {componentOptions}
          </select>
        </div>
      </div>;

    return(
      <div>
        {components}
      </div>
    )
  }
};
