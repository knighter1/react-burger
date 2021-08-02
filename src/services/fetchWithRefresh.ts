import { getCookie, setCookie } from "../utils/cookie";

interface IResponse extends Body
{
    ok: boolean;
}

const checkResponse = (response: IResponse) => {
	return response.ok ? response.json() : response.json().then((err: Error) => Promise.reject(err));
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

export const fetchWithRefresh = async (url: string, options: RequestInit) =>
{
    try
    {
		const res = await fetch(url, options);
		return await checkResponse(res);
	}
	catch (err)
    {
		if (err.message === "jwt expired")
        {
			const refreshData = await refreshToken();

			setCookie('refreshToken', refreshData.refreshToken);
			setCookie('accessToken', refreshData.accessToken);

            const headers = {
                Authorization: refreshData.accessToken
            }

			options.headers = { ...options.headers, ...headers };
            
            const res = await fetch(url, options);
            return await checkResponse(res);
		}
		else {
			return Promise.reject(err);
		}
	}
}