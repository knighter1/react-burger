import { getCookie, setCookie } from "../utils/cookie";

const checkResponse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const refreshToken = () =>
{
    const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({
			token: getCookie('refreshToken')
		})
	};

    return fetch('https://norma.nomoreparties.space/api/auth/token', options)
	.then(checkResponse);
}

export const fetchWithRefresh = async (url, options) =>
{
    try {
		const res = await fetch(url, options);
		return await checkResponse(res);
	}
	catch (err) {
		if (err.message === "jwt expired") {
			const refreshData = await refreshToken();

			setCookie('refreshToken', refreshData.refreshToken);
			setCookie('accessToken', refreshData.accessToken);

			options.headers.Authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
		}
		else {
			return Promise.reject(err);
		}
	}
}