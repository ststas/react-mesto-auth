import PopupWithForm from './PopupWithForm'
import { useState } from 'react'

function DeleteCardPopup ({ isOpen, onClose, onDeleteCard, cardToDelete }) {
  const [buttonText, setButtonText] = useState('Да')

async function handleSubmit() {
  setButtonText('Удаляем...')
    try {
      await onDeleteCard(cardToDelete)
    } 
    finally {
      onClose()
      setButtonText('Да')
    }
  } 

  return (  
    <PopupWithForm 
      name='newplace-delete'
      title='Вы уверены?'
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      cardToDelete={cardToDelete}
      isValid='true'
    ></PopupWithForm>
  )
}

export default DeleteCardPopup