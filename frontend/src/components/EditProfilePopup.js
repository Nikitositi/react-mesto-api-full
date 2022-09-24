import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonValue={props.buttonValue}
    >
      <input
        type="text"
        className="popup__input popup__input_name"
        name="name"
        id="profile-name-input"
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleNameChange}
        required
      />
      <span className="popup__input-error" id="profile-name-input-error"></span>
      <input
        type="text"
        className="popup__input popup__input_activity"
        name="about"
        id="profile-activity-input"
        placeholder="Введите вид деятельности"
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleDescriptionChange}
        required
      />
      <span
        className="popup__input-error"
        id="profile-activity-input-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
