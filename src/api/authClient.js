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
    signIn: async (payload) => {
        const resp = await fetch(`${authClient.baseURL}/user/authenticate`, {
            method: "POST",
            headers: authClient.getHeaders(),
            body: JSON.stringify(payload)
        });
        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }
        return responseHandler(parsedResp);
    },
    signUp: async (payload) => {
        const resp = await fetch(`${authClient.baseURL}/user`, {
            method: "POST",
            headers: authClient.getHeaders(),
            body: JSON.stringify(payload)
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
            headers: authClient.getHeaders(),
            body: JSON.stringify(payload)
        });
        
        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }

        return responseHandler(parsedResp);
    },
    initiateResetPassword: async (email) => {
        const resp = await fetch(`${authClient.baseURL}/user/initiateresetpassword?email=${email}`, {
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
    resetPassword: async (payload) => {
        const resp = await fetch(`${authClient.baseURL}/user/resetpassword`, {
            method: "POST",
            headers: authClient.getHeaders(),
            body: JSON.stringify(payload)
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
    }
  };