import { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value)
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit({
      email: email,
      password: password
    });
  }

  return (
    <section className="sign">
      <h1 className="sign__title">Вход</h1>
      <form className="sign__form" name="sign-up-form" onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          name="email"
          value={email || ""}
          className="sign__input"
          placeholder="Email"
          required
          onChange={handleEmailChange}
        />
        <input
          type="password"
          name="password"
          value={password || ""}
          className="sign__input"
          placeholder="Пароль"
          required
          onChange={handlePasswordChange}
        />
        <button type="submit" className="button button_type_sign">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
