import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu'
import { Outlet } from 'react-router'

const Mainlayouts = () => {
  const [HideMeniuLInk,setHideMeniuLInk] = useState("nav-link")
  return (
    <>
    <Menu />
    <Outlet/>
    </>
  )
}

export default Mainlayouts