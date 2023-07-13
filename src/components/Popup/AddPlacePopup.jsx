import PopupWithForm from './PopupWithForm'
import { useEffect } from 'react'
import useFormValidation from '../../hooks/useFormValidation'
import Input from '../Input'

function AddPlacePopup ({ isOpen, onClose, onAddPlace, isLoading }) {

  const {values, errors, isValid, handleChange, resetForm }  = useFormValidation()
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
      <Input
        type={'text'}
        name={'name'}
        placeHolder={'Название'}
        inputClassName={`popup__field ${errors.name && 'popup__field_type_error'}`}
        required={true}
        minLength={'2'}
        maxLength={'30'}
        value={name}
        onChange={handleChange}
        error={errors.name}
        spanClassName={'popup__error'}
      />
      <Input
        type={'url'}
        name={'link'}
        placeHolder={'Ссылка на картинку'}
        inputClassName={`popup__field ${errors.link && 'popup__field_type_error'}`}
        required={true}
        minLength={''}
        maxLength={''}
        value={link}
        onChange={handleChange}
        error={errors.link}
        spanClassName={'popup__error'}
      />
    </PopupWithForm>
  )
}

export default AddPlacePopup