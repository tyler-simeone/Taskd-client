export const responseHandler = (resp) => {
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