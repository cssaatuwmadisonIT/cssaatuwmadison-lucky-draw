import React, { Component } from 'react';
import logo from './cssalogo-red.svg'
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return (
     <header className={this.props.className}>
       <img width={100}  height={100} src={logo}/>
       <span>{this.props.activityName}</span>
     </header>
    );
  }
}
const mapStateToProps = state => ({
  activityName: state.dataReducer.activitySetting.name,
});

export default connect(mapStateToProps)(Header);