function Form ({name, buttonText, onSubmit, isValid, children}) {

  function handleSubmit (event) {
    event.preventDefault()
    onSubmit()
  }
  
  return (
    <form name={name} className="popup__form" noValidate="" onSubmit={handleSubmit}>
      {children}
      <button type="submit" className={`popup__submit-button ${!isValid && 'popup__submit-button_disabled'}`}>
        {buttonText}
      </button> 
    </form>
  )
}

export default Form