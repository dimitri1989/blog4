import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate , Link, useLocation,useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Footer from './Footer'
import './EditNews.css'

const Editingnews = () => {
const [blog,setBlog] = useState([])
const [value,setValue] = useState("")
const [postAdded,setPostAdded] = useState("d-none")
const params = useParams()
const [sendValue, setSendValue] = useState({title:"",description:""});

useEffect(()=>{
  axios.get("https://apitest.reachstar.io/blog/list")
  .then(response => setBlog(response.data))
  .catch(error => error )
},[])
const news = blog.find((editBlog) =>{
 return editBlog.id.toString() === params.id
})
useEffect(()=>{
  news &&  setSendValue({title:news.title,description:news.description})
  news && setValue(news.description)
},[news])

 
// axios.post("https://apitest.reachstar.io/blog/add",{
  
//   title:"2024 BMW X2 / iX2",
//   description:"There's a new BMW X2 in town. The 2024 model has a bold design and a bevy of powertrain options – including electric. The gas X2 has a base turbocharged 2.0-liter engine with 241 horsepower and 295 pound-feet of torque, while the M35i model has 312 hp and a 0 to 60 mph time of just 5.2 seconds. The electric iX2, meanwhile, ha",
  
// })
// .then(response => console.log(response.status))
//   }
// }).then(data => console.log(data))
const [status,setStatus] = useState(false)
const navigate = useNavigate();
const idparam = params.id
useEffect(()=>{
  if(status){
    navigate('..')
  }
},[status])
function EditNewsHandler(e){
  e.preventDefault();
  axios.put("https://apitest.reachstar.io/blog/edit/" + params.id,{
    title:sendValue.title,
    description:sendValue.description
  })
  .then((response) => {
    if(response.status === 200){
      setPostAdded("d-block text-success mt-3")
      setTimeout(() => {
        setPostAdded("d-none")
        setValue('')
        setSendValue({title:"",description:""})
        setStatus(true)
      }, 2000);
    }
  })
}
function onChange (e,name){
  setSendValue({...sendValue,[name]: e.target.value })
}

  return (
    <div className='addnews'>
      <div className="news-section changeNews-sectionPosition">
      <div className="news-container">
        <div className="news">
          <div className="news-content">
            <div className='LATEST-STORIES mb-2'>EDIT POST</div>
             {/* <div className={checkinputText}>{erorrSms}</div>  */}
             <form className='add-post' onSubmit={(e) => EditNewsHandler(e)}>
              <input type='text' required placeholder='Add Title' value={sendValue.title} onChange={(e)=> onChange(e,"title")} />
              <ReactQuill theme="snow" required value={value} onChange={setValue} />
              
              <input
                    type="submit"
                    className="readon-btn mt-3 typology-pagination"
                    value="SAVE POST"
                  />
                   <div className={postAdded}>სიახლე წარმატებით დარედაქტირდა</div> 
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

export default Editingnews