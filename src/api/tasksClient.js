import { responseHandler } from "../util/responseHandler";

export const tasksClient = {
    get headers() { 
        return (
            {
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("jwt"))}`, 
                "Content-Type": "application/json", 
                "Accept": "application/json" 
            }
        )
    },
    baseDevURL: "http://localhost:5273",
    get baseURL() { return `${this.baseDevURL}/api/tasks` }, 
    getTasks: async (columnId) => {
        const resp = await fetch(`${tasksClient.baseURL}?columnId=${columnId}`, {
            method: "GET",
            headers: tasksClient.headers,
        });
        

        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }

        return responseHandler(parsedResp);
    },
    getTask: async (taskId, userId) => {
        const resp = await fetch(`${tasksClient.baseURL}/${taskId}?userId=${userId}`, {
            method: "GET",
            headers: tasksClient.headers,
        });
        

        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }

        return responseHandler(parsedResp);
    },
    createTask: async (payload) => {
        const resp = await fetch(`${tasksClient.baseURL}`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: tasksClient.headers,
        });
        

        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }

        return responseHandler(parsedResp);
    },
    updateTask: async (payload) => {
        const resp = await fetch(`${tasksClient.baseURL}`, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: tasksClient.headers,
        });
        

        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }

        return responseHandler(parsedResp);
    },
    dropTask: async (payload) => {
        const resp = await fetch(`${tasksClient.baseURL}/dropped`, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: tasksClient.headers,
        });

        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }

        return responseHandler(parsedResp);
    },
    deleteTask: async (taskId, userId) => {
        const resp = await fetch(`${tasksClient.baseURL}/${taskId}?userId=${userId}`, {
            method: "DELETE",
            headers: tasksClient.headers,
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