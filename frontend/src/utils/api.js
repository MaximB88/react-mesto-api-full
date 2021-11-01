import {apiConfig, headers} from './constants.js'; 

class Api {
    
    constructor({baseUrl}, headers) {
        this._basuUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`))
    }

    getUserInfo() {
        return fetch(`${this._basuUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    getCards() {
        return fetch(`${this._basuUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    setUserInfo(data) {
        return fetch(`${this._basuUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._checkResponse)
    }

    setUserAvatar(data) {
        return fetch(`${this._basuUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._checkResponse)
    }

    setNewCard(data) {
        return fetch(`${this._basuUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkResponse)
    }

    deleteCard(cardId) {
       return fetch(`${this._basuUrl}/cards/${cardId}`, {
           method: 'DELETE',
           headers: this._headers
       })
        .then(this._checkResponse)
    }

    changeLikeCount(cardId, data) {
        return fetch(`${this._basuUrl}/cards/likes/${cardId}`, {
            method: data ? 'PUT' : 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

}

const api = new Api(apiConfig, headers);
export default api;