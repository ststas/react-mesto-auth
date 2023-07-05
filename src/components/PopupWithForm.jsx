function PopupWithForm ({ name, title, buttonText, isOpen, onClose, onSubmit, isValid, children}) {

  function handleSubmit (event) {
    event.preventDefault()
    onSubmit()
  }

  function handleCloseByClickOnOverlay(event) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={handleCloseByClickOnOverlay}>
      <div className="popup__container" >
        <button type="button" className="popup__close-button" onClick={onClose}/>
        <h2 className="popup__title">{title}</h2>
        <form name={name} className="popup__form" noValidate="" onSubmit={handleSubmit}>
          {children}
          <button type="submit" className={`popup__submit-button ${!isValid && 'popup__submit-button_disabled'}`}>{buttonText}</button> 
        </form>  
      </div>
    </section>
  )
}

export default PopupWithForm