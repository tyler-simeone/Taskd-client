import { responseHandler } from "../util/responseHandler";

export const tasksClient = {
    token: "eyJraWQiOiJYNGhFdmRVOTV0a0xiS2hxUFJRVWx1cFU1d2dyN3VrRXE3U1J2Q2VaQXZVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2NGM4NzQ4OC1jMDUxLTcwODEtODk0OC0xNjM1MmY4MWU4ZjUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfRDhvakxUMHVHIiwiY29nbml0bzp1c2VybmFtZSI6IjY0Yzg3NDg4LWMwNTEtNzA4MS04OTQ4LTE2MzUyZjgxZThmNSIsIm9yaWdpbl9qdGkiOiIyZGYxYThlMi0wY2JhLTRjNTYtOTlmOS0zODg5MDQ0YzExZDMiLCJhdWQiOiIyaGtucjlwanZ0NDljcDk3bTczNzhhYTJrcSIsImV2ZW50X2lkIjoiMTE3OWYxNTMtZmNjYS00ZDgwLWIzOWYtZWU4Yzg5ODg0MWI4IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MTY0OTc1MDAsIm5hbWUiOiJUZXN0IFVzZXI2IiwiZXhwIjoxNzE2NTAxMTAwLCJpYXQiOjE3MTY0OTc1MDAsImp0aSI6ImE1NWRkMjM3LWNhNTQtNGZmMC05YWUzLWRjZDA0Y2EzZTgyZCIsImVtYWlsIjoiZGlya2Z1QGh5Z3JvZ2VuZXZhbGxlZS5vcmcifQ.UkT-iW8BNwRwpmAqE6kB13c3yCW6sdKWn4SZhVTRAcjOIsuZwN77CksaizcwWI_QvFKsQUpuYiGQnWmq8uTSQ6eHzF-tSDxASsC5_GwDuAXzkfbMiMtVumoYwc1uladam2FZ7wb4xAqji0MXrVMDPvSyXp6tTtwIPJKSbERexs6ajh11b3R7Gaw_JGnJ2QzbUdxc6thyCnfpolRJyKwhia6Q3xZ0sMYzxXwlRPqbfr8X5qQp7IvlR41ClNnHCRF2E8UdbzUF2BHgRYGK7lc-SMpv14-y1e26tnFxozotnejSTIJKFGy6qrXZS3kpo0k9QO9W33bL6IXnjQBbmyFvbQ",
    get bearerToken() { return this.token }, 
    getHeaders: () => { 
        return (
            {
                "Authorization": `Bearer ${tasksClient.bearerToken}`, 
                "Content-Type": "application/json", 
                "Accept": "application/json" 
            }
        )
    },
    baseDevURL: "http://localhost:5273",
    get baseURL() { return `${this.baseDevURL}/api/tasks` }, 
    getTasks: (columnId) => {
        return fetch(`${tasksClient.baseURL}?columnId=${columnId}`, {
                    method: "GET",
                    headers: tasksClient.getHeaders(),
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    getTask: (taskId, userId) => {
        return fetch(`${tasksClient.baseURL}/${taskId}?userId=${userId}`, {
                    method: "GET",
                    headers: tasksClient.getHeaders(),
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    createTask: (payload) => {
        return fetch(`${tasksClient.baseURL}`, {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: tasksClient.getHeaders(),
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    updateTask: (payload) => {
        return fetch(`${tasksClient.baseURL}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                    headers: tasksClient.getHeaders(),
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    deleteTask: (taskId, userId) => {
        return fetch(`${tasksClient.baseURL}/${taskId}?userId=${userId}`, {
                    method: "DELETE",
                    headers: tasksClient.getHeaders(),
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    }
  };