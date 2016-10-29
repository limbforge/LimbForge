class NameArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
      </div>
    )
  }
};
