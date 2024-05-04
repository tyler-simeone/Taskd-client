

export const dateFormatter = (date) => {
    let newDate = date
    if (newDate) {
        const startDateObj = new Date(newDate.jobStartDate);
        const options = { month: "long" };
        const month = new Intl.DateTimeFormat("en-US", options).format(
            startDateObj
        );
        const date = startDateObj.getDate();
        const year = startDateObj.getFullYear();
        newDate = `${month} ${date} ${year} `;
    }
    return newDate
}

export const filterLocals = (arr) => {
    let allLocals = [];
    if (arr !== undefined && arr.length > 0) {
        arr.forEach(obj => {
            const localNumbers = {
                value: obj.LocalNumber,
                label: obj.LocalNumber
            }
            allLocals.push(localNumbers);
        });
        
        return allLocals.sort((a, b) => a.value - b.value);
    }
    return allLocals;
}
