
function userInfo (users,sortSerchId){

    const userInfo = users.find((users)=> {
        return  users.id === sortSerchId
    })
    var c = userInfo 
return userInfo ? c : ""
}


export default userInfo