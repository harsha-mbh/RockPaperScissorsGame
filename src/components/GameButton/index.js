import {ListElement, ButtonElement, ImageEl} from './styledComponent'

const GameButton = props => {
  const {choice, setYourChoice} = props
  const {id, imageUrl} = choice
  let testid
  switch (id) {
    case 'PAPER':
      testid = 'paperButton'
      break
    case 'ROCK':
      testid = 'rockButton'
      break
    case 'SCISSORS':
      testid = 'scissorsButton'
      break
    default:
      testid = null
  }
  const onClickButton = () => {
    setYourChoice(id)
  }
  return (
    <ListElement>
      <ButtonElement type="button" onClick={onClickButton} data-testid={testid}>
        <ImageEl src={imageUrl} alt={id} />
      </ButtonElement>
    </ListElement>
  )
}

export default GameButton
