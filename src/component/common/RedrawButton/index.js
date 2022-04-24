import React, { Component } from 'react';


class RedrawButton extends Component {
  render() {
    return (
      <button onClick={this.next}>REDRAW</button>
    );
  }
  next() {
    this.props.history.push("/lottery-drawing")
  }
}

export default RedrawButton;
