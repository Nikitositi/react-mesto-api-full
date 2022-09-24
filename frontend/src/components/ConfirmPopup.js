import PopupWithForm from "./PopupWithForm";

function ConfirmPopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();

    props.onDeleteCard(props.cardIdToDelete);
  }

  return (
    <PopupWithForm
      titleStyle={ {marginBottom: 0} }
      name="confirm"
      title="Вы уверены?"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonValue={props.buttonValue}
    ></PopupWithForm>
  );
}

export default ConfirmPopup;