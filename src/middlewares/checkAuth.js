export default function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user == null){
        return false
    }
    if (user.access_token != "") {
        return true
    } else {
        return false
    }
}
