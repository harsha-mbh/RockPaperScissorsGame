import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import {RulesButton, CloseBtn, Container, RulesImg} from './styledComponents'
import 'reactjs-popup/dist/index.css'

const RulesBtn = () => (
  <Container className="popup-container">
    <Popup
      modal
      trigger={
        <RulesButton type="button" className="trigger-button">
          Rules
        </RulesButton>
      }
    >
      {close => (
        <>
          <CloseBtn
            type="button"
            className="trigger-button"
            onClick={() => close()}
          >
            <RiCloseLine />
          </CloseBtn>
          <div>
            <RulesImg
              src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
              alt="rules"
            />
          </div>
        </>
      )}
    </Popup>
  </Container>
)
export default RulesBtn
