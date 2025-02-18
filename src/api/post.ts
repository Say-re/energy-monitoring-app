// Constants
import ENDPOINTS from '../constants/endpoints';

interface postDataProps<T> {
    auth: string,
    data: T,
    headers?: {[key: string]: string},
    endpoint?: string,
    customUrl?: string,
    method?: string,
}

const postData = async <T>({
    auth,
    data,
    headers,
    endpoint,
    customUrl,
    method,
}:postDataProps<T>): Promise<{ok: boolean, message: string, status: number}> => {
    if ((!endpoint && !customUrl && !ENDPOINTS?.[endpoint || '']) || !data) {
        console.error("Endpoint or data undefined in postData()");
        return {
            ok: false,
            message: "Endpoint or data undefined",
            status: 500,
        }
    }
    const url = customUrl ? customUrl : `${ENDPOINTS.baseUrl}${ENDPOINTS[endpoint || '']}`;

    try {
        console.log("Data", data);
        console.log("URL", url);
        const res = await fetch(url, {
            method: method || "POST",
            headers: headers || {
                "Authorization": auth,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }); 
        if (!res.ok) {
            return {
                message: "HTTP error occurred while making Post request",
                    status: res.status,
                ok: false,
            }
        }
        console.log("RESPONSE", res);
        let message;
        try {
            message = await res.json();
        } catch (err) {
            message = 'Message unavailable from response';
        }
        return {
            status: res.status,
            message,
            ok: true,
        };

    } catch (err: any) {
        console.error("Error while making Post request: \n", err.message)
            return {
                status: 500,
                message: err.message,
                ok: false,
            };
    }
}

export default postData;
