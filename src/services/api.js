import { getCookie } from "../utils/cookie";
import { fetchWithRefresh } from "./fetchWithRefresh";

export const loginRequest = async (email, password) => {
    return await fetch('https://norma.nomoreparties.space/api/auth/login', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ email: email, password: password })
    });
};

export const logoutRequest = async () => {
    const refreshToken = getCookie('refreshToken');
    return await fetch('https://norma.nomoreparties.space/api/auth/logout', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ token: refreshToken })
    });
};

export const getUserRequest = async () => {
    const accessToken = getCookie('accessToken');
    return await fetchWithRefresh('https://norma.nomoreparties.space/api/auth/user', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    })
}