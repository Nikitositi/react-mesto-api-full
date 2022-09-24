import { Link, Route, Switch } from "react-router-dom";
import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Место" className="header__logo" />
      <Switch>
        <Route path="/sign-up">
          <Link
            to="/sign-in"
            className={`button button_place_header ${
              !props.loggedIn ? "button_open" : ""
            }`}
          >
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link
            to="/sign-up"
            className={`button button_place_header ${
              !props.loggedIn ? "button_open" : ""
            }`}
          >
            Регистрация
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__info">
            <p className="header__email">{props.email}</p>
            <button
              className="button button_type_exit"
              onClick={props.onLogout}
            >
              Выход
            </button>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
