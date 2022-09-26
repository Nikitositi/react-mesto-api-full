class Api {
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

  getData(additive) {
    return fetch(this._url + additive, {
      method: 'GET',
    }).then(this._checkResponseStatus);
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponseStatus);
  }

  getCardData() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponseStatus);
  }

  getCards(token) {
    return fetch(`${this.url}/cards`, {
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  patchProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponseStatus);
  }
  updateAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data,
      }),
    }).then(this._checkResponseStatus);
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponseStatus);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponseStatus);
  }

  handleCard(id, action) {
    if (action === true) {
      this._method = 'PUT';
    } else {
      this._method = 'DELETE';
    }
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: this._method,
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponseStatus);
  }
}

const api = new Api({
  // baseUrl: 'https://api.nikitositi.nomoredomains.sbs',
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
