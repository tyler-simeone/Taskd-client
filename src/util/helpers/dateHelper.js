export const dateHelper = {
    getCurrentDate: () => dateHelper.formatDateYYYYMMDD(new Date()),
    getProvidedDate: (date) => dateHelper.formatDateYYYYMMDD(date),
    isDateLessThanCurrentDate: (date) => (dateHelper.getProvidedDate(date) < dateHelper.getCurrentDate()),
    isDateEqualToCurrentDate: (date) => (dateHelper.getProvidedDate(date) === dateHelper.getCurrentDate()),
    isDateGreaterThanOrEqualToCurrentDate: (date) => (dateHelper.getProvidedDate(date) > dateHelper.getCurrentDate()),
    formatDateYYYYMMDD: (date) => {
        date = new Date(date);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },
    formatDateLongMonthShortDayYear: (dateToFormat) => {
        const postDateObj = new Date(dateToFormat);
        const options = { month: "long" };
        const month = new Intl.DateTimeFormat("en-US", options).format(postDateObj);
        const date = postDateObj.getDate();
        const year = postDateObj.getFullYear();
        return `${month} ${date}, ${year}`;
    },
    debugDates: (date) => {
        console.log("dateHelper.formatDateYYYYMMDD(): ", dateHelper.formatDateYYYYMMDD(new Date()));
        console.log("dateHelper.formatDateYYYYMMDD(date): ", dateHelper.formatDateYYYYMMDD(date));
    }
};