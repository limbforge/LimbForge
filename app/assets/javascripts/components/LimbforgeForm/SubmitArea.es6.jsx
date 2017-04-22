class SubmitArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var loadinggif = this.props.isLoading ? this.props.loadingImg : '';
    var loadingval = this.props.isLoading ? '' : 'DOWNLOAD DISABLED FOR DEMO';
    var style = {
      backgroundImage: `url(${loadinggif})`
    };
    var submitArea = this.props.measurements == undefined ? '' :
      <div id="download-area" className="row tab-padding">
        <div className="col-xs-12">
          <input type="submit" className="download" style={style} value={loadingval}/>
        </div>
      </div>;
    return (
      <div>
        {submitArea}
      </div>
    )
  }
};
