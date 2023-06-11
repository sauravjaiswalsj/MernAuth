const validateEmail = (email) => {
    const reg = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");

    if (email.length === 0) { return false; }
    return reg.test(email);
}

const validatePassword = (password) => {
    const passwordRegex = new RegExp("^(?=.*[0-9])"
        + "(?=.*[a-z])(?=.*[A-Z])"
        + "(?=.*[@#$%^&+=])"
        + "(?=\\S+$).{8,20}$");

    const passwordRegexCheck = new RegExp("^(?=.*[0-9])"
        + "(?=.*[a-z])(?=.*[A-Z])"
        + "(?=\\S+$).{8,20}$");

    return passwordRegexCheck.test(password);
}

const validateData = (firstName, lastName, email, password) => {
    if (firstName === '' || lastName === '' || email === '' || password === '') {
        return false;
    }
    return true;
}

module.exports = {
    validateData,
    validateEmail,
    validatePassword
}