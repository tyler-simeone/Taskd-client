import { responseHandler } from "../util/responseHandler";

const jobsClient = {
    httpHeaders: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    baseDevURL: "http://localhost:8080",
    get baseURL() { return `${process.env.REACT_APP_LD_API_BASE_URL_STAGING}/jobs` },  // ALWAYS MAKE SURE THIS IS UPDATED WHEN DEPLOYING TO QA/PROD
    individual: {
        getMatchedJobs: (jobSearchFilters) => {
            return fetch(`${jobsClient.baseURL}/individual/jobmatches`, {
                        method: "POST",
                        body: JSON.stringify(jobSearchFilters),
                        headers: jobsClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        getJobs: (jobSearchFilters) => {
            return fetch(`${jobsClient.baseURL}/individual/search`, {
                        method: "POST",
                        body: JSON.stringify(jobSearchFilters),
                        headers: jobsClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        saveJob: (newJobObj) => {
            return fetch(`${jobsClient.baseURL}/individual/savejob`, {
                        method: "POST",
                        body: JSON.stringify(newJobObj),
                        headers: jobsClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        getSavedJobs: (requestBody) => {
            return fetch(`${jobsClient.baseURL}/individual/saved`, {
                        method: "POST",
                        body: JSON.stringify(requestBody),
                        headers: jobsClient.httpHeaders,
                    }).then(resp => resp.json())
                    .catch(err => console.error(err));
        },
        getSavedJobIds: (requestBody) => {
            return fetch(`${jobsClient.baseURL}/individual/saved/ids`, {
                        method: "POST",
                        body: JSON.stringify(requestBody),
                        headers: jobsClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        deleteSavedJob: (requestBody) => {
            return fetch(`${jobsClient.baseURL}/individual/saved/delete`, {
                        method: "POST",
                        body: JSON.stringify(requestBody),
                        headers: jobsClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        batchDeleteSavedJobs: (requestBody) => {
            return fetch(`${jobsClient.baseURL}/individual/saved/batchdelete`, {
                        method: "POST",
                        body: JSON.stringify(requestBody),
                        headers: jobsClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
    },
    contractor: {
        getJob: (userId, jobId) => {
            const jobSearchFilters = {
                userId: userId,
                jobId: jobId
            };
            return fetch(`${jobsClient.baseURL}/contractor/job`, {
                        method: "POST",
                        body: JSON.stringify(jobSearchFilters),
                        headers: jobsClient.httpHeaders,
                    }).then(resp =>  resp.json())
                    .then(resp => responseHandler(resp));
        },
        getJobs: (jobSearchFilters) => {
            return fetch(`${jobsClient.baseURL}/contractor/jobs`, {
                        method: "POST",
                        body: JSON.stringify(jobSearchFilters),
                        headers: jobsClient.httpHeaders,
                    }).then(resp =>  resp.json())
                    .then(resp => responseHandler(resp));
        },
        getJobGroups: (requestBody) => {
            return fetch(`${jobsClient.baseURL}/contractor/jobgroups`, {
                        method: "POST",
                        body: JSON.stringify(requestBody),
                        headers: jobsClient.httpHeaders,
                    }).then(resp =>  resp.json())
                    .then(resp => responseHandler(resp));
        },
        postJob: (newJobObj) => {
            return fetch(`${jobsClient.baseURL}/contractor/jobs/add`, {
                        method: "POST",
                        body: JSON.stringify(newJobObj),
                        headers: jobsClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        validateNewJob: (requestBody) => {
            return fetch(`${jobsClient.baseURL}/contractor/jobs/validate`, {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: jobsClient.httpHeaders,
            }).then(resp => resp.json())
            .then(resp => responseHandler(resp));
        },
        updateJob: (requestBody) => {
          return fetch(`${jobsClient.baseURL}/contractor/jobs/update`, {
              method: "PUT",
              body: JSON.stringify(requestBody),
              headers: jobsClient.httpHeaders,
          }).then(resp => resp.json())
          .catch(err => console.error(err))
        },
        getJobAnalytics: (requestBody) => {
            return fetch(`${jobsClient.baseURL}/contractor/jobs/analytics`, {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: jobsClient.httpHeaders,
            }).then(resp => resp.json())
            .then(resp => responseHandler(resp));
        },
        deleteJob: (requestBody) => {
            return fetch(`${jobsClient.baseURL}/contractor/job`, {
                method: "DELETE",
                body: JSON.stringify(requestBody),
                headers: jobsClient.httpHeaders,
            }).then(resp => resp.json())
            .then(resp => responseHandler(resp));
        },
        deleteJobGroup: (requestBody) => {
            return fetch(`${jobsClient.baseURL}/contractor/jobgroup`, {
                method: "DELETE",
                body: JSON.stringify(requestBody),
                headers: jobsClient.httpHeaders,
            }).then(resp => resp.json())
            .then(resp => responseHandler(resp));
        },
    },
    union: {
        getJob: (userId, jobId) => {
            const jobSearchFilters = {
                userId: userId,
                jobId: jobId
            };
            return fetch(`${jobsClient.baseURL}/union/job`, {
                        method: "POST",
                        body: JSON.stringify(jobSearchFilters),
                        headers: jobsClient.httpHeaders,
                    }).then(resp =>  resp.json())
                    .then(resp => responseHandler(resp));
        },
        getJobs: (jobSearchFilters) => {
            return fetch(`${jobsClient.baseURL}/union/jobs`, {
                        method: "POST",
                        body: JSON.stringify(jobSearchFilters),
                        headers: jobsClient.httpHeaders,
                    }).then(resp =>  resp.json())
                    .then(resp => responseHandler(resp));
        },
        getJobGroups: (requestBody) => {
            return fetch(`${jobsClient.baseURL}/union/jobgroups`, {
                        method: "POST",
                        body: JSON.stringify(requestBody),
                        headers: jobsClient.httpHeaders,
                    }).then(resp =>  resp.json())
                    .then(resp => responseHandler(resp));
        },
        postJob: (newJobObj) => {
            return fetch(`${jobsClient.baseURL}/union/jobs/add`, {
                        method: "POST",
                        body: JSON.stringify(newJobObj),
                        headers: jobsClient.httpHeaders,
                    }).then(resp => resp.json())
                    .then(resp => responseHandler(resp));
        },
        validateNewJob: (requestBody) => {
            return fetch(`${jobsClient.baseURL}/union/jobs/validate`, {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: jobsClient.httpHeaders,
            }).then(resp => resp.json())
            .then(resp => responseHandler(resp));
        },
        updateJob: (requestBody) => {
          return fetch(`${jobsClient.baseURL}/union/jobs/update`, {
              method: "PUT",
              body: JSON.stringify(requestBody),
              headers: jobsClient.httpHeaders,
          }).then(resp => resp.json())
          .catch(err => console.error(err))
        },
        getJobAnalytics: (requestBody) => {
            return fetch(`${jobsClient.baseURL}/union/jobs/analytics`, {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: jobsClient.httpHeaders,
            }).then(resp => resp.json())
            .then(resp => responseHandler(resp));
        },
        deleteJob: (requestBody) => {
            return fetch(`${jobsClient.baseURL}/union/job`, {
                method: "DELETE",
                body: JSON.stringify(requestBody),
                headers: jobsClient.httpHeaders,
            }).then(resp => resp.json())
            .then(resp => responseHandler(resp));
        },
        deleteJobGroup: (requestBody) => {
            return fetch(`${jobsClient.baseURL}/union/jobgroup`, {
                method: "DELETE",
                body: JSON.stringify(requestBody),
                headers: jobsClient.httpHeaders,
            }).then(resp => resp.json())
            .then(resp => responseHandler(resp));
        },
    },
  };

  export default jobsClient;