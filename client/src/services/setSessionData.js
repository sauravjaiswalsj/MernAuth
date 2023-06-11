export default function setSessionData(result) {
    const data = JSON.parse(result);
    const userData = JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
    });

    sessionStorage.setItem('user', userData);
}