import PopupWithForm from './PopupWithForm'
import FormValidation from './Hooks/FormValidation'
import { useRef, useEffect } from 'react'

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const { values, errors, isValid, handleChange, resetForm }  = FormValidation()
  const {avatar} = values

  const avatarRef = useRef()

  useEffect(() => {
    resetForm()
  }, [resetForm, isOpen]); 

  function handleSubmit() {
    onUpdateAvatar({ avatar: avatarRef.current.value })
  } 

  return (  
    <PopupWithForm 
      name='profile-avatar'
      title='Обновить аватар'
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input 
        ref={avatarRef}
        type="url" 
        id="avatar" 
        name="avatar" 
        placeholder="Ссылка на картинку" 
        className={`popup__field popup__field_margin_top popup__field_avatar_link ${errors.avatar && 'popup__field_type_error'}`}
        required
        value={avatar ?? ''} 
        onChange={handleChange} 
      />            
      <span id="avatar-error" className={`popup__error ${errors.avatar && 'popup__error_visible'}`}>{errors.avatar}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup


