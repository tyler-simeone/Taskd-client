import { responseHandler } from "../util/responseHandler";

export const boardsClient = {
    get headers () { 
        return (
            {
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("jwt"))}`, 
                "Content-Type": "application/json", 
                "Accept": "application/json" 
            }
        )
    },
    baseDevURL: "http://localhost:5032",
    get baseURL() { return `${this.baseDevURL}/api/Boards` }, 
    getBoard: (boardId, userId) => {
        return fetch(`${boardsClient.baseURL}/${boardId}?userId=${userId}`, {
                    method: "GET",
                    headers: boardsClient.headers,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    getBoards: (userId) => {
        return fetch(`${boardsClient.baseURL}?userId=${userId}`, {
                    method: "GET",
                    headers: boardsClient.headers,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    addBoard: (payload) => {
        return fetch(`${boardsClient.baseURL}`, {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: boardsClient.headers,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    updateBoard: (payload) => {
        return fetch(`${boardsClient.baseURL}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                    headers: boardsClient.headers,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    deleteBoard: (boardId, userId) => {
        return fetch(`${boardsClient.baseURL}/${boardId}?userId=${userId}`, {
                    method: "DELETE",
                    headers: boardsClient.headers,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    }
  };