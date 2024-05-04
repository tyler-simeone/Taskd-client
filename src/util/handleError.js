// import { INTERNAL_SERVER_ERR_MESSAGE } from "../appConstants";
// import i18next from "i18next";

// export const handleError = (err, displayErrorMessage, setIsSubmitting) => {
//     const t = i18next.t
//     if (err.message && err.type !== "ArgumentNullError" & !err.message.includes("Unexpected token")) { 
//         displayErrorMessage(t([err.message]));
//     } else {
//         displayErrorMessage(t("HandleErrors.Internal", INTERNAL_SERVER_ERR_MESSAGE));
//     }
//     if (setIsSubmitting)
//         setIsSubmitting(false);
// }