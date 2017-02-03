class ComponentListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMeta: false
      }
    this.toggleMeta = this.toggleMeta.bind(this);
    };
  toggleMeta(){
    if (this.state.showMeta){
      this.setState({showMeta: false});
    }
    else{
      this.setState({showMeta: true});
    }
  }
  render() {
    return(
      <div className="device" value={this.props.option.id} key={this.props.option.name}>
        <div className="device-img" onClick={() => this.props.updateMeasurementsAndTds(this.props.option.id)} style={{ backgroundImage: 'url(' + this.props.option.icon + ")" }}></div>
        <h2 onClick={() => this.props.updateMeasurementsAndTds(this.props.option.id)} >{this.props.option.name}</h2>
        <p className="show-more" onClick={this.toggleMeta}>show more <span className={this.state.showMeta ? "up" : "down"}></span></p>
        <MetaToggle showMeta={this.state.showMeta} option={this.props.option}/>
      </div>
    )
  }
};
