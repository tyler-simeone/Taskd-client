import { responseHandler } from "../util/responseHandler";

export const authClient = {
    getHeaders: () => { 
        return (
            {
                "Content-Type": "application/json", 
                "Accept": "application/json" 
            }
        )
    },
    baseDevURL: "http://localhost:5058",
    get baseURL() { return `${this.baseDevURL}/api/Auth` }, 
    signUp: async (payload) => {
        const resp = await fetch(`${authClient.baseURL}/user`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: authClient.getHeaders(),
        });

        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }

        return responseHandler(parsedResp);
    },
    resendConfirmationCode: async (email) => {
        const resp = await fetch(`${authClient.baseURL}/user/resendconfirmationcode?email=${email}`, {
            method: "POST",
            headers: authClient.getHeaders(),
        });
        
        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }

        return responseHandler(parsedResp);
    },
    confirmAccount: async (payload) => {
        const resp = await fetch(`${authClient.baseURL}/user/confirm`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: authClient.getHeaders(),
        });
        
        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }

        return responseHandler(parsedResp);
    },
    signIn: async (payload) => {
        const resp = await fetch(`${authClient.baseURL}/user/authenticate`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: authClient.getHeaders(),
        });
        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }
        return responseHandler(parsedResp);
    }
  };