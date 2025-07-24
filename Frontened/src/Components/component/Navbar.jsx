import React from 'react';
import logo1 from '../../assets/logo1.png'
import { NavLink } from 'react-router-dom';




import { IoMenu } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { MdLeaderboard } from "react-icons/md";
import { GiRunningNinja } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { FcAbout } from "react-icons/fc";
import { RiMenuFold2Fill } from "react-icons/ri"; //<RiMenuFold2Fill />
import { RxCross2 } from "react-icons/rx"; //<RxCross2 />
import { MdLogout } from "react-icons/md";
import { useGlobalContext } from './globalContext/GlobalProvider';
const links = [
    {
        link: 'Home',
        path: '/',
        icon: <IoHome />
    },
    {
        link: 'Challenges',
        path: '/user/challenges',
        icon: <GiRunningNinja />
    },

    {
        link: 'Profile',
        path: '/user/profile',
        icon: <CgProfile />
    },
    {
        link: 'About',
        path: '/about',
        icon: <FcAbout />
    },
    
]




const Navbar = () => {

    const {refreshToken}= useGlobalContext();

    const [isMenu, setMenu] = React.useState(false);

    const [onLoginPage, setLogin] = React.useState(() => {
        const saved = localStorage.getItem("onLoginPage");
        return saved ? JSON.parse(saved) : false;  // default is false
    });


    React.useEffect(() => {
        localStorage.setItem("onLoginPage", JSON.stringify(onLoginPage));
    }, [onLoginPage]);






    return (
        <>
           
            <nav className='sticky top-0 left-0 backdrop-blur-sm shadow-md shadow-fuchsia-800 z-[100] min-w-[150px]'>
            <div className='flex  justify-between '>
                {/* Logo */}
                <div className='inline-block'>
                    <NavLink to='/'>
                        <img src={logo1} alt="logo" className='object-cover relative top-1
                    
                    w-[170px] h-[50px] 
                    lg:w-[230px] lg:h-[70px] transition-all duration-300 ease-in-out ' />
                    </NavLink>

                </div>


                {/* Navbar Links */}

                <div className='hidden md:w-full md:flex md:justify-end  '>
                    <div className='flex justify-center items-center '>
                        <ul className='w-full flex justify-end items-center    '>
                            {
                                links.map(
                                    (obj, index) => (
                                        <li key={index} className='text-gray-300 font-heading md:text-[1rem] md:m-2 lg:m-4 lg:text-[1.2rem] transition-all duration-300 ease-in-out '>

                                            <NavLink
                                                to={obj.path}
                                                className={({ isActive }) =>
                                                    `transition-all duration-300 ease-in-out ${isActive
                                                        ? 'bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent'
                                                        : 'text-gray-300 hover:text-fuchsia-600'
                                                    }`
                                                }
                                            >
                                                {obj.link}
                                            </NavLink>

                                        </li>
                                    )
                                )
                            }
                        </ul>

                    </div>


                    <div className='flex justify-center items-center
                                    md:gap-3 md:px-2
                                    lg:gap-3 lg:text-[1.2rem] lg:px-4  relative  '>
                        <div className='md:h-[25px] lg:h-[42px] w-[2px] bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 absolute left-0'></div>



                        {
                            refreshToken? 
                                <NavLink
                                    to='/user/logout' className='px-3.5 py-0.9 bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 md:rounded-md lg:rounded-lg text-gray-200'>Logout
                                </NavLink>
                            :
                            
                            (
                                
                            onLoginPage ?
                                <NavLink
                                    onClick={() => setLogin(false)}
                                    to='/user/register' className='px-3.5 py-0.9 bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 md:rounded-md lg:rounded-lg text-gray-200'> Signup
                                </NavLink>
                                :
                                <NavLink
                                    onClick={() => setLogin(true)}
                                    to='/user/login' className='px-3.5 py-0.9 bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 md:rounded-md lg:rounded-lg text-gray-200  '> Login
                                </NavLink>
                        
                            )
                        }

                    </div>


                </div>
                <div className='md:hidden flex justify-end  items-center mr-3 sm:mr-8 w-[30%] '>
                    <IoMenu className='scale-[2] text-fuchsia-600 inline-block ' onClick={() => setMenu(!isMenu)} />
                </div>
            </div>
        </nav>


        {/* SideBar */}
        <div className={`flex h-[calc(100vh-50px)] w-screen absolute backdrop-blur-lg md:hidden z-100`} style={{ position: 'absolute', left: isMenu ? '0' : '-900px' }}>

            <div className='h-full w-[45vw] rounded-tr-lg p-[2vw] sm:p-3 relative ' style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}>

                <span className='float-end m-3 scale-[1.5] text-fuchsia-600 absolute top-[0.1vw] right-[0.5vw]' onClick={() => setMenu(false)}><RxCross2 /></span>
                <br />
                <div className='w-full h-[25px]  rounded-sm bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 text-center mt-[2vw] text-[3vw] p-[2vw] flex justify-center items-center'>
                    Menu
                </div>
                <div className='flex justify-center items-center mt-10'>
                    <ul className='w-full flex justify-center items-start  flex-col gap-5 '>
                        {
                            links.map(
                                (obj, index) => (
                                    <li key={index} className='text-gray-300 font-heading text-[3vw] transition-all duration-300 ease-in-out  '>

                                        <NavLink
                                            onClick={() => setMenu(false)}
                                            to={obj.path}
                                            className={({ isActive }) =>
                                                `transition-all duration-300 ease-in-out flex justify-center items-center gap-1 ${isActive
                                                    ? 'bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent'
                                                    : 'text-gray-300 hover:text-fuchsia-600'
                                                }`
                                            }
                                        >
                                            <span className='text-fuchsia-600'>{obj.icon}</span>   {obj.link}
                                        </NavLink>
                                        


                                    </li>
                                    
                                )
                            )

                            
                        }

                        
                    </ul>

                        <div className='absolute w-full px-2  bottom-[11vw] ' >
                            {
                            refreshToken? 
                                <NavLink
                                    onClick={() => setMenu(false)}
                                    to='/user/logout' className='inline-block w-[100%] px-3.5   bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 rounded-sm md:py-1 text-gray-200 text-center'>Logout
                                </NavLink>
                            :
                            
                            (
                                
                            onLoginPage ?
                                <NavLink
                                    
                                    onClick={() => {
                                        setLogin(false);
                                        setMenu(false)

                                    }}
                                    to='/user/register' className='inline-block w-[100%] px-3.5  bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 rounded-sm   text-[3vw] md:py-1 text-gray-200 text-center'> Signup
                                </NavLink>
                                :
                                <NavLink
                                    onClick={() => {
                                        setLogin(true);
                                        setMenu(false)
                                    }}
                                    to='/user/login' className='inline-block w-[100%] md:py-1 bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 rounded-sm text-gray-200 text-center '> Login
                                </NavLink>
                        
                            )
                        }
                        </div>

                    <div className='h-[8vw] w-full flex justify-center items-center absolute bottom-0 ' style={{ backgroundColor: 'rgba(15, 23, 42, 0.9)' }}>


                        <div className='h-[6vw] w-[6vw] rounded-full bg-fuchsia-600 absolute left-2'>

                        </div>

                        <span className='text-[3vw] bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent relative left-4'>Hello! Mr. Vikash . . .</span>

                    </div>

                </div>



            </div>




        </div>

        

        </>

    )
}

export default Navbar






{/* <h1 class="text-5xl font-extrabold bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
  STRIVEUP
</h1> */}
