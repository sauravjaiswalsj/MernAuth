export default function setSessionData(token) {
    sessionStorage.setItem('user', token);
}