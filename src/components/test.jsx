import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Addnews.css'

const Addnews = () => {
  const [sendValue, setValue] = useState({title:"",description:""});
function onChange(e,name){
  setValue({...value,[name]: e.target.value })
}
console.log()
  return (
    <div className='addnews'>
      <div className="news-section changeNews-sectionPosition">
      <div className="news-container">
        <div className="news">
          <div className="news-content">
            <div className='LATEST-STORIES'>ADD NEW POST</div>
            
            <ReactQuill theme="snow" value={value.description} onChange={(e)=>onChange(e,"description")} />
              
                <div className='div-line'></div>
                <div className="news-list">
                  <div className="news-content-title">
                  </div>
                  <p className="news-content-Autor mt-2">
                    By dimitri kvarelashvili
                  </p>
                  <p className="news-content-text mt-5">
                
                  </p>
                  <div className='d-flex'>
                    <button type='button' className='readon-btn me-3 typology-pagination'>READ ON</button>
                    <button type='button' className='readon-btn button-invert  typology-pagination'>READ LATER</button>
                  
                  </div>
                </div>
                </div> 
                
            
           

            &nbsp;
          </div>
        </div>
      </div>
    </div>
 
  )
}

export default Addnews