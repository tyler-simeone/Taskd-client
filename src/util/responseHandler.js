export const responseHandler = (resp) => {
    console.log("resp: ", resp);
    if (resp.statusCode) {
        switch(resp.statusCode) {
            case 400:
            case 401:
            case 403:
            case 404:
            case 500:
                throw resp;
            default:
                return resp;
        }
    } else {
        switch(resp.status) {
            case 400:
            case 401:
            case 403:
            case 404:
            case 500:
                throw resp;
            default:
                return resp;
        }
    }
}