
import dotenv from 'dotenv';

dotenv.config();

export const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 
                            "http://127.0.0.1:8080";

export async function fetchWithTextResponse(url: string, options: RequestInit) {

    const result = await fetch(url, options)
        .then((response) => {

            if (response.ok) {
                return response.text();
            } else {
                throw Error(`Request rejected with status ${response.status}`);
            }

        })
        .catch((error) => {

            throw Error(error.message);

        });
    
    return result;

}

export async function fetchWithJSONResponse(url: string, options: RequestInit) {

    const result = await fetch(url, options)
        .then((response) => {

            if (response.ok) {
                return response.json();
            } else {
                throw Error(`Request rejected with status ${response.status}`);
            }

        })
        .catch((error) => {

            throw Error(error.message);

        });

    return result;

}
