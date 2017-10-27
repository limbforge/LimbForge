class SubmitArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var loadinggif = this.props.isLoading ? this.props.loadingImg : '';
    var loadingval = this.props.isLoading ? '' : 'Download';
    var style = {
      backgroundImage: `url(${loadinggif})`
    };
    var submitArea = !this.props.availableAreas["submit"].selected ? '' :
      <div id="download-area" className="row tab-padding">
        <div className="col-xs-12">
          <input type="submit" style={style} onClick={this.props.createZip} value={loadingval}/>
        </div>
      </div>;
    return (
      <div>
        {submitArea}
      </div>
    )
  }
};
