import { usePopupClose } from '../../hooks/usePopupClose'
import Popup from './Popup'
import Form from '../Form'

function PopupWithForm ({ name, title, buttonText, isOpen, onClose, onSubmit, isValid, children}) {
  usePopupClose(isOpen, onClose)

  

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
        <h2 className="popup__title">{title}</h2>
        <Form name={name} buttonText={buttonText} onSubmit={onSubmit} isValid={isValid}>
          {children}
        </Form>
    </Popup>
  )
}

export default PopupWithForm