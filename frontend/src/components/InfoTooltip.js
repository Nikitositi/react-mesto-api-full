import successImage from "../images/success.svg";
import failImage from "../images/fail.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_type_infotooltip">
        <img
          className="popup__icon"
          src={props.status ? successImage : failImage}
          alt={props.status ? "Иконка успеха" : "Иконка неудачи"}
        />
        <h3 className="popup__title popup__title_type_infotooltip">
          {props.status
            ? `Вы успешно ${props.action}!`
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h3>
        <button
          className="button button_type_close"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;