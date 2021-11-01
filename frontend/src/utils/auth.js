export const baseUrl = 'https://auth.nomoreparties.co'

function checkResponse(res) {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`))
}

export function register(email, password) {
    return fetch(`${baseUrl}/signup`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            password, email
        })
    })
        .then(res => checkResponse(res))
}

export function authorization(email, password) {
    return fetch(`${baseUrl}/signin`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            password, email
        })
    })
        .then(res => checkResponse(res))
}

export function getToken(token) {
    return fetch(`${baseUrl}/users/me`, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        method: 'GET',
    })
        .then(res => checkResponse(res))
}