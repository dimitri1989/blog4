import { useEffect, useState } from 'react';

import axios from 'axios';
import { useParams } from 'react-router';
import users from '../data/users';
import showusersName from './showusersName'
import Comments from './Comments';
import Footer from './Footer'
const BlogInfo = () => {
    const [news, setNews] = useState([]);
    const param = useParams()
    const [renewBlog,setRenewBlog] = useState("")
    const blog = news.find((news)=>{
      
      return param.info === news.id.toString()
    })
    function handlerRenewBlog(){
      setRenewBlog(Math.random())
     
    }
    useEffect(() => {
      
      axios
        .get('https://apitest.reachstar.io/blog/list')
        .then((response) => setNews(response.data));
      
    }, [renewBlog]);
    var createdTime =  blog && blog.created_at.slice(0, -17)
     //console.log(showusersName(users, blog && blog.user_id));
  return (
    <div className='coment-section'>
    <div className='addnews'>
      <div className="news-section changeNews-sectionPosition">
      <div className="news-container">
        <div className="news">
          <div className="news-content">
    
            <div className="news-content">
                <div className="news-list">
                  <p className="bg-text">{blog && blog.title[0].toUpperCase()}</p>
                  <div className="news-content-title">
                  {blog && blog.title.toUpperCase() }
                 
                  </div>
                  <p className="news-content-Autor mt-2">
                    By {showusersName(users, blog && blog.user_id) } {createdTime }
                  </p>
                  <p className="news-content-text mt-5 pb-2">
                  <div dangerouslySetInnerHTML={{ __html: blog &&  blog.description}} />
                  
                  
                  </p>
                  <div className='social text-center mt-5'>
                  <i className="fa-brands fa-facebook"></i>
                  <i className="fa-brands fa-twitter"></i>
                  <i className="fa-brands fa-whatsapp"></i>
                  </div>
                  
                </div>
                </div> 
                
              
            
            
            &nbsp;
          </div>




            {/* <div className={checkinputText}>{erorrSms}</div> */}
            {/* <form className='add-post' onSubmit={(e) => addNewsHandler(e)}>
              <input type='text' required placeholder='Add Title' value={sendValue.title} onChange={(e)=> onChange(e,"title")} />
              <ReactQuill theme="snow" required value={value} onChange={setValue} />
              
              <input
                    type="submit"
                    className="readon-btn mt-3 typology-pagination"
                    value="Add Post"
                  />
                  <div className={postAdded}>სიახლე წარმატებით დაემატა</div>
            </form> */}
    
                </div> 
                
            
           

            &nbsp;
            
            <Comments blog={blog} handlerRenewBlog={handlerRenewBlog}  />
          </div>
          <Footer/>
        </div>
      </div></div>
    
  )
}

export default BlogInfo