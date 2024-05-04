export const dateHelper = {
    formatDateLongMonthShortDayYear: (dateToFormat) => {
        const postDateObj = new Date(dateToFormat);
        const options = { month: "long" };
        const month = new Intl.DateTimeFormat("en-US", options).format(
            postDateObj
        );
        const date = postDateObj.getDate();
        const year = postDateObj.getFullYear();
        return `${month} ${date}, ${year}`;
    },
    isDateLessThanCurrentDate: (date) => {
        return (new Date(date).getTime() <= new Date().getTime())
    },
    isDateGreaterThanCurrentDate: (date) => {
        return (new Date(date).getTime() >= new Date().getTime())
    }
};