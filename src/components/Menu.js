import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'


import './header.css'

const Menu = () => {
    const [headerScroll,setHeaderScroll] = useState('header-container')
    const [hideNavLink,setHideNavLink] = useState('nav-link')
    const [scroll ,setscroll] = useState(0)
    window.addEventListener('scroll', function () {
        const scrollPosition = document.documentElement.scrollTop;
        setscroll(scrollPosition)
       
      });
    //   useEffect(()=>{
    //     if(scroll > 926){
           
    //         setHeaderScroll('header-container scroll')
    //       }else{setHeaderScroll('header-container scrollout')}
    //   },[scroll])

  return (
    <div className={headerScroll}>
    <header className='header'>
        <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid d-flex justify-content-between ">
                <NavLink className="navbar-brand" to='.'>Typology</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink  className={hideNavLink}  aria-current="page" to='.'>Home</NavLink>
                    <NavLink  className={hideNavLink}  to='Addnews'>Addnews</NavLink>

                    <NavLink  className={hideNavLink}  to='LogOut'>LogOut</NavLink>
                </div>
                </div>
            </div>
        </nav>
    </header></div>
  )
}

export default Menu