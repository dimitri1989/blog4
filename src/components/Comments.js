import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import autorimg from './icons/autor.jpg'
import './Comments.css'
import users from '../data/users';
import showusersName from './showusersName'
import userInfo from './userInfo'
import '../media.css'


const Comments = ({blog,handlerRenewBlog}) => {
  const [comentsInfo,setComentsinfo] = useState(blog)
useEffect(()=>{
  if(blog){
    setComentsinfo(blog)
  }

},[blog])
//const userinf= userInfo(users,key)
  var createdTime =  blog && blog.created_at.slice(0, -17)
    const params = useParams()
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const [sendValue, setSendValue] = useState({title:"",email:"",name:"",website:""});
    const [erorrSms,setErrorSms] = useState("")
    const [checkinputText,setCheckinputText] = useState('')
    const [postAdded,setPostAdded] = useState("d-none")
    const [names,setnames] = useState(["dima"])
    const [textInfo,setTextinfo] = useState("")
    
    //text border and 
    const [text,setText] = useState({title:"form-control",email:"divlabel",name:"divlabel",website:"divlabel"})
    function onChange(e,name){
        setSendValue({...sendValue,[name]: e.target.value })
        setnames(name)
      }
      
      useEffect(()=>{
        checkInputs(names,sendValue)
      },[sendValue])
      function checkInputs(names,sendValue){
       
        if(sendValue[names] !== undefined){
          if(!sendValue.title.length === 0){
            console.log("sesssss");
            setText({...text,title:' form-control border border-danger'})
            //console.log(sendValue[names].length, [names]);
         }
         
         else{
            setText({...text,title:'form-control'})
          }
        }
      }
      //!sendValue.email.length === 0 || !sendValue.name.length === 0
      function addNewsHandler(e){
        e.preventDefault();
        if(sendValue.title.length === 0){
          setText({...text,title:'form-control border border-danger'})
          console.log("ses");
        }else{
          setText({...text,title:'form-control '})
           setCheckinputText('d-none')
           axios.post("https://apitest.reachstar.io/comment/add/" + params.info,{
            comment:sendValue.title,
            
            
            
           })
           .then(resposne => {
            if(resposne.status === 200){
              setText({...text,title:'form-control '})
              handlerRenewBlog()
              setPostAdded("d-block text-success mt-3 fs-3")
              setTextinfo("კომენტარი წარმატებით დაემატა")
              
              setTimeout(() => {
                setPostAdded("d-none")
                
                setSendValue({title:"",email:"",name:"",website:""})
              }, 3000);
              
              
            }
           }).catch(error => error)
           setErrorSms("")
        }
    
      
      }
     function deleteHandlerComent(comentId){
      
        axios.delete('https://apitest.reachstar.io/comment/delete/' + comentId)
        .then(response => {
          if(response.status ===200){
            handlerRenewBlog()
            
            setPostAdded("d-block text-danger mt-3 fs-3")
            setTextinfo("კომენტარი წაიშალა")
            
            setTimeout(() => {
              setPostAdded("d-none")
              
            
            }, 2000);
          }
        })
        
     }
    
  return (
    <div className='comments'>
        <h2 className='comments-h2'>{}COMMENTS</h2>
        <form onSubmit={(e) => addNewsHandler(e)}>
              
              <textarea id="comment" value={sendValue.title} className={text.title}  rows="10"  cols="80" onChange={(e)=> onChange(e,"title")}/>
              <div className='input-forms  d-flex justify-content-between'>
              <label htmlFor="email" className={text.email}>Email <input type='email' className='form-control' value={sendValue.email} onChange={(e)=> onChange(e,"email")} /> </label>
              <label htmlFor="username" className={text.name}>Name <input type='text' className='form-control' value={sendValue.name} onChange={(e)=> onChange(e,"name")} /></label>
              <label htmlFor="username" className={text.website}>Website <input type='text' className='form-control' value={sendValue.website} onChange={(e)=> onChange(e,"website")} /></label>
                
              </div>
             
              <input
                    type="submit"
                    className="readon-btn mt-3 typology-pagination"
                    value="Add Post"
                  />
                  <div className={postAdded}>{textInfo}</div>
            </form>
            {/* <div className='comment-list mb-5'>
              <div className='coment-list-autor'>
                <div className='autor-img'><img src={autorimg}/></div>
                <div className='comment-info ms-3'>
                {showusersName(users, blog && blog.user_id) } {createdTime }
                {console.log(showusersName(users, blog && blog.user_id))}
                  <h2 className='comment-info-h2'>TAYLOR VAUGHN</h2>
                  <h3 className='comment-info-h3'>March 13, 2017 at 9:24 am</h3>
                  <p className='comment-info-text'>Rapidiously formulate synergistic innovation rather than tactical materials.<br/> Distinctively aggregate compelling alignments via alternative mindshare. Energistically implement.</p>
                </div>
              </div>
            </div> */}
            {comentsInfo && comentsInfo.comments.map((comment,index)=>{
              const userinf= userInfo(users,comment.user_id)
             
             return <div className='comment-list' key={index}>
              <button type='button' onClick={()=>deleteHandlerComent(comment.id)} className='delete-btn-comment'>x</button>
              <div className='coment-list-autor'>
                <div className='autor-img autor-img2'><img src={userinf.img}/></div>
                <div className='comment-info ms-3'>
                  <h2 className='comment-info-h2'>{showusersName(users, blog && blog.user_id)}</h2>
                  <h3 className='comment-info-h3'>{comment.created_at.slice(0, -17)}</h3>
                  <p className='comment-info-text'>{comment.comment}</p>
                </div>
              </div>
            </div>
            })}
            {/* <div className='comment-list'>
              <div className='coment-list-autor'>
                <div className='autor-img'><img src={autorimg}/></div>
                <div className='comment-info ms-3'>
                  <h2 className='comment-info-h2'>TAYLOR VAUGHN</h2>
                  <h3 className='comment-info-h3'>March 13, 2017 at 9:24 am</h3>
                  <p className='comment-info-text'>Rapidiously formulate synergistic innovation rather than tactical materials.<br/> Distinctively aggregate compelling alignments via alternative mindshare. Energistically implement.</p>
                </div>
              </div>
            </div> */}
    </div>
  )
}

export default Comments