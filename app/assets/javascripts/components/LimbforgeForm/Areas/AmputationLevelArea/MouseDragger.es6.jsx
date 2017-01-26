class MouseDragger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      width: document.documentElement.clientWidth,
      widthOld: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      heightOld: document.documentElement.clientHeight,
      dragging: false,
      dragX: 0,
      dragY: 0,
      yMin: 0,
      yMax: 0,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    window.onmousemove = (event) => {
      if (this.state.dragging) {
        let dragX = event.clientX;
        let dragY = event.clientY;
        if (dragX > this.state.width) {
          dragX = this.state.width - 1;
        }
        if (dragX < 0) {
          dragX = 0;
        }
        if (dragY > this.state.height) {
          dragY = this.state.height - 1;
        }
        if (dragY < 0) {
          dragY = 0;
        }
        this.setState({
          dragX,
          dragY,
          x: dragX,
          y: dragY,
        });
        this.updateCoordinates(dragX, dragY);
      }
    }

    document.body.addEventListener('touchmove', (event) => {
      event.preventDefault();

      // Do we need this?
      if (!this.state.dragging) {
        return false;
      }

      let dragX = event.touches[0].pageX;
      let dragY = event.touches[0].pageY;
      if (dragX > this.state.width) {
        dragX = this.state.width - 1;
      }
      if (dragX < 0) {
        dragX = 0;
      }
      if (dragY > this.state.height) {
        dragY = this.state.height - 1;
      }
      if (dragY < 0) {
        dragY = 0;
      }

      this.setState({
        dragX,
        dragY,
        x: dragX,
        y: dragY,
      });
      this.updateCoordinates(dragX, dragY);
    });

    document.body.onmouseup = (event) => {
      if (this.state.dragging) {
        this.setState({
          dragging: false,
        });
      }
    }

    window.onmouseup = (event) => {
      if (this.state.dragging) {
        this.setState({
          dragging: false,
        })
      }
    }


    window.onresize = () => {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      const x = this.state.x * width / this.state.widthOld;
      const y = this.state.y * height / this.state.heightOld;
      const widthOld = width;
      const heightOld = height;

      this.setState({
        x,
        y,
        width,
        widthOld,
        height,
        heightOld,
      });
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.componentDiv = document.getElementById("limb-select-img");
      this.loadBounds();
    }, 100);
  }

  handleMouseDown(event) {
    const dragX = event.clientX;
    const dragY = event.clientY;

    this.setState({
      dragging: true,
      dragX,
      dragY,
      x: dragX,
      y: dragY,
    });
    this.updateCoordinates(dragX, dragY);
  }

  handleTouchStart(event) {
    event.preventDefault();
    const dragX = event.touches[0].pageX;
    const dragY = event.touches[0].pageY;
    this.setState({
      dragging: true,
      dragX,
      dragY,
      x: dragX,
      y: dragY,
    });
    this.updateCoordinates(dragX, dragY);
  }

  handleTouchEnd(event) {
    event.preventDefault();
    this.setState({
      dragging: false,
    });
  }

  loadBounds() {
    if (this.componentDiv) {
      const yMin = this.componentDiv.offsetTop;
      const yMax = this.componentDiv.clientHeight + yMin;
      this.setState({ yMin, yMax, y: yMax });
    }
  }

  updateCoordinates(xIn, yIn) {
    let y = yIn + this.props.amountScrolled;
    y = y < this.state.yMin ? this.state.yMin : y;
    y = y > this.state.yMax ? this.state.yMax : y;

    let yPercent = 0;
    // Don't let it divide by zero
    if (y - this.state.yMin !== 0) {
      yPercent = (y - this.state.yMin) / (this.state.yMax - this.state.yMin) * 100;
    }
    this.props.updatePercent(yPercent, y);
  }

  render() {
    return (
      <div
        onMouseDown  = {this.handleMouseDown}
        onTouchStart = {this.handleTouchStart}
        onTouchEnd   = {this.handleTouchEnd}
      >
        {this.props.children}
      </div>
    )
  }
};
