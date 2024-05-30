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
    getColumns: async (boardId, userId) => {
        const resp = await fetch(`${columnsClient.baseURL}?boardId=${boardId}&userId=${userId}`, {
            method: "GET",
            headers: columnsClient.headers,
        });

        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }

        return responseHandler(parsedResp);
    },
    getColumn: async (columnId, userId) => {
        const resp = await fetch(`${columnsClient.baseURL}/${columnId}?userId=${userId}`, {
            method: "GET",
            headers: columnsClient.headers,
        });
        
        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }

        return responseHandler(parsedResp);
    },
    addColumn: async (payload) => {
        const resp = await fetch(`${columnsClient.baseURL}`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: columnsClient.headers,
        });
        
        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }

        return responseHandler(parsedResp);
    },
    updateColumn: async (payload) => {
        const resp = await fetch(`${columnsClient.baseURL}`, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: columnsClient.headers,
        });
        
        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }

        return responseHandler(parsedResp);
    },
    deleteColumn: async (columnId, userId) => {
        const resp = await fetch(`${columnsClient.baseURL}?columnId=${columnId}&userId=${userId}`, {
            method: "DELETE",
            headers: columnsClient.headers,
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