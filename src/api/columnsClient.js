import { responseHandler } from "../util/responseHandler";

export const columnsClient = {
    get headers () { 
        return (
            {
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("jwt"))}`, 
                "Content-Type": "application/json", 
                "Accept": "application/json" 
            }
        )
    },
    baseDevURL: "http://localhost:5156",
    get baseURL() { return `${this.baseDevURL}/api/columns` }, 
    getColumns: (columnId, userId) => {
        return fetch(`${columnsClient.baseURL}?boardId=${columnId}&userId=${userId}`, {
                    method: "GET",
                    headers: columnsClient.headers,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    getColumn: (columnId, userId) => {
        return fetch(`${columnsClient.baseURL}/${columnId}?userId=${userId}`, {
                    method: "GET",
                    headers: columnsClient.headers,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    addColumn: (payload) => {
        return fetch(`${columnsClient.baseURL}`, {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: columnsClient.headers,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    updateColumn: (payload) => {
        return fetch(`${columnsClient.baseURL}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                    headers: columnsClient.headers,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    deleteColumn: (columnId, userId) => {
        return fetch(`${columnsClient.baseURL}?columnId=${columnId}&userId=${userId}`, {
                    method: "DELETE",
                    headers: columnsClient.headers,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    }
  };