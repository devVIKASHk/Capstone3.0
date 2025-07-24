import React from 'react';
import Navbar from './Navbar';
import {Outlet} from 'react-router-dom';

const LoginLayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default LoginLayout