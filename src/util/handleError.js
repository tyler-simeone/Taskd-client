import { Constants } from "./Constants";

export const handleError = (err, displayErrorMessage) => {
    if (err.message && err.type !== "ArgumentNullError" & !err.message.includes("Unexpected token")) { 
        displayErrorMessage(err.message);
    } else {
        displayErrorMessage(Constants.INTERNAL_SERVER_ERR_MESSAGE);
    }
}