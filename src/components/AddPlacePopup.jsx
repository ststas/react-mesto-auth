import PopupWithForm from './PopupWithForm'
import { useEffect } from 'react'
import FormValidation from './Hooks/FormValidation'

function AddPlacePopup ({ isOpen, onClose, onAddPlace, isLoading }) {

  const {values, errors, isValid, handleChange, resetForm }  = FormValidation()
  const {name, link} = values

  useEffect(() => {
    resetForm()
  }, [resetForm, isOpen]); 

  function handleSubmit() {
    onAddPlace({ name, link });
  }

  return (  
    <PopupWithForm 
      name='newplace'   
      title='Новое место'
      buttonText={isLoading ? 'Создаем...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input 
        type="text" 
        id="newplace-name" 
        name="name" 
        placeholder="Название" 
        className={`popup__field popup__field_newplace_name ${errors.name && 'popup__field_type_error'}`}
        required
        minLength="2" 
        maxLength="30"
        value={name ?? ''} 
        onChange={handleChange} 
      />
      <span className={`popup__error ${errors.name && 'popup__error_visible'}`}>{errors.name}</span>
      <input 
        type="url" 
        id="newplace-link" 
        name="link" 
        placeholder="Ссылка на картинку" 
        className={`popup__field popup__field_newplace_link ${errors.link && 'popup__field_type_error'} `}
        required
        value={link ?? ''}
        onChange={handleChange}
      />
      <span className={`popup__error ${errors.link && 'popup__error_visible'}`}>{errors.link}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup