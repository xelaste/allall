export const authHeader = function () {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('player'));
    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}