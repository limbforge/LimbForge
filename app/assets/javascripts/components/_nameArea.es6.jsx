class NameArea extends React.Component {
  componentDidMount(){
    $( "#tags" ).autocomplete({
      source: availableCities
    });
  }
  constructor(props) {
    super(props);
  }

  render() {
    var nameArea = <div></div>
    if (this.props.showNameArea) {
      var nameArea = (
        <div>
          <div className="row">
            <div className="col-xs-12">
              <p className="nested-label">Patient Name</p>
            </div>
          </div>
          <div className="row">
            <div className="fname col-xs-6">
              <p className="label nested-label">First</p>
              <input id="fname" type="text" placeholder="Max" name="name"/>
            </div>
            <div className="lname col-xs-6">
              <p className="label nested-label">Last</p>
              <input id="lname" type="text" placeholder="Hova" name="name"/>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <p className="nested-label">Gender</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6">
              <input type="radio" name="gender" value="male"/> Male
            </div>
            <div className="col-xs-6">
              <input type="radio" name="gender" value="female"/> Female
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <p className="nested-label">Date of Birth</p>
              <input type="date" name="bday"/>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <p className="nested-label">Cause of Amputation</p>
              <textarea></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <p className="nested-label">City of Residence</p>
            </div>
          </div>
          <div className="ui-widget">
            <input id="tags" />
          </div>
          <button onClick={this.props.toggleNameArea}>CONTINUE</button>
        </div>
      );
    }
    return (
      <div>
        {nameArea}
      </div>
    )
  }
};
