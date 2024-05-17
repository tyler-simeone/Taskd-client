import { responseHandler } from "../util/responseHandler";

export const columnsClient = {
    httpHeaders: { "Content-Type": "application/json", "Accept": "application/json" },
    baseDevURL: "http://localhost:5156",
    get baseURL() { return `${this.baseDevURL}/api/columns` }, 
    getColumns: (columnId, userId) => {
        return fetch(`${columnsClient.baseURL}?boardId=${columnId}&userId=${userId}`, {
                    method: "GET",
                    headers: columnsClient.httpHeaders,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    getColumn: (columnId, userId) => {
        return fetch(`${columnsClient.baseURL}?columnId=${columnId}&userId=${userId}`, {
                    method: "GET",
                    headers: columnsClient.httpHeaders,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    addColumn: (payload) => {
        return fetch(`${columnsClient.baseURL}`, {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: columnsClient.httpHeaders,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    updateColumn: (payload) => {
        return fetch(`${columnsClient.baseURL}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                    headers: columnsClient.httpHeaders,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    deleteColumn: (columnId, userId) => {
        return fetch(`${columnsClient.baseURL}?columnId=${columnId}&userId=${userId}`, {
                    method: "DELETE",
                    headers: columnsClient.httpHeaders,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    }
  };