import React, { Component, useState } from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import SingUp from './components/SingUp';
import SingIn from './components/SingIn';
import Dashboard from './components/Dashboard';
import Mainlayouts from './layouts/Mainlayouts';
import Editingnews from './components/Editingnews';
import Addnews from './components/Addnews';
import LogOut from './components/LogOut';
import BlogInfo from './components/BlogInfo'
import './App.css';
import Slider from './components/Slider';
import './media.css'
function App() {


  return (
    <div>
      <BrowserRouter>
        <div className="App">
     
          <Routes>
            <Route path="/" element={<Mainlayouts />}>
              <Route index element={<Dashboard />} />
              <Route path="/:info" element={<BlogInfo />} />
              <Route path="Addnews" element={<Addnews />} />
              <Route path="Editingnews/:id" element={<Editingnews />} />
              <Route path="SingIn" element={<SingIn />} />
              <Route path="SingUp" element={<SingUp />} />
              <Route path="LogOut" element={<LogOut />} />
            </Route>
          </Routes>
         
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
