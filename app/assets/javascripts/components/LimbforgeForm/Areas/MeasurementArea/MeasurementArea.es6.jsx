class MeasurementArea extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    //this.setState(nextProps);
  }

  render() {
    var classes =  this.props.availableAreas.measurements.selected ? 'accordion-head active' : 'accordion-head';

    return (
      <div>
        <div onClick={()=> this.props.updateSelectedArea('measurements')} className={classes}>
          <div>
            <h2>Download</h2>
            <span className="arrow"></span>
          </div>
        </div>
      </div>
    )
  }
};
