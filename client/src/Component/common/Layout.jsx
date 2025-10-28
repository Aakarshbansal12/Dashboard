import React from 'react'
import {  Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Footer from './Footer'
import { ToastContainer } from 'react-bootstrap'

const Layout = () => {
  return (
    <>
    
    <div>
      <Sidebar/>
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Navbar/>
        <Outlet/>
        <Footer/>
      </main>
    </div>
    </>


  )
}

export default Layout
