import React from 'react';
import { Outlet, useNavigate,useLocation } from 'react-router-dom';
import { useGlobalContext } from './globalContext/GlobalProvider';


const ProtectedRoute = () => {
    const location = useLocation();
    const {handleMessage,settingRefreshToken} = useGlobalContext();

    const navigate = useNavigate();
    React.useEffect(() => {
  const authenticatingRouting = async () => {
    try {
      const res = await fetch('/api/protectedRoute', {
        credentials: 'include',
      });

      
      const result = await res.json();
      if (!res.ok) {
        handleMessage(`Please Login to Proceed!`);

        return navigate('/');
      }
     
      if (result.message==='Token Refreshed'){
        settingRefreshToken(result.userId)
        
      }

    } catch (err) {
      handleMessage("Network error, please try again.");
      console.error("ProtectedRoute fetch error:", err);
      navigate('/');
    }
  };

  authenticatingRouting();
}, [navigate,handleMessage,location.pathname]);


return (
    <Outlet />
)
}

export default ProtectedRoute