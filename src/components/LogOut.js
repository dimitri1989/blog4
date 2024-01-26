import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router'
const LogOut = () => {
const navigate = useNavigate()
    localStorage.setItem('authorized', false); //თუ გამოსვლას დავაჭირე გადაკეთდეს სტატუსი ლოკალში
    

    useEffect(()=>{
        navigate('..')

    },[])
  return (
    <div>გამოსვლა... </div>
  )
}

export default LogOut