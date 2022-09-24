import { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import auth from '../utils/auth';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
  const [hasInfoTooltipSuccessStatus, setHasInfoTooltipSuccessStatus] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: '',
    link: '',
  });
  const [cardIdToDelete, setCardIdToDelete] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  
  // Загрузка карточек и пользователя
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getCardData()])
        .then((res) => {
          const [userData, cardList] = res;
          setCurrentUser(userData);
          setEmail(userData.email);
          setCards(cardList.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);
  
  function getData() {
    auth.getData().then((res) => {
      if (!res.hasOwnProperty('message')) {
        setLoggedIn(true);
        history.push('/');
      } else {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        history.push('/sing-in');
      }
    });
  }
  
  useEffect(() => {
    getData();
  }, []);
  
  // Закрытие попапов на Esc
  useEffect(() => {
    function handleEscClick(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', handleEscClick);

    return () => {
      document.removeEventListener('keydown', handleEscClick);
    };
  }, []);

  function handleDeleteCardClick(cardId) {
    setCardIdToDelete(cardId);
    setIsConfirmPopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .handleCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteCard(cardIdToDelete) {
    api
      .deleteCard(cardIdToDelete)
      .then(() => {
        setCards(cards.filter((c) => c._id !== cardIdToDelete));
        setCardIdToDelete(null);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoToolTipPopupOpen(false);
    setSelectedCard({
      name: '',
      link: '',
    });
  }

  function handleUpdateUser(userInfo) {
    api
      .patchProfile(userInfo)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarInfo) {
    api
      .updateAvatar(avatarInfo.avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(cardInfo) {
    api
      .addNewCard(cardInfo)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegistration(data) {
    auth
      .register(data)
      .then(() => {
        setHasInfoTooltipSuccessStatus(true);
      })
      .then(() => {
        setIsInfoToolTipPopupOpen(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(
          'Ошибка при попытке зарегистрировать пользователя',
          err.message
        );
        setHasInfoTooltipSuccessStatus(false);
        setIsInfoToolTipPopupOpen(true);
      })
      .finnaly(() => {
        setIsInfoToolTipPopupOpen(false)
      })
  }

  function handleAuthorization(data) {
    setEmail(data.email);
    auth
      .authorize(data)
      .then((res) => {
        console.log(res);
        setHasInfoTooltipSuccessStatus(true);
        setIsInfoToolTipPopupOpen(true);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        setHasInfoTooltipSuccessStatus(false);
        setIsInfoToolTipPopupOpen(true);
        console.log(
          'Ошибка при попытке авторизовать пользователя',
          err.message
        );
      });
  }

  function handleLogout() {
    auth.logout().then(() => {
      localStorage.removeItem('jwt');
      setCurrentUser({});
      setEmail('');
      setLoggedIn(false);
      history.push('/sign-in');
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <div className="page">
          <div className="page__container">
            <Header loggedIn={loggedIn} email={email} onLogout={handleLogout} />
            <Switch>
              <Route exact path="/sign-up">
                <Register onSubmit={handleRegistration} />
                <InfoTooltip
                  isOpen={isInfoToolTipPopupOpen}
                  onClose={closeAllPopups}
                  status={hasInfoTooltipSuccessStatus}
                  action="зарегистрировались"
                />
              </Route>
              <Route exact path="/sign-in">
                <Login onSubmit={handleAuthorization} />
                <InfoTooltip
                  isOpen={isInfoToolTipPopupOpen}
                  onClose={closeAllPopups}
                  status={hasInfoTooltipSuccessStatus}
                  action="авторизовались"
                />
              </Route>

              <ProtectedRoute
                path="/"
                component={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCardClick}
                onLogout={handleLogout}
                email={email}
              />

              <Route>
                {!loggedIn ? <Redirect to="/sign-in" /> : <Redirect to="/" />}
              </Route>
            </Switch>

            {/* <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick}
            /> */}
            <Footer />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              buttonValue="Сохранить"
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              buttonValue="Добавить"
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              buttonValue="Сохранить"
            />

            <ConfirmPopup
              isOpen={isConfirmPopupOpen}
              onClose={closeAllPopups}
              onDeleteCard={handleDeleteCard}
              cardIdToDelete={cardIdToDelete}
              buttonValue="Да"
            ></ConfirmPopup>

            <ImagePopup
              isOpen={isImagePopupOpen}
              onClose={closeAllPopups}
              card={selectedCard}
            />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
