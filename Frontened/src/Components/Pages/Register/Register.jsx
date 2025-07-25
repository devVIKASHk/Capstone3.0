import React from 'react';
import signupImg from '../../../assets/login.png';
import { useNavigate,NavLink } from 'react-router-dom';
import { useGlobalContext } from '../../component/globalContext/GlobalProvider';

import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const {handleMessage,settingRefreshToken,handlingGoogleAuth} = useGlobalContext();

  const navigate = useNavigate()
  const [registrationData, setRegistrationData] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const [err, setError] = React.useState(null);




  //* Style for the input fields and button

  const inputFieldStyle =
    'border-2 border-fuchsia-500 rounded-md w-full px-[2vw] sm:px-4 py-2 bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent focus:outline-none caret-fuchsia-600 selection:text-fuchsia-700';

  const buttonStyle =
    'border-2 border-fuchsia-500 rounded-md w-full px-[2vw] sm:px-4 sm:py-1 md:py-[0] text-fuchsia-300 hover:text-black bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 transition-all duration-300 text-[4vw] sm:text-[20px] ';


  //! Handling input changes

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({ ...prevData, [name]: value }))
    setError(null)
  }


  //! Function to handle form submission

  const handleRegistrationSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user/register',

        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registrationData)
        }

      )
      const result = await res.json();
      if (!res.ok) { 

        if (res.status === 400) {
          
          setError(result.error);
          return navigate('/user/register');
        }
        else{
          throw new Error({message:'Something went wrong!'})
        }

      }

      handleMessage(result.message);
      settingRefreshToken(result.userId);
      

      navigate('/')





    } catch (err) {
      console.error("Error in registration:", err.message);
    }

    

  };


  return (
    <div
      className="w-100svw h-[calc(100svh)]  flex justify-center items-center"
      style={{ backgroundColor: 'rgba(15, 23, 42, 1)' }}
    >
      <div className="lg:w-[70%]  h-[70%] w-[60%] md:w-[55%] flex justify-center items-center shadow-md shadow-fuchsia-800">
        {/* Left image section */}
        <div className="hidden lg:block lg:w-1/2 lg:h-full">
          <img
            src={signupImg}
            alt="signup_img"
            className="w-full h-full object-cover opacity-[0.5]"
          />
        </div>

        {/* Right form section */}
        <div className="w-full h-full lg:w-1/2 bg-gradient-to-r from-[#0a0a0a] to-[#071a4a] flex justify-center items-center">
          <div className="w-full h-full lg:w-[85%] lg:h-[90%] border-3 border-fuchsia-900 backdrop-blur-3xl rounded-2xl opacity-[0.7] relative">
            {/* Heading */}
            <h3 className="text-[5svw] md:text-5xl lg:text-4xl text-fuchsia-600 text-center relative transform lg:translate-y-7 md:translate-y-13 translate-y-10 opacity-[0.8]">
              Register
            </h3>

            {/* Form container */}
            <div className="absolute bottom-1.5 w-full h-[83%] px-[4vw] sm:px-10 sm:py-5  rounded-b-lg">
              <form
                onSubmit={handleRegistrationSubmission}
                className="flex flex-col gap-6"
              >
                {/* Name */}
                <input
                  type="text"
                  placeholder="Full Name"
                  className={inputFieldStyle}
                  name="name"
                  value={registrationData.name}
                  onChange={handleInput}

                />

                {/* Email */}
                <input
                  type="email"
                  placeholder="Email"
                  className={inputFieldStyle}
                  name="email"
                  value={registrationData.email}
                  onChange={handleInput}
                />




                {/* Password */}
                <input
                  type="password"
                  placeholder="Password"
                  className={inputFieldStyle}
                  name="password"
                  value={registrationData.password}
                  onChange={handleInput}
                />

                {
                  err? (<p className='text-red-600 text-[12px] bg-gray-800 w-[100%] my-[-10px] py-1 px-2 border-l-red-500 border-l-[2px] whitespace-nowrap overflow-scroll  ' style={{scrollbarWidth:'none'}}>{err}</p>):null
                }

                {/* Submit */}
                <button type="submit" className={buttonStyle}>
                  Signup
                </button>

                {/* Links */}
                <div className="flex flex-col sm:flex-row justify-between items-center text-[3vw] sm:text-sm text-fuchsia-400  gap-2">
                  <a href="#" className="hover:underline">
                    Already have an account?
                  </a>
                  <NavLink to='/user/login'  className="hover:underline">Login Here</NavLink>
                </div>
              </form>

               <div className='mt-5 px-4  bg-fuchsia-500 rounded-sm '>
                        <button onClick={handlingGoogleAuth } className='flex py-2 items-center text-center text-[3vw] sm:text-[20px] lg:text-[16px] w-full '>

                          <span >
                            <FaGoogle/>
                          </span>
                         <span className='absolute left-1/2 transform -translate-x-[50%]'>
                          Sign in With Google
                         </span>
                        </button>
                            
                      
                    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Register;






















