import unionTrue from '../images/union-true.svg'
import unionFalse from '../images/union-false.svg'

function InfoTooltip ({ name, isOpen, onClose, isLogSuccessful }) {

  function handleCloseByClickOnOverlay(event) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={handleCloseByClickOnOverlay}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <img 
          src={isLogSuccessful ? unionTrue : unionFalse} 
          className="popup__image popup__image_type_info"
          alt={isLogSuccessful ? 'Картинка с галочкой' : 'Картинка с крестиком'}
        />
        <h2 className="popup__title popup__title_type_info">{isLogSuccessful ? 'Вы успешно \n зарегистрировались!' : 'Что-то пошло не так! \n Попробуйте ещё раз.'}</h2>
      </div>
    </section>
  )
  
}

export default InfoTooltip

