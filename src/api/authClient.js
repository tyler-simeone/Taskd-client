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
    baseDevURL: "http://localhost:5273",
    get baseURL() { return `${this.baseDevURL}/api/Auth` }, 
    signUp: async (payload) => {
        const resp = await fetch(`${authClient.baseURL}/user`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: authClient.getHeaders(),
        });
        const parsedResp = await resp.json();
        return responseHandler(parsedResp);
    },
    confirmSignUp: async (payload) => {
        const resp = await fetch(`${authClient.baseURL}/user/confirm`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: authClient.getHeaders(),
        });
        const parsedResp = await resp.json();
        return responseHandler(parsedResp);
    },
    signIn: async (payload) => {
        const resp = await fetch(`${authClient.baseURL}/user/authenticate`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: authClient.getHeaders(),
        });
        const parsedResp = await resp.json();
        return responseHandler(parsedResp);
    }
  };