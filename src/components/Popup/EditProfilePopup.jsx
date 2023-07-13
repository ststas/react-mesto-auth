import PopupWithForm from './PopupWithForm'
import Input from '../Input'
import { useEffect, useContext } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import useFormValidation from '../../hooks/useFormValidation'

function EditProfilePopup ({ isOpen, onClose, onUpdateUser, isLoading }) {
  
  const { values, setValues, errors, isValid, handleChange, resetForm } = useFormValidation()
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
      <Input
        type={'text'}
        name={'name'}
        placeHolder={'Ваше имя'}
        inputClass={''}
        required={true}
        minLength={'2'}
        maxLength={'40'}
        value={name}
        onChange={handleChange}
        error={errors.name}
      />
      <Input
        type={'text'}
        name={'about'}
        placeHolder={'Ваша профессия'}
        inputClass={''}
        required={true}
        minLength={'2'}
        maxLength={'200'}
        value={about}
        onChange={handleChange}
        error={errors.name}
      />
    </PopupWithForm>
  )
} 

export default EditProfilePopup