// import { stringHelper } from "./helpers/stringHelper";
// import { routeHelper } from "./helpers/routeHelper";

// /*
//   This module is extremely important, as the microservices only accept one specific request body in one specific 
//   order for each request. This module takes the formData user input, and re-orders it in the way the APIs are expecting.  
// */

// const modelMapper = {
//     individual: {
//         signUp: (userValues) => {
//             return {
//                 email: userValues.email,
//                 password: userValues.password,
//                 firstName: stringHelper.capitalizeEveryFirstLetter(userValues.firstName),
//                 lastName: stringHelper.capitalizeEveryFirstLetter(userValues.lastName),
//                 streetAddress: stringHelper.capitalizeEveryFirstLetter(userValues.streetAddress),
//                 city: stringHelper.capitalizeEveryFirstLetter(userValues.city),
//                 state: userValues.state,
//                 zip: userValues.zip,
//                 phone: userValues.phone === null ? "" : cleanPhoneNumber(userValues.phone),
//                 trade: userValues.trade,
//                 apprenticeshipLevel: userValues.apprenticeshipLevel,
//                 yearsExperience: userValues.yearsExperience,
//                 homeLocal: userValues.homeLocal
//             }
//         },
//         update: (userValues) => {
//             if (userValues.email !== undefined) {
//                 return {
//                     email: userValues.email,
//                     firstName: stringHelper.capitalizeEveryFirstLetter(userValues.firstName),
//                     lastName: stringHelper.capitalizeEveryFirstLetter(userValues.lastName),
//                     streetAddress: stringHelper.capitalizeEveryFirstLetter(userValues.streetAddress),
//                     city: stringHelper.capitalizeEveryFirstLetter(userValues.city),
//                     state: userValues.state,
//                     zip: userValues.zip,
//                     phone: userValues.phone === null ? "" : cleanPhoneNumber(userValues.phone),
//                     trade: userValues.trade,
//                     apprenticeshipLevel: userValues.apprenticeshipLevel,
//                     yearsExperience: userValues.yearsExperience,
//                     homeLocal: userValues.homeLocal,
//                     accountType: userValues.accountType
//                 }
//             } else if (userValues.indvEmail !== undefined) {
//                 return {
//                     email: userValues.indvEmail,
//                     firstName: stringHelper.capitalizeEveryFirstLetter(userValues.indvFirstName),
//                     lastName: stringHelper.capitalizeEveryFirstLetter(userValues.indvLastName),
//                     streetAddress: stringHelper.capitalizeEveryFirstLetter(userValues.indvStreetAddress),
//                     city: stringHelper.capitalizeEveryFirstLetter(userValues.indvCity),
//                     state: userValues.indvState,
//                     zip: userValues.indvZip,
//                     phone: userValues.indvPhone === null ? "" : cleanPhoneNumber(userValues.indvPhone),
//                     trade: userValues.indvTrade,
//                     apprenticeshipLevel: userValues.indvApprenticeshipLevel,
//                     yearsExperience: userValues.indvYearsExperience,
//                     homeLocal: userValues.indvHomeLocal,
//                     accountType: userValues.indvAccountType
//                 }
//             }
//         },
//         persistUserSettings: (userSession, userSetting) => {
//             return {
//                 userEmail: userSession.indvEmail,
//                 userId: userSession.id,
//                 userSetting: userSetting
//             }
//         },
//         findJobMatches: (userSession, jobValues) => {
//             const jobLengthRange = mapJobLength(jobValues);
//             const jobPayRange = mapJobPayRate(jobValues);
            
//             return {
//                 userId: userSession.id,
//                 email: userSession.indvEmail,
//                 state: jobValues.jobState,
//                 trade: userSession.indvTrade,
//                 minLength: jobLengthRange[0],
//                 maxLength: jobLengthRange[1],
//                 minPayRate: jobPayRange[0],
//                 maxPayRate: jobPayRange[1],
//                 perDiem: jobValues.jobPerDiem,
//                 shift: jobValues.jobShift
//             }
//         },
//         jobSearchFilters: (values, userSession) => {        
//             const jobPayRange = mapJobPayRate(values);
//             const jobLengthRange = mapJobLength(values);
    
