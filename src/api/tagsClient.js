import { responseHandler } from "../util/responseHandler";

export const tagsClient = {
    get headers() { 
        return (
            {
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("jwt"))}`, 
                "Content-Type": "application/json", 
                "Accept": "application/json" 
            }
        )
    },
    baseDevURL: "http://localhost:5280",
    get baseURL() { return `${this.baseDevURL}/api/tags` }, 
    // For the list of available tags to add to a task, per board.
    getTagsByBoardId: async (boardId, userId) => {
        const resp = await fetch(`${tagsClient.baseURL}?boardId=${boardId}&userId=${userId}`, {
            method: "GET",
            headers: tagsClient.headers,
        });
        
        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }

        return responseHandler(parsedResp);
    },
    // Gets all tags that are tied to tasks on the board.
    getTagsByTaskId: async (taskId, boardId) => {
        const resp = await fetch(`${tagsClient.baseURL}/task/${taskId}?boardId=${boardId}`, {
            method: "GET",
            headers: tagsClient.headers,
        });
        
        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }

        return responseHandler(parsedResp);
    },
    getTaskTagsByBoardId: async (boardId, userId) => {
        const resp = await fetch(`${tagsClient.baseURL}/board/${boardId}?userId=${userId}`, {
            method: "GET",
            headers: tagsClient.headers,
        });
        
        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }

        return responseHandler(parsedResp);
    },
    createTag: async (payload) => {
        const resp = await fetch(`${tagsClient.baseURL}`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: tagsClient.headers,
        });

        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }

        return responseHandler(parsedResp);
    },
    addTagToTask: async (payload) => {
        const resp = await fetch(`${tagsClient.baseURL}/task`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: tagsClient.headers,
        });

        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }

        return responseHandler(parsedResp);
    },
    // updateTag: async (payload) => {
    //     const resp = await fetch(`${tagsClient.baseURL}`, {
    //         method: "PUT",
    //         body: JSON.stringify(payload),
    //         headers: tagsClient.headers,
    //     });
        
    //     let parsedResp = resp;
    //     try {
    //         parsedResp = await resp.json();
    //     } catch (err) {
    //         // swallow error here. just means no response body was returned.
    //     }

    //     return responseHandler(parsedResp);
    // },
    deleteTag: async (tagId, userId) => {
        const resp = await fetch(`${tagsClient.baseURL}/${tagId}?userId=${userId}`, {
            method: "DELETE",
            headers: tagsClient.headers,
        });

        let parsedResp = resp;
        try {
            parsedResp = await resp.json();
        } catch (err) {
            // swallow error here. just means no response body was returned.
        }

        return responseHandler(parsedResp);
    },
    deleteTagFromTask: async (taskTagId, userId) => {
        const resp = await fetch(`${tagsClient.baseURL}/task/?taskTagId=${taskTagId}&userId=${userId}`, {
            method: "DELETE",
            headers: tagsClient.headers,
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