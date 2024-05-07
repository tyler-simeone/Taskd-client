import { responseHandler } from "../util/responseHandler";

const usersClient = {
    httpHeaders: { "Content-Type": "application/json", "Accept": "application/json" },
    baseDevURL: "http://localhost:8088",
    get baseURL() { return `${this.baseDevURL}/users` }, 
    signUp: (payload) => {
        return fetch(`${usersClient.baseURL}/`, {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: usersClient.httpHeaders,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    signIn: (payload) => {
        return fetch(`${usersClient.baseURL}/`, {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: usersClient.httpHeaders,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    get: (payload) => {
        return fetch(`${usersClient.baseURL}/`, {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: usersClient.httpHeaders,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    update: (payload) => {
        return fetch(`${usersClient.baseURL}/`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                    headers: usersClient.httpHeaders,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    persistUserSettings: (requestBody) => {
        return fetch(`${usersClient.baseURL}/gs`, {
                    method: "POST",
                    body: JSON.stringify(requestBody),
                    headers: usersClient.httpHeaders,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    }
  };

  export default usersClient;