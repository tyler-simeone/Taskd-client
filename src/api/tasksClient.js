import { responseHandler } from "../util/responseHandler";

const tasksClient = {
    httpHeaders: { "Content-Type": "application/json", "Accept": "application/json" },
    baseDevURL: "http://localhost:5273",
    get baseURL() { return `${this.baseDevURL}/api/tasks` }, 
    getTasks: (columnId) => {
        return fetch(`${tasksClient.baseURL}?columnId=${columnId}`, {
                    method: "GET",
                    headers: tasksClient.httpHeaders,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    getTaskDetails: (taskId, userId) => {
        return fetch(`${tasksClient.baseURL}/${taskId}?userId=${userId}`, {
                    method: "GET",
                    headers: tasksClient.httpHeaders,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    createTask: (payload) => {
        return fetch(`${tasksClient.baseURL}`, {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: tasksClient.httpHeaders,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    updateTask: (payload) => {
        return fetch(`${tasksClient.baseURL}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                    headers: tasksClient.httpHeaders,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    deleteTask: (payload) => {
        return fetch(`${tasksClient.baseURL}`, {
                    method: "DELETE",
                    body: JSON.stringify(payload),
                    headers: tasksClient.httpHeaders,
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    }
  };

  export default tasksClient;