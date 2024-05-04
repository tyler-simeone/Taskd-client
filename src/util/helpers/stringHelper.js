export const stringHelper = {
    formatPhoneNumber: (phone) => {
        var cleaned = ('' + phone).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match)
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        else 
            return "Not provided";
    },
    capitalizeEveryFirstLetter: (textString) => {
        return textString.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    }
};