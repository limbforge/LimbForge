class ComponentArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMeta: false
      }
    this.toggleMeta = this.toggleMeta.bind(this);
    };
  toggleMeta(){
    debugger;
    if (this.state.showMeta){
      this.setState({showMeta: false});
    }
    else{
      this.setState({showMeta: true});
    }
  }
  renderComponents() {
    const componentOptions = [];
    if (this.props.components != undefined){
      this.props.components.map((option) => {
        componentOptions.push(
          <div className="device" value={option.id} key={option.name}>
            <div className="device-img" onClick={() => this.props.updateMeasurementsAndTds(option.id)} style={{ backgroundImage: 'url(' + option.icon + ")" }}></div>
            <h2 onClick={() => this.props.updateMeasurementsAndTds(option.id)} >{option.name}</h2>
            <p className="show-more" onClick={this.toggleMeta}>show more <span className={this.state.showMeta ? "up" : "down"}></span></p>
            <MetaToggle showMeta={this.state.showMeta} option={option}/>
          </div>
        );
      });
    }

    return (
      <div className="row">
        <div className="col-xs-12 tab-padding">
          <p className="label">Select a Component</p>
          {componentOptions}
        </div>
      </div>
    );
  }

  render() {
    var classes =  this.props.availableAreas.prosthesis.selected ? 'accordion-head active' : 'accordion-head';

    return(
      <div>
        <div onClick={()=>this.props.updateSelectedArea('prosthesis')} className={classes}>
          <h2>Prosthesis</h2>
          <span className="arrow"></span>
          <span className="line"></span>
        </div>
        {this.props.availableAreas.prosthesis.selected ? this.renderComponents() : ''}
      </div>
    )
  }
};
