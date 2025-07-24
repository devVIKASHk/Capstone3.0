import React from 'react';
import './App.css'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './Components/component/Layout'
import Challenges from './Components/Pages/Challenges/Challenges';
import PageNotFound from './Components/Pages/PageNotFound/PageNotFound';
import About from './Components/Pages/About/About';
import LeaderBoard from './Components/Pages/LeaderBoard/LeaderBoard';
import Profile from './Components/Pages/Profile/Profile';
import Home from './Components/Pages/Home/Home';
import Login from './Components/Pages/Login/Login';
import Register from './Components/Pages/Register/Register';
import LoginLayout from './Components/component/LoginLayout';
import ProtectedRoute from './Components/component/ProtectedRoute';
import Logout from './Components/component/logout';
import ChallengesRouteParameter from './Components/Pages/RouteParameterChalleges/challengesRouteParameter';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout/>}>

          <Route path='' element={<Home/>} />
           <Route path='user' element={<ProtectedRoute/>} >

              <Route path='challenges/' element={<Challenges/>} />
              <Route path='challenges/:id' element={<ChallengesRouteParameter/>} />
              {/* <Route path='leaderboard' element={<LeaderBoard/>} /> */}
              <Route path='profile' element={<Profile/>} />
              <Route path='logout' element={<Logout/>} />

           </Route>

          
          <Route path='about' element={<About/>} />
    
      </Route>

        <Route path='/' element={<LoginLayout/>}>
              
              
          <Route path='user/login' element={<Login/>}/>
          <Route path='user/register' element={<Register/>}/>
        
        </Route>


        



        <Route path='*' element={<PageNotFound/>} />

  </>


  )
)


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App