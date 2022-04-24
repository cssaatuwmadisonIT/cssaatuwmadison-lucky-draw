import React, { Component } from 'react';

//redraw button is a bit misplaced. Fix it later.
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
