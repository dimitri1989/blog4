import React from 'react'
import {  Link } from 'react-router-dom';
import { HiOutlineBookmark } from "react-icons/hi2";
import { useEffect, useState } from 'react';
import users from '../data/users';
import dashboardUserInfo from './dashboardUserInfo'
import gif from './icons/22.gif';
import { Carousel } from 'rsuite';
import './Slider.css';
import axios from 'axios';
const Slider = () => {
  
  const [news, setNews] = useState([]);
  useEffect(() => {
    axios
      .get('https://apitest.reachstar.io/blog/list')
      .then((response) => setNews(response.data));
  }, []);
  return (
    <div className='newsitem'>
    <div className="news-content">
      
      <div id="carouselExampleDark" className="carousel carousel-dark slide" >
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
  {news.map((data,index)=>{

   return  <div key={index} className={index === 0 ? "carousel-item active" : "carousel-item" } data-bs-interval="10000">
    

    <div className="carousel-caption  d-md-block">
    <p className="bg-text-slider">{data.title[0].toUpperCase()}</p>
    <div className="news-content-title text-slider-title">
         {data.title.toUpperCase()}
        </div>
      <h5 className='mt-3'>By <Link to={`?id=${data.user_id}`}>{dashboardUserInfo(users,data.user_id)}</Link> / <Link to={`${data.id}`}>{data.comments.length} Comments </Link></h5>
      <div className='d-flex justify-content-center mt-5 control-bluebtn'>
                    <Link to={`/${data.id}`}><button type='button' className='readon-btn me-3 typology-pagination bg-light text-info typology-pagination2 bluebtn'>READ ON</button></Link>
                    
                    <Link to={`Editingnews/${data.id}`}><button type='button' className=' typology-pagination readon-btn border'><HiOutlineBookmark className='icon' />EDIT BLOG</button></Link>
      </div>
      
                  
    </div>
    
  </div>
    
    
  })}
  </div>
  
</div>
           
          </div>
          </div>
  )
}

export default Slider