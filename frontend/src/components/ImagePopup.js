function ImagePopup(props) {
  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      props.onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_image ${props.isOpen && "popup_opened"}`}
      onClick={handleOverlayClick}
    >
      <div className="popup__wrapper">
        <figure className="popup__figure">
          <img
            className="popup__image"
            src={props.isOpen ? props.card.link : ""}
            alt={props.isOpen ? props.card.name : ""}
          />
          <figcaption className="popup__caption">
            {props.isOpen ? props.card.name : ""}
          </figcaption>
        </figure>
        <button
          className="button button_type_close"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
