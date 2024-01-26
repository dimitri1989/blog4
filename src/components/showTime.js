
function showTime (users,blogUserId){
    const userInfo = users.find((users)=> {
        return  users.id === blogUserId
    })
    var c = userInfo 
return userInfo ? c.name  : "დაფიქსირდა შეცდომა სახელის წამოღებისას"
}


export default showTime 