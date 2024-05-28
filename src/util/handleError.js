import { Constants } from "./Constants";

export const handleError = (err, setError) => {
    console.log("err: ", err);
    // console.log("err: ", err);
    // if (err.statusCode !== undefined && err.statusCode === 401) { 
    //     setError("Unauthorized. Please log in to continue.");
    // } else 
    if (err.detail !== undefined) { 
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