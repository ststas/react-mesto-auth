import PopupWithForm from './PopupWithForm'
import useFormValidation from '../../hooks/useFormValidation'
import Input from '../Input'
import { useEffect } from 'react'

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const { values, errors, isValid, handleChange, resetForm }  = useFormValidation()
  const {avatar} = values

  useEffect(() => {
    resetForm()
  }, [resetForm, isOpen]); 

  function handleSubmit() {
    onUpdateAvatar({ avatar })
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
      <Input 
        type={'url'}
        name={'avatar'}
        placeHolder={'Ссылка на картинку'}
        inputClassName={`popup__field popup__field_margin_top ${errors.avatar && 'popup__field_type_error'}`}
        required={true}
        minLength={''}
        maxLength={''}
        value={avatar}
        onChange={handleChange}
        error={errors.avatar}
        spanClassName={'popup__error'}
      />
    </PopupWithForm>
  )
}

export default EditAvatarPopup


