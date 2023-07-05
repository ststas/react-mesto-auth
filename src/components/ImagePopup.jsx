function ImagePopup ({ name, card, isOpen, onClose }) {

  function handleCloseByClickOnOverlay(event) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <section className={`popup popup_picture_background popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={handleCloseByClickOnOverlay}>
      <div className="popup__picture-container">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <figure className="popup__figure">
          <img src={card?.link ? card.link : "#"} className="popup__image" alt={card?.name ? card.name : ""}/>
          <figcaption className="popup__image-caption">{card?.name}</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default ImagePopup