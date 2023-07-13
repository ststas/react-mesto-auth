import PopupWithForm from './PopupWithForm'

function DeleteCardPopup ({ isOpen, onClose, onDeleteCard, cardToDelete, isLoading }) {

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
    />
  )
}

export default DeleteCardPopup