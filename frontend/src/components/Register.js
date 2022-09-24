import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value)
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log(email, password)
    props.onSubmit({
      email: email,
      password: password
    });
  }

  return (
    <section className="sign">
      <h1 className="sign__title">Регистрация</h1>
      <form
        className="sign__form"
        name="sign-up-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          type="email"
          name="email"
          className="sign__input"
          placeholder="Email"
          value={email || ""}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          name="password"
          className="sign__input"
          placeholder="Пароль"
          value={password || ""}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit" className="button button_type_sign">
          Зарегистрироваться
        </button>
      </form>
      <p className="sign__text">
        Уже зарегистрированы?&nbsp;
        <Link to="/sign-in" className="button sign__link">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
