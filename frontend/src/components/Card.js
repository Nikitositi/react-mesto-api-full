import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((i) => i === currentUser._id);

  const cardDeleteButtonClassName = `button button_type_delete ${
    isOwn && 'button_owner'
  }`;
  const cardLikeButtonClassName = `button button_type_like ${
    isLiked && 'button_active'
  }`;

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    console.log(props.card._id);
    props.onCardDelete(props.card._id);
  }

  return (
    <li className="cards__item">
      <img
        className="cards__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="cards__wrapper">
        <p className="cards__title">{props.card.name}</p>
        <div className="cards__container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="cards__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