//             return {
//                 userId: userSession.id,
//                 email: userSession.indvEmail,
//                 trade: userSession.indvTrade,
//                 jobStartDate: values.jobStartDate,
//                 jobMinLength: jobLengthRange[0],
//                 jobMaxLength: jobLengthRange[1],
//                 jobState: values.jobState,
//                 minPayRate: jobPayRange[0] ,
//                 maxPayRate: jobPayRange[1],
//                 perDiem: values.jobPerDiem === "No" ? 0 : values.jobPerDiem,
//                 yearsOfExperience: values.yearsOfExperience,
//                 shift: values.jobShift,
//                 isStateSearch: values.isStateSearch,
//                 isIgnoreActiveSearch: values.isIgnoreActiveSearch,
//                 page: values.page,
//                 limit: values.limit,
//                 sortMethod: values.sortMethod
//             }
//         },
//         saveJob: (job, userSession) => {
//             return {
//                 userId: userSession.id,
//                 jobId: job.contractorJobId
//             }
//         },
//         getSavedJobs: (userSession) => {
//             return {
//                 userId: userSession.id
//             }
//         },
//         notifyLocal: (userType, userSession, job) => {
//             return {
//                 userId: userSession.id,
//                 userEmail: userSession.indvEmail,
//                 userType: userType,
//                 savedJobId: job.savedJobId
//             }
//         },
//         removeSavedJob: (job, userSession) => {
//             return {
//                 userId: userSession.id,
//                 jobId: job.contractorJobId
//             }
//         },
//         batchRemoveSavedJob: (userId, userEmail, jobIdArray) => {
//             return {
//                 userId: userId,
//                 userEmail: userEmail,
//                 jobIds: jobIdArray
//             }
//         },
//         createUserAddedLocal: (userId, localNumber, trade, state) => {
//             return {
//                 userId: userId,
//                 local: localNumber,
//                 trade: trade,
//                 state: state
//             }
//         },
//         sendEmailForUserSubmittedLocal: (userId, email, userType, localNumber, trade, state) => {
//             return {
//                 userId: userId,
//                 email: email,
//                 userType: userType,
//                 local: localNumber
//             }
//         }
//     },
//     common: {
//         resetPasswordStepOne: (email, userType) => {
//             return {
//                 email: email,
//                 userType: userType    
//             }
//         },
//         resetPasswordStepTwo: (code, email, newPass) => {
//             return {
//                 email: email,
//                 confirmationCode: code,
//                 newPassword: newPass
//             }
//         },
//         contactUsMessage: (values) => {
//             return {
//                 firstName: stringHelper.capitalizeEveryFirstLetter(values.firstName),
//                 lastName: stringHelper.capitalizeEveryFirstLetter(values.lastName),
//                 email: values.email,
//                 subject: stringHelper.capitalizeEveryFirstLetter(values.subject), 
//                 body: values.body,
//             }
//         },
//     }, 
// }

// // HELPER METHODS

// const cleanPhoneNumber = (validRegexPhoneNumber) => {
//     const cleanedPhoneNumber = validRegexPhoneNumber.replace(/[-\s()]/g, '');
//     return cleanedPhoneNumber
// }

// const parseJobLengthRange = (values, jobLengthByRef) => {        
//     if (values.jobMinLength === "6+ Months" && values.jobMaxLength === null) {
//         jobLengthByRef.minLength = 24;
//     } else { 
//         jobLengthByRef.minLength = values.jobMinLength;
//         jobLengthByRef.maxLength = values.jobMaxLength;
//     }
// }

// const mapJobLength = (jobValues) => {
//     const jobMinMaxLengths = [];
//     let jobMinLength = null;
//     let jobMaxLength = null;
//     if (jobValues.jobLength !==  null) {
//         if (jobValues.jobLength === "Unknown") {
//             jobMinLength = jobValues.jobLength;
//             jobMaxLength = jobValues.jobLength;
//         } else {
//             const minLength = jobValues.jobLength.split('-')[0]?.trim();
//             jobMinLength = ( minLength === "" || minLength === undefined ) ? null : minLength;

//             const maxLength = jobValues.jobLength.split('-')[1]?.trim();
//             jobMaxLength = ( maxLength === "" || maxLength === undefined ) ? null : maxLength;
            
//         }
//     }
//     jobMinMaxLengths.push(jobMinLength, jobMaxLength);
//     return jobMinMaxLengths;
// }
// const mapJobPayRate = (jobValues) => {
//     const jobMinMaxPayRates = [];
//     let minPayRate = "0";
//     let maxPayRate = "99";
//     if (jobValues.jobPayRate !== null) {
//         if (jobValues.jobPayRate === "$55+") {
//             minPayRate = jobValues.jobPayRate.split('+')[0].split('$')[1];
//         } else {
//             const minPay = jobValues.jobPayRate.split('-')[0]?.trim().split('$')[1];
//             minPayRate = ( minPay === "" || minPay === undefined ) ? '0' : minPay;

//             const maxPay = jobValues.jobPayRate.split('-')[1]?.trim().split('$')[1];
//             maxPayRate = ( maxPay === "" || maxPay === undefined ) ? '99' : maxPay;
//         }
//     }
//     jobMinMaxPayRates.push(minPayRate, maxPayRate);
//     return jobMinMaxPayRates;
// }

// export default modelMapper;
// export { parseJobLengthRange };