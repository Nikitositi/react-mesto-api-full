import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef({});

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonValue={props.buttonValue}
    >
      <input
        type="url"
        className="popup__input popup__input_link"
        name="avatarlink"
        id="avatar-link-input"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
        required
      />
      <span className="popup__input-error" id="avatar-link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
