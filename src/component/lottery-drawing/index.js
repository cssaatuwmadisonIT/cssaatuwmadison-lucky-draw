import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DrawService from "../../service/DrawService";
import { addWinner } from '../../redux/actions/lotteryPool';
import maskPhone from '../../utils/phone_mask';
import { connect } from 'react-redux';
import TagCloud from "../common/tag-cloud";
import './lottery-drawing.css'

class LotteryDrawing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedParticipant: {},
      currentPrize: '',
      isPrizeChanged: false,
      btnDisabled: false,
      bufferWinner: null,
    };
  }

  render() {
    return (
      <div className={"lottery-drawing"}>
        <div className="name-cloud-container">
          <TagCloud tags={this.props.allParticipants.map(participant => participant.name)} />
        </div>
        <div>
          <header className={'prize-title'}>
            {this.getTitle()}
          </header>
          <div className={'rolling'}>
            {this.getContent()}
          </div>
          <button className={this.state.btnDisabled ? "wait" : ""} disabled={this.state.btnDisabled} onClick={this.onProgressClick.bind(this)}>{this.getProgressButton()}</button>
          <button className={this.state.btnDisabled ? "wait" : ""} disabled={this.state.btnDisabled} onClick={this.onRedrawClick.bind(this)}>{this.getRedrawButton()}</button>
        </div>
      </div>
    );
  }


  onProgressClick = () => {
    //console.log(typeof this.state.currentPrize);

    if (this.state.noPrize) {
      this.props.history.push("/result");
    } else {
      if (this.state.isPrizeChanged) {
        this.setState({
          isPrizeChanged: false,
        });
        this.computeCurrentPrize();
        return;
      }
      try {
        if (this.drawService.isRolling) {
          this.drawService.pickOneThenDo((selected) => {
            selected.prize = this.state.currentPrize;
            this.state.bufferWinner = selected;
            //this.props.addWinner(selected);
            this.computeCurrentPrize();
          })
        } else {
          if (this.state.bufferWinner != null) {
            this.props.addWinner(this.state.bufferWinner);
            this.state.bufferWinner = null;
            this.computeCurrentPrize();
          }
          this.drawService.rollUp();
        }
      } catch (err) {
        console.error(err.message)
      }
    }

  };
  //bug exists: if users double click the button too fast, the buttons will lose focus (cannot respond to click event)
  onRedrawClick = () => {
    this.state.currentPrize = this.state.bufferWinner.prize; // uncessary mutatation?
    this.state.bufferWinner = null;
    //this.props.history.push("/lottery-drawing");
  };

  getCurrentPrize = (next) => {
    const items = this.props.lotteryPool.winners.filter(winner => (winner.prize.id === this.state.currentPrize.id)) + (this.state.bufferWinner ? [this.state.bufferWinner] : []);
    if (!next && (this.state.currentPrize.totalCount - items.length || 0) >= 0 && this.state.currentPrize) {
      if ((this.state.currentPrize.totalCount - items.length || 0) === 0) {
        this.setState({
          isPrizeChanged: true,
        });
      }
      return this.state.currentPrize;
    }

    return this.props.lotteryDrawing.setting.find((lottery) => {
      const items = this.props.lotteryPool.winners.filter(winner => (winner.prize.id === lottery.id));
      if ((lottery.totalCount - items.length || 0) <= 0) {
        return false;
      }
      return true
    }
    );
  }
  computeCurrentPrize = () => {
    const currentPrize = this.getCurrentPrize(this.state.isPrizeChanged);
    if (currentPrize) {
      const existingCountOfCurrentPrize = this.props.lotteryPool.winners.filter(winner => winner.prize.id === currentPrize.id).length + (this.state.bufferWinner ? 1 : 0);
      this.setState({
        currentPrize,
        existingCountOfCurrentPrize
      });
    } else {
      this.setState({
        noPrize: true
      });
    }
    return currentPrize;
  };
  getTitle = () => {
    if (this.state.existingCountOfCurrentPrize === 0 && !this.state.isPrizeChanged) {
      return `${this.state.currentPrize.title}(${this.state.currentPrize.totalCount}名)`
    } else if (this.state.noPrize) {
      return "";
    }
    return `${this.state.currentPrize.title}(${this.state.existingCountOfCurrentPrize} / ${this.state.currentPrize.totalCount})`
  };

  getContent = () => {
    if (!this.state.selectedParticipant.phone || (this.state.existingCountOfCurrentPrize === 0 && !this.drawService.isRolling && !this.state.isPrizeChanged)) {
      return "等待开奖";
    } else if (this.state.noPrize) {
      return "抽奖结束";
    }
    return (<div className="selectedParticipant">
      <div className="name">{this.state.selectedParticipant.name}</div>
      {/* <div className="phone">{maskPhone(this.state.selectedParticipant.phone, '😝😝😝😝')}</div> */}
    </div>)
  };

  getProgressButton = () => {
    if (this.state.noPrize) {
      return "抽奖结果";
    } else if (this.drawService) {
      return this.drawService.isRolling ? "stop" : (this.state.isPrizeChanged ? "next" : "start")
    }
    return '';
  };

  //revert the result of last drawing if the user click the redraw button
  getRedrawButton = () => {
    if (this.state.noPrize) {
      return null;
    }
    if (this.drawService) {
      return "重新抽奖";
    }
    return '';
  };

  launchFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  componentDidMount() {
    const totalLotteryCount = this.props.lotteryDrawing.setting.reduce((sum, l) => (sum + l.totalCount), 0);
    if (this.props.allParticipants.length < totalLotteryCount) {
      alert("奖项数大于参与者数");
      this.props.history.goBack();
      return;
    }
    this.launchFullscreen(document.documentElement);
    this.drawService = DrawService.from(this.props.allParticipants)
      .setOnSelectedChangedCallback((selectedItem) => {
        this.setState({
          selectedParticipant: selectedItem,
        });
      })
      .setNoDuplicate(true)
      .setOnPickBlockedChangedCallback((blocked) => {
        this.setState({
          btnDisabled: blocked
        });
      });
    this.computeCurrentPrize();
  }
}

LotteryDrawing.propTypes = {
  addWinner: PropTypes.func.isRequired,
  // currentPrize: PropTypes.shape(),
};
const mapStateToProps = state => ({
  allParticipants: state.dataReducer.lotteryPool.allParticipants,
  lotteryPool: state.dataReducer.lotteryPool,
  lotteryDrawing: state.dataReducer.lotteryDrawing
});
export default connect(mapStateToProps, { addWinner })(LotteryDrawing);
