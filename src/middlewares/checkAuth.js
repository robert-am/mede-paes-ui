export default function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user == null){
        return false
    }
    if (user.status == true) {
        return true
    } else {
        return false
    }
}
