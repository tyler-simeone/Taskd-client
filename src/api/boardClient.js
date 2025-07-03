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
    getBoard: async (boardId, userId) => {
        const resp = await fetch(`${boardsClient.baseURL}/${boardId}?userId=${userId}`, {
            method: "GET",
            headers: boardsClient.headers,
        });
        
        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }
        
        return responseHandler(parsedResp);
    },
    getBoards: async (userId) => {
        const resp = await fetch(`${boardsClient.baseURL}?userId=${userId}`, {
            method: "GET",
            headers: boardsClient.headers,
        });        
        
        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }
        
        return responseHandler(parsedResp);
    },
    addBoard: async (payload) => {
        const resp = await fetch(`${boardsClient.baseURL}`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: boardsClient.headers,
        });
        
        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }
        
        return responseHandler(parsedResp);
    },
    updateBoardName: async (payload) => {
        const resp = await fetch(`${boardsClient.baseURL}/boardName`, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: boardsClient.headers,
        });
        
        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }
        
        return responseHandler(parsedResp);
    },
    updateBoard: async (payload) => {
        const resp = await fetch(`${boardsClient.baseURL}`, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: boardsClient.headers,
        });
        
        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }
        
        return responseHandler(parsedResp);
    },
    deleteBoard: async (boardId, userId) => {
        const resp = await fetch(`${boardsClient.baseURL}/${boardId}?userId=${userId}`, {
            method: "DELETE",
            headers: boardsClient.headers,
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