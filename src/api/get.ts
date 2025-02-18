// Constants
import ENDPOINTS from '../constants/endpoints';

interface GetDataProps {
    authToken: string,
    endpoint: string,
    querystring?: string,
}

interface ReturnProps {
    ok: boolean,
    error?: string,
    body?: any,
    status: number,
}

const getData = async ({
    authToken,
    endpoint,
    querystring,
}: GetDataProps):Promise<ReturnProps> => {
    if (!ENDPOINTS[endpoint] || !authToken) {
        return {
            ok: false,
            error: 'Invalid Endpoint or Authorization Token provided',
            status: 500
        }
    }
    console.log("Auth", authToken);
    let url = ENDPOINTS.baseUrl + ENDPOINTS[endpoint];

    if (querystring) {
        url = url + '?' + querystring;
    }

    if (!url) {
        return {
            ok: false,
            error: 'Invalid URL provided',
            status: 500,
        };
    }
    try {
        console.log("URL", url);
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken,
            },
        });
        console.log("res", res);

        if (!res.ok) {
            const errData = await res.json();
            console.error("Error - Failed Get Request");

            return {
                ok: false,
                error: errData,
                status: res.status
            };
        }

        const resData = await res.json();
        return {
            ok: true,
            status: 200,
            body: JSON.parse(resData.body),
        };

    } catch (err: any) { 
        console.error("Error - Failed Get Request: ", err.message);
        return {
            ok: false,
            error: err.message,
            status: 500,
        };
    }
}

export default getData;
