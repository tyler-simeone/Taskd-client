import { Constants } from "./Constants";
import { logout } from "../LogoutProvider"

export const handleError = (err, setError, setIsSubmitting) => {
    if (setIsSubmitting)
        setIsSubmitting(false);
    if (err.status === 401) { 
        // setError("Unauthorized. Please log in to continue.");
        logout();
    } else if (err.detail !== undefined) { 
        if (err.detail.includes('Password did not conform with policy: '))
            setError(err.detail.split(':')[1].trim())
        else
            setError(err.detail);
    } else if (err.message !== undefined && !err.message.includes("Unexpected end of JSON input")) { 
        setError(err.message);
    } else {
        setError(Constants.INTERNAL_SERVER_ERR_MESSAGE);
    }
}