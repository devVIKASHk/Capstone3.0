import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useGlobalContext} from './globalContext/GlobalProvider';



function Logout() {
  const navigate = useNavigate();

  const {setRefreshToken} = useGlobalContext();




 React.useEffect(
    ()=>{
        const logginOut = async ()=>{
            try{
                console.log('Trying to logout!')
                const res = await fetch('/api/logout',
                {
                    credentials:'include'
                }
            )

            if (!res.ok) throw new Error({message:`Internal Server Error!`});

            setRefreshToken(false);
            return navigate('/')
            
         }catch(err){
            console.error(`Error while handling logout: `,err.message);
         }
        }

        logginOut()
    },[navigate]
 )


}

export default Logout;