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
        <p>Interested in testing LimbForge in your practice?  Reach out to the team at <a href="mailto:beta@limbforge.org?Subject=Beta%20testing%20request" target="_top">beta@limbforge.org</a> to discuss beta testing!</p>
        </div>
      </div>;
    return (
      <div>
        {submitArea}
      </div>
    )
  }
};
