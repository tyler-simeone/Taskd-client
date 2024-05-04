import { responseHandler } from "../util/responseHandler";

export const notificationsClient = {
    baseDevURL: "http://localhost:8081",
    get baseURL() { return `${process.env.REACT_APP_LD_API_BASE_URL_STAGING}/notifications` },  // ALWAYS MAKE SURE THIS IS UPDATED WHEN DEPLOYING TO QA/PROD
    notifyLocal: (requestBody) => {
        return fetch(`${notificationsClient.baseURL}/notifylocal`, {
                    method: "POST",
                    body: JSON.stringify(requestBody),
                    headers: {
                        "Content-Type": "application/json",
                        'Accept': 'application/json'
                    },
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    },
    notifyJobLocal: (requestBody) => {
        return fetch(`${notificationsClient.baseURL}/notifyjoblocal`, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
        }).then(resp => resp.json())
        .then(resp => responseHandler(resp));
    },
    sendContactUsMessage: (requestBody) => {
        return fetch(`${notificationsClient.baseURL}/contactus`, {
                    method: "POST",
                       body: JSON.stringify(requestBody),
                    headers: {
                        "Content-Type": "application/json",
                        'Accept': 'application/json'
                    },
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));    
    },
    sendEmailForUserSubmittedLocal: (requestBody) => {
        return fetch(`${notificationsClient.baseURL}/useraddedlocalsuccess`, {
            method: "POST",
                body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
                }).then(resp => resp.json())
                .then(resp => responseHandler(resp));
    }
}