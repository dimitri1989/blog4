import React, { useState } from 'react';
import { MdModeEdit } from "react-icons/md";
import { useNavigate , Link, useLocation } from 'react-router-dom';
import { HiOutlineBookmark } from "react-icons/hi2";
import queryString from 'query-string';
import { useEffect } from 'react';
import gif from './icons/22.gif';
import Slider from "./Slider"
import users from '../data/users';
import userInfo from './userInfo'
import dashboardUserInfo from './dashboardUserInfo'
import Footer from './Footer'
import './news.css';
import axios from 'axios';
//https://apitest.reachstar.io/blog/list




const Dashboard = () => {
  const [renewBlog,setRenewBlog] = useState("")
  const [headerScroll,setHeaderScroll] = useState('d-block')
  const [scroll ,setscroll] = useState(0)
  window.addEventListener('scroll', function () {
      const scrollPosition = document.documentElement.scrollTop;
      setscroll(scrollPosition)
     
    });

  useEffect(()=>{
    if(scroll < 926){
        setHeaderScroll('d-block')
      }else{setHeaderScroll('d-none')}

  },[scroll])

  //დასაწყისი ბრაუზერში ჩაწერილი ინფოს წამოღების სორტირებისათვის
  const loction = useLocation()
  const parsed = queryString.parse(loction.search);
  const [key,setKey] = useState(parsed.id)
  //დასასრული ბრაუზერში ჩაწერილი ინფოს წამოღების სორტირებისათვის


  //დასაწყისი გადამოწმების ავტორიზებულია თუ არა მომხმარებელი
  const navigate = useNavigate();
  const [checkStatus, setCheckStatus] = useState(
    localStorage.getItem('authorized')
  );

  useEffect(() => {
    if (checkStatus === 'false' || checkStatus ===  null) {
      navigate('SingIn'); 
    }
  });
    //დასასრული გადამოწმების ავტორიზებულია თუ არა მომხმარებელი

  //დასაწყისი აქსიოსიდან წამოღების ბლოგების 
  const [news, setNews] = useState([]);
  useEffect(() => {
    axios
      .get('https://apitest.reachstar.io/blog/list')
      .then((response) => setNews(response.data) );
  }, [renewBlog]);
  //დასასრული აქსიოსიდან წამოღები სბლოგების


  //დასაწყისი ფილტრის ფუნქციის კურსების სორტირება
  const sortkey = ['id']

  useEffect(()=>{
    news.map((postNews)=>{
      if( postNews.user_id.toString() !== key){
        return postNews
      }
    },[])
  })
  function sortNews (news,key){
    const postNews = [...news]
    if(!key || sortkey.includes(key)){
      return postNews
    }

    

   return postNews ?  postNews.filter((news)=>{
      if(news.user_id.toString() === key){
       
        return news
      }
     
    }) : ''
  }//sort fuqciis dasasruli

  //setKey(undefined)
  const [sortedPost,setSortedPost] = useState([])
  useEffect(()=>{
   if(!parsed.id){
    //setKey(undefined)

   }
 
    setSortedPost(sortNews(news,key))
  },[news])
  useEffect(()=>{
    setKey(parsed.id)
  })
//დასასრული სორტირების ფილტრის 


//დასაწყისი ფუნქცია მაჩვენე მეტი პოსტები
const [showGif,setShowGif] = useState("d-none")
const [showLoadText,setShowLoadText] = useState("LOAD MORE")
var [showMorePosts,setShowMorePosts] = useState(6)
function showMorePostsHandler (morePOst){
 const a =  setInterval(()=>{
  setShowLoadText()
  setShowGif("d-block ms-5")
 } ,1)
  setTimeout(() => {
    
    setShowMorePosts(showMorePosts + morePOst)
    setShowLoadText("")
    setShowGif("d-none")
    setShowLoadText("LOAD MORE")
    clearInterval(a);
  }, 1000);
  //დასასრული ფუნქცია მაჩვენე მეტი პოსტები
}
  //დასაწყისი უზერის ინფოს რომელიც გამოგვაგ ავტორის ასაღწერად 

  const userinf= userInfo(users,key)
 // const userDashboard = dashboardUserInfo(users,news.user_id)
  //console.log(news.user_id);
  //var createdTime =  news && news.created_at.slice(0, -17)

    //დასასრული უზერის ინფოს რომელიც გამოგვაგ ავტორის ასაღწერად 

function deleteHandlerNews(newsid){
  axios.delete('https://apitest.reachstar.io/blog/delete/' + newsid)
  .then(response => {
    if(response.status ===200){
      
      setRenewBlog(Math.random())
      setTimeout(() => {
        
      }, 2000);
    }
  })
}
function limit (string = '', limit = 0) {  
  return string.substring(0, limit)
}

 
// 'Hello '

  return (
    <div className="news-section">
      <div className={headerScroll}><Slider /></div>
     
      <div className="news-container">
        <div className="news">
          <div className="news-content">
            {userinf.img ? <div className='autor-img'><img src={userinf.img}/></div> : ''}
            <div className='LATEST-STORIES mb-3'> {userinf.name ?  `AUTHOR - ${userinf.name.toUpperCase()}` : "LATEST STORIES"}</div>
            <p className='autor-text'>{userinf.description}</p>
            {sortedPost.map((news,index) => {
             
              return (
                index < showMorePosts ? <div className='line' key={index}> 
                <div className='div-line'></div>
                <div className="news-list">
                <button type='button' onClick={()=>deleteHandlerNews(news.id)} className='delete-btn-comment'>x</button>
                
                  <p className="bg-text">{news.title[0].toUpperCase()}</p>
                  <div className="news-content-title">
                   {news.title.toUpperCase()}
                  </div>
                  <p className="news-content-Autor mt-2">
                    By <Link to={`?id=${news.user_id}`}>{dashboardUserInfo(users,news.user_id)}</Link> / {news.created_at.slice(0, -17)}
                  </p>
                  <p className="news-content-text mt-5 pb-2 newslimit">
                  <div dangerouslySetInnerHTML={{ __html: limit(news.description, 160)}} />
           
                  </p>
                  <div className='d-flex control-bluebtn'>
                   
                    <Link to={`${news.id}`}> <button type='button' className='readon-btn me-3 typology-pagination bluebtn'>READ ON</button></Link>
                    <Link to={`Editingnews/${news.id}`}><button type='button' className='readon-btn button-invert  typology-pagination classedit'><HiOutlineBookmark className='icon' />EDIT BLOG</button></Link>
                  
                  </div>
                </div>
                </div> :""
                
              );
            })}
            <button type='button' onClick={()=> showMorePostsHandler (6)} className='readon-btn me-3 typology-pagination text-align show-more'  >{<img src={gif} width="25px" className={showGif} />} {showLoadText} </button>
            &nbsp;
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Dashboard;
