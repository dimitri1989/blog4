
function dashboardUserInfo (users,newsId){

    const userInfo = users.find((users)=> {
        return  users.id === newsId
    })
    var c = userInfo 
return userInfo ? c.name : ""
}


export default dashboardUserInfo