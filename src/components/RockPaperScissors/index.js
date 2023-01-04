import {Component} from 'react'
import GameButton from '../GameButton'
import RulesBtn from '../RulesBtn'
import {AppContainer, TopContainer, ImageEl} from './styledComponents'
import './index.css'

const gameResultConstants = {draw: 'DRAW', won: 'WON', lost: 'LOST'}

class RockPaperScissors extends Component {
  state = {
    score: 0,
    yourChoiceId: '',
    opponentChoiceId: '',
    gameResult: '',
    isGameRunning: true,
  }

  componentDidMount() {
    this.setOpponentChoice()
  }

  setOpponentChoice = () => {
    const {choicesList} = this.props
    const randInt = Math.floor(Math.random() * 3)
    const opponentChoice = choicesList[randInt]
    this.setState({opponentChoiceId: opponentChoice.id})
  }

  setYourChoice = yourId => {
    this.setState({yourChoiceId: yourId}, this.checkResult)
  }

  checkResult = () => {
    const {yourChoiceId, opponentChoiceId} = this.state

    if (opponentChoiceId === yourChoiceId) {
      this.setState(prevState => ({
        score: prevState.score,
        gameResult: gameResultConstants.draw,
      }))
    } else if (yourChoiceId === 'PAPER' && opponentChoiceId === 'ROCK') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        gameResult: gameResultConstants.won,
      }))
    } else if (yourChoiceId === 'SCISSORS' && opponentChoiceId === 'ROCK') {
      this.setState(prevState => ({
        score: prevState.score - 1,
        gameResult: gameResultConstants.lost,
      }))
    } else if (yourChoiceId === 'ROCK' && opponentChoiceId === 'PAPER') {
      this.setState(prevState => ({
        score: prevState.score - 1,
        gameResult: gameResultConstants.lost,
      }))
    } else if (yourChoiceId === 'PAPER' && opponentChoiceId === 'SCISSORS') {
      this.setState(prevState => ({
        score: prevState.score - 1,
        gameResult: gameResultConstants.lost,
      }))
    } else if (yourChoiceId === 'SCISSORS' && opponentChoiceId === 'PAPER') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        gameResult: gameResultConstants.won,
      }))
    } else if (yourChoiceId === 'ROCK' && opponentChoiceId === 'SCISSORS') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        gameResult: gameResultConstants.won,
      }))
    }
    this.setState({isGameRunning: false})
  }

  renderTitleScoreContainer = () => {
    const {score} = this.state
    return (
      <TopContainer className="title-score-container">
        <div className="title-container">
          <h1 className="title">ROCK PAPER SCISSORS</h1>
        </div>
        <div className="score-card">
          <p className="score-heading">Score</p>
          <p className="score">{score}</p>
        </div>
      </TopContainer>
    )
  }

  renderGameRunningView = () => {
    const {choicesList} = this.props
    return (
      <div className="game-view-container">
        <ul className="button-list-container">
          {choicesList.map(eachChoice => (
            <GameButton
              key={eachChoice.id}
              choice={eachChoice}
              setYourChoice={this.setYourChoice}
            />
          ))}
        </ul>
      </div>
    )
  }

  restartGame = () => {
    this.setState(
      {
        yourChoiceId: '',
        opponentChoiceId: '',
        isGameRunning: true,
      },
      this.setOpponentChoice,
    )
  }

  renderGameResultView = () => {
    const {choicesList} = this.props
    const {yourChoiceId, opponentChoiceId, gameResult} = this.state
    const yourChoice = choicesList.filter(choice => choice.id === yourChoiceId)
    console.log(yourChoice)
    const yourChoiceUrl = yourChoice[0].imageUrl
    const opponentChoice = choicesList.filter(
      choice => choice.id === opponentChoiceId,
    )
    console.log(opponentChoice)
    const opponentChoiceUrl = opponentChoice[0].imageUrl
    let gameResultText = ''
    switch (gameResult) {
      case gameResultConstants.won:
        gameResultText = 'YOU WON'
        break
      case gameResultConstants.lost:
        gameResultText = 'YOU LOSE'
        break
      case gameResultConstants.draw:
        gameResultText = 'IT IS DRAW'
        break
      default:
        gameResultText = ''
    }
    return (
      <div className="game-result-container">
        <div className="players-container">
          <div className="each-player-container">
            <h1 className="player-title">YOU</h1>
            <ImageEl src={yourChoiceUrl} alt="your choice" />
          </div>
          <div className="each-player-container">
            <h1 className="player-title">OPPONENT</h1>
            <ImageEl src={opponentChoiceUrl} alt="opponent choice" />
          </div>
        </div>
        <p className="game-result-text">{gameResultText}</p>
        <button
          type="button"
          className="play-again-btn"
          onClick={this.restartGame}
        >
          PLAY AGAIN
        </button>
      </div>
    )
  }

  renderGameViewsContainer = () => {
    const {isGameRunning} = this.state

    switch (isGameRunning) {
      case true:
        return this.renderGameRunningView()
      case false:
        return this.renderGameResultView()
      default:
        return null
    }
  }

  renderPopUpBtn = () => <RulesBtn />

  render() {
    return (
      <AppContainer className="app-container">
        {this.renderTitleScoreContainer()}
        {this.renderGameViewsContainer()}
        {this.renderPopUpBtn()}
      </AppContainer>
    )
  }
}

export default RockPaperScissors
