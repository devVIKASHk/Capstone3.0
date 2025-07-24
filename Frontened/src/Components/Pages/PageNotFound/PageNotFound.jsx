import React from 'react';
import '../../../App.css'

// import { NavLink } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate= useNavigate();
    return (
        <div className='w-svw h-svh ' style={{ backgroundColor: 'rgba(15, 23, 42, 1)' }}>

            <div className='absolute left-1/2 top-2/5 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                <h1 className='text-gray-700  text-[5rem] md:text-[15rem] ' >404</h1>
                <div className='md:-mt-12'>
                    <h3 className='text-3xl md:text-5xl text-gray-500'>Oops! Page not found</h3>
                    <p className='md:text-2xl mt-7 text bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 px-7  bg-clip-text text-transparent '>Oops! The page you are looking for does not exist.</p>
                    
                        <button className='bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 px-4 py-2 md:px-7 md:py-3 rounded-lg mt-6' onClick={()=>{
                            navigate('/')
                        }}>
                            Redirect To Home
                        </button>
                    
                </div>
            </div>


        </div>
    )
}

export default PageNotFound