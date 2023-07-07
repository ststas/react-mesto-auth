import PopupWithForm from './PopupWithForm'

function DeleteCardPopup ({ isOpen, onClose, onDeleteCard, cardToDelete, isLoading }) {
  // const [buttonText, setButtonText] = useState('Да')

// async function handleSubmit() {
//   setButtonText('Удаляем...')
//     try {
//       await onDeleteCard(cardToDelete)
//     } 
//     finally {
//       onClose()
//       setButtonText('Да')
//     }
//   } 

  function handleSubmit() {
    onDeleteCard(cardToDelete)
  }

  return (  
    <PopupWithForm 
      name='newplace-delete'
      title='Вы уверены?'
      buttonText={isLoading ? 'Удаляем...' : 'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      cardToDelete={cardToDelete}
      isValid='true'
    ></PopupWithForm>
  )
}

export default DeleteCardPopup