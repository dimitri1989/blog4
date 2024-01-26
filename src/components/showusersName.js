
function showusersName (users,blogUserId){
    const userInfo = users.find((users)=> {
        return  users.id === blogUserId
    })
    var c = userInfo 
return userInfo ? c.name  : ""
}


export default showusersName