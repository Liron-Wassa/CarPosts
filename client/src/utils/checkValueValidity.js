export const checkValueValidity = (value, rules) => {

    let isValid = false;

    if(rules.required) {
        isValid = value.trim() !== '';
    };
    if(rules.isEmail) {
        const regex = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
        isValid = regex.test(value);
    };
    if(rules.isPassword) {
        const regex = /(\d|[a-zA-Z]){6,}/g;
        isValid = regex.test(value);
    };

    return isValid;
};