class Auth {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  // Проверка ответа от сервера
  _checkResponseStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(data) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    }).then(this._checkResponseStatus);
  }

  authorize(data) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    })
      .then(this._checkResponseStatus)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        }
      })
      .catch((err) => console.log(err));
  }

  logout() {
    return fetch(`${this._url}/signout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponseStatus);
  }

  getData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  }
}

const auth = new Auth({
  baseUrl: 'https://api.nikitositi.nomoredomains.sbs',
  // baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default auth;
