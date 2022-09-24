function PopupWithForm(props) {
  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      props.onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup_opened"
      }`}
      onClick={handleOverlayClick}
    >
      <div className="popup__container">
        <h3 className="popup__title" style={props.titleStyle}>
          {props.title}
        </h3>
        <form
          className="popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <input
            type="submit"
            className="popup__button"
            name="submit"
            value={props.buttonValue}
          />
        </form>
        <button
          className="button button_type_close"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
