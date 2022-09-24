import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  function handleCardNameChange(evt) {
    setCardName(evt.target.value);
  }

  function handleCardLinkChange(evt) {
    setCardLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonValue={props.buttonValue}
    >
      <input
        type="text"
        className="popup__input popup__input_title"
        name="name"
        id="card-title-input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={cardName || ""}
        onChange={handleCardNameChange}
        required
      />
      <span className="popup__input-error" id="card-title-input-error"></span>
      <input
        type="url"
        className="popup__input popup__input_link"
        name="link"
        id="card-link-input"
        placeholder="Ссылка на картинку"
        value={cardLink || ""}
        onChange={handleCardLinkChange}
        required
      />
      <span className="popup__input-error" id="card-link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
