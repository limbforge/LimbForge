class MeasurementInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          color: "gray"
      }
      this.checkInput = this.checkInput.bind(this)
    }

    checkInput(event){
        if(event.target.value <= this.props.max && event.target.value >= this.props.min){
            this.setState({color:"green"})
        }else{
            this.setState({color:"red"})
        }
        this.props.updateDisplay(event)
    }

    render() {
      return (
        <div className="measurement-container string">
            <input 
                id={this.props.name} 
                className={this.props.side + " " + this.props.amputationLevel} 
                type="integer" 
                onChange={this.checkInput} 
                max={this.props.max} 
                min={this.props.min} 
                placeholder={"XX.X cm"} 
                name={this.props.name}
                style={{color:this.state.color}}
                />
        </div>
      )
    }
  };