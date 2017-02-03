class MetaToggle extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var metaArea = this.props.showMeta ?
      <div>
        <div className="meta">
          <p className="description">{this.props.option.description}</p>
          <p><strong>by:</strong> {this.props.option.creator} </p>
          <p><strong>uses:</strong> {this.props.option.uses} </p>
          <p><strong>type:</strong> {this.props.option.component_type} </p>
          <p><strong>weight:</strong> {this.props.option.weight} </p>
          <p><strong>printTime:</strong> {this.props.option.print_time} </p>
        </div>
      </div> : "";
    return (
      <div>
        {metaArea}
      </div>
    )
  }
};
