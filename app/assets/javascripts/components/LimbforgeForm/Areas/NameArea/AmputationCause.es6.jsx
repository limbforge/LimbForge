class AmputationCause extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_other_input: false
    };
    this.updateSelect = this.updateSelect.bind(this);
  }

  updateSelect(event){
    const new_show_other_input = event.target.value == "Other" ? true : false;
    this.setState({show_other_input: new_show_other_input});
  }

  render() {
    const reasons = [
      "Congenital",
      "Traffic accident",
      "Diabetes",
      "Cancer",
      "Burn",
      "Frostbite",
      "Industrial accident",
      "Electrocution",
      "Natural disaster",
      "Infection",
      "Conflict",
      "Unknown",
      "Other"
    ];
    var other_input =  this.state.show_other_input ? <div><p className="label nested-label">Describe</p><input type="text" key="other" placeholder="Give more information" /></div> : "";

    const options = reasons.map(reason => {
      return (
        <option value={reason} key={reason}>
          {reason}
        </option>
      );
    });

    return (
      <div>
        <p className="nested-label">Cause of Amputation</p>
        <select onChange={this.updateSelect}>
          <option value="" key="other" >
            Please select
          </option>
          {options}
        </select>
        {other_input}
      </div>
    );
  }
};
