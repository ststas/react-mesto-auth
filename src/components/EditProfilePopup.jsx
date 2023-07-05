import PopupWithForm from './PopupWithForm'
import { useEffect, useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import FormValidation from './Hooks/FormValidation'

function EditProfilePopup ({ isOpen, onClose, onUpdateUser, isLoading }) {
  
  const { values, setValues, errors, isValid, handleChange, resetForm } = FormValidation()
  const {name, about} = values
  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    resetForm()
    setValues({name: currentUser.name, about: currentUser.about })
  }, [currentUser, setValues, resetForm, isOpen]); 

  function handleSubmit() {
    onUpdateUser({ name, about });
  } 
  
  return (  
    <PopupWithForm 
      name='profile'
      title='Редактировать профиль'
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input 
        type="text" 
        id="profile-name" 
        name="name" 
        placeholder="Ваше имя" 
        className={`popup__field  popup__field_profile_name ${errors.name && 'popup__field_type_error'}`}
        required
        minLength="2" 
        maxLength="40"
        value={name ?? ''} 
        onChange={handleChange}
        
        
      />
      <span 
        id="profile-name-error " 
        className={`popup__error ${errors.name && 'popup__error_visible'}`}
      >
        {errors.name}
      </span>
      <input 
        type="text" 
        id="profile-occupation" 
        name="about" 
        placeholder="Ваша профессия" 
        className={`popup__field popup__field_profile_occupation ${errors.about && 'popup__field_type_error'}`}
        required 
        minLength="2" 
        maxLength="200" 
        value={about ?? ''}
        onChange={handleChange} 
        
      />
      <span 
        id="profile-occupation-error " 
        className={`popup__error ${errors.about && 'popup__error_visible'}`}
      >
        {errors.about}
      </span>
    </PopupWithForm>
  )
} 

export default EditProfilePopup