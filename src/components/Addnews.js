import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Addnews.css'
import axios from 'axios';
import Footer from './Footer'

const Addnews = () => {
  
  const [value, setValue] = useState('');
  const [postAdded,setPostAdded] = useState("d-none")
  const [sendValue, setSendValue] = useState({title:"",description:""});
  const [erorrSms,setErrorSms] = useState("")
  const [checkinputText,setCheckinputText] = useState('')
  var regex = /(<([^>]+)>)/ig
  //const [status,setStatus] = useState(false)
  function onChange(e,name){
    setSendValue({...sendValue,[name]: e.target.value })
  }
  function addNewsHandler(e){
    e.preventDefault();
    if(sendValue.title.length === 0 || value.replace(regex, "").length == 0){
       setCheckinputText('text-danger')
       setErrorSms("*Fill in the text field and the title field")
    }else{
       setCheckinputText('d-none')
       axios.post("https://apitest.reachstar.io/blog/add",{
        title:sendValue.title,
        description:value
        
       })
       .then(resposne => {
        if(resposne.status === 200){
          setPostAdded("d-block text-success mt-3")
          setTimeout(() => {
            setPostAdded("d-none")
            setValue('')
            setSendValue({title:"",description:""})
          }, 3000);
          
          
        }
       }).catch(error => error)
       setErrorSms("")
    }

  
  }
  //console.log(sendValue.description);
  return (
    <div className='addnews'>
      <div className="news-section changeNews-sectionPosition">
      <div className="news-container">
        <div className="news">
          <div className="news-content">
            <div className='LATEST-STORIES mb-2'>ADD NEW POST</div>
            <div className={checkinputText}>{erorrSms}</div>
            <form className='add-post' onSubmit={(e) => addNewsHandler(e)}>
              <input type='text' required placeholder='Add Title' value={sendValue.title} onChange={(e)=> onChange(e,"title")} />
              <ReactQuill theme="snow" required value={value} onChange={setValue} />
              
              <input
                    type="submit"
                    className="readon-btn mt-3 typology-pagination"
                    value="Add Post"
                  />
                  <div className={postAdded}>სიახლე წარმატებით დაემატა</div>
            </form>
    
                </div> 
                
            
           

            &nbsp;
          </div>
        </div>
        <Footer/>
      </div>
      
      
    </div>
 
  )
}

export default Addnews