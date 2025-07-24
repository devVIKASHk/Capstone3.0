import React from 'react';

const AppContext = React.createContext();


export function GlobalProvider ({ children }) {
  const [refreshToken, setRefreshToken] = React.useState(
    () => {
        const token = localStorage.getItem("refresh_token");
        return token ? JSON.parse(token) : false;
  });

  React.useEffect(
    ()=>{
        localStorage.setItem('refresh_token',JSON.stringify(refreshToken));
    },[refreshToken]
  )

  const [message, setMessage] = React.useState(null);

  //! : handleMessage

  const handleMessage = (messages) => {

    setMessage(messages);   
    setTimeout(() => {
      return setMessage(null);
    }, 5000);

    
  };

  //! settingRefreshToken

  const  timerRef= React.useRef(null)

  const settingRefreshToken =  (id) => {
    console.log('Function Called!');
    console.log(id)
    setRefreshToken(true);
    if (timerRef.current){
      clearTimeout(timerRef.current);
    }
    timerRef.current=setTimeout(
        async ()=>{
          console.log('Function is running ')
          try{
            const res = await fetch('/api/cleanLogout',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({userId:id}),
            credentials:'include',
          })
          const result = await res.json()
          if (!res.ok){
            throw new Error({message:result.message})
          }
          
          setRefreshToken(false);
          console.log('set false')
          }catch(err){
            console.error('Error :',err.message)
          }

        },60*1000
    )
    
  };

  React.useEffect(
    ()=>{
      return ()=>{
        if (timerRef.current){
        clearTimeout(timerRef.current)
        timerRef.current=null;

      }
      }
    },[]
      
  )



  //!handlingGoogleAuth


  const handlingGoogleAuth = async ()=>{
    try{
  
      const res= await fetch('/api/googleAuth');
      
      const result = await res.json();

      if (!res.ok){
        console.log('Google Authentication Failed. Internal server error!');
        return 
      }

      window.location.href= result.url 


    }catch(err){
      console.error('Something Went Wrong with googleAuthentication:',err)
    }
  }






  return (
    <AppContext.Provider value={{ handleMessage, message,settingRefreshToken,refreshToken,setRefreshToken,handlingGoogleAuth}}>
      {children}
    </AppContext.Provider>
  );
};

export function useGlobalContext(){
    const context = React.useContext(AppContext);

    if (!context){
        throw new Error(`useGlobalContext must be wrapped around `)
    }
    return context
}


