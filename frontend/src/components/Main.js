import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__container">
            <img
              src={currentUser.avatar}
              alt="Аватар профиля"
              className="profile__avatar"
            />
            <div
              className="profile__update-avatar"
              onClick={props.onEditAvatar}
            ></div>
            <div className="profile__info">
              <div className="profile__wrapper">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button
                  className="button button_type_edit"
                  type="button"
                  onClick={props.onEditProfile}
                ></button>
              </div>
              <p className="profile__activity">{currentUser.about}</p>
            </div>
          </div>
          <button
            className="button button_type_add"
            type="button"
            onClick={props.onAddPlace}
          ></button>
        </section>

        <section className="photos">
          <ul className="cards">
            {props.cards.map((card) => {
              return (
                <Card
                  card={card}
                  key={card._id}
                  onCardClick={props.onCardClick}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                />
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
