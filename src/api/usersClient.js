import { responseHandler } from "../util/responseHandler";

const usersClient = {
    httpHeaders: { "Content-Type": "application/json", "Accept": "application/json" },
    baseDevURL: "http://localhost:8088",
    get baseURL() { return `${process.env.REACT_APP_LD_API_BASE_URL_STAGING}/users` },  // ALWAYS MAKE SURE THIS IS UPDATED WHEN DEPLOYING TO QA/PROD
    signIn: (formData) => {
        const userType = formData.userType;
        const loginRequestModel = {
            email: formData.email,
            password: formData.password
        };
        switch(userType) {
            case 1:
                return usersClient.individual.signIn(loginRequestModel);
            case 2:
                return usersClient.contractor.signIn(loginRequestModel);
            case 3:
                return usersClient.union.signIn(loginRequestModel);
            default:
                throw new Error("Invalid user type.");
        }
    },
    individual: {
        signUp: (requestModel) => {
            return fetch(`${usersClient.baseURL}/individual`, {
                        method: "POST",
                        body: JSON.stringify(requestModel),
                        headers: usersClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        signIn: (requestModel) => {
            return fetch(`${usersClient.baseURL}/individual/signin`, {
                        method: "POST",
                        body: JSON.stringify(requestModel),
                        headers: usersClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        get: (requestModel) => {
            return fetch(`${usersClient.baseURL}/individual/get`, {
                        method: "POST",
                        body: JSON.stringify(requestModel),
                        headers: usersClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        update: (requestModel) => {
            return fetch(`${usersClient.baseURL}/individual/update`, {
                      method: "PUT",
                      body: JSON.stringify(requestModel),
                      headers: {
                          "Content-Type": "application/json",
                          'Accept': 'application/json'
                      },
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        persistUserSettings: (requestBody) => {
            return fetch(`${usersClient.baseURL}/individual/settings`, {
                        method: "POST",
                        body: JSON.stringify(requestBody),
                        headers: usersClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        createUserAddedLocal: (requestBody) => {
            return fetch(`${usersClient.baseURL}/individual/local`, {
                        method: "POST",
                        body: JSON.stringify(requestBody),
                        headers: {
                            "Content-Type": "application/json",
                            'Accept': 'application/json'
                        },
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
    },
    contractor: {
        signUp: (requestModel) => {
            return fetch(`${usersClient.baseURL}/contractor`, {
                        method: "POST",
                        body: JSON.stringify(requestModel),
                        headers: usersClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        signIn: (requestModel) => {
            return fetch(`${usersClient.baseURL}/contractor/signin`, {
                        method: "POST",
                        body: JSON.stringify(requestModel),
                        headers: usersClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        get: (requestModel) => {
            return fetch(`${usersClient.baseURL}/contractor/get`, {
                        method: "POST",
                        body: JSON.stringify(requestModel),
                        headers: usersClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        update: (requestModel) => {
            return fetch(`${usersClient.baseURL}/contractor/update`, {
                        method: "PUT",
                        body: JSON.stringify(requestModel),
                        headers: usersClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
    },
    union: {
        signUp: (requestModel) => {
            return fetch(`${usersClient.baseURL}/union`, {
                        method: "POST",
                        body: JSON.stringify(requestModel),
                        headers: usersClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        signIn: (requestModel) => {
            return fetch(`${usersClient.baseURL}/union/signin`, {
                        method: "POST",
                        body: JSON.stringify(requestModel),
                        headers: usersClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        get: (requestModel) => {
            return fetch(`${usersClient.baseURL}/union/get`, {
                        method: "POST",
                        body: JSON.stringify(requestModel),
                        headers: usersClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        update: (requestModel) => {
            return fetch(`${usersClient.baseURL}/union/update`, {
                        method: "PUT",
                        body: JSON.stringify(requestModel),
                        headers: usersClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => {
                        if (resp.error)
                            throw resp;
                        
                        return resp;
                    });
        },
    },
    common: {
        signOut: () => {
            return fetch(`${usersClient.baseURL}/signOut`, {
                        method: "POST",
                        headers: usersClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        getUnionLocals: (requestModel) => {
            return fetch(`${usersClient.baseURL}/union/locals`, {
                        method: "POST",
                        body: JSON.stringify(requestModel),
                        headers: usersClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        createStripeSubscription: (postData) => {
            return fetch(`${usersClient.baseURL}/createsubscription`, {
                        method: "POST",
                        body: JSON.stringify(postData),
                        headers: usersClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        resetPassword: (requestModel) => {
            return fetch(`${usersClient.baseURL}/forgotPassword`, {
                        method: "POST",
                        body: JSON.stringify(requestModel),
                        headers: usersClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        confirmCode: (requestModel) => {
            return fetch(`${usersClient.baseURL}/confirm`, {
                        method: "POST",
                        body: JSON.stringify(requestModel),
                        headers: usersClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        resendConfirmationCode: (requestModel) => {
            return fetch(`${usersClient.baseURL}/resendCode`, {
                        method: "POST",
                        body: JSON.stringify(requestModel),
                        headers: usersClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
    },
  };

  export default usersClient;