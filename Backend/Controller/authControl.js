import { registrationValidation } from "../zodValidation/registrationValidation.js";

import { findingDeletionSesionDataByUserId, findingUserProviderByEmail, findUserByEmail, generateRefreshToken, generateToken, hashPassword, onlyGoogleAuthDataInsertion, savingUserData, sessionInfoInsertion, storingUserInfoWithGoolgeAuth, verifyPassword } from "../Model/authmodel.js";
import chalk from "chalk";
import { decodeIdToken, generateCodeVerifier, generateState } from "arctic";
import { google } from "../authLibrary/OAuth2.0/google.js";




//TODO: registerUser

export const registerUser = async (req,res)=>{
    
    try{
        const userInfo = req.body;

        const  {data,error}= registrationValidation.safeParse(userInfo);
        
        if (error){
            //!400 - Bad Request
            return res.status(400).json({error:error.errors[0].message});
        }
        
        const isAnyDuplicateEmail = await findUserByEmail(data.email);

        if (isAnyDuplicateEmail){
            //!400 - Bad Request
            return res.status(400).json({error:`User already exists with this email!`});
        }
        const {name,email,password}= data;

        const hashedPassword = await hashPassword(password);

        const [savingUserInfo] = await savingUserData({name,email,password:hashedPassword});
        
        
        const sessionData= {ipAddress:req.clientIp,userAgent:req.headers['user-agent'],userId:savingUserInfo.insertId};

        const payload={id:savingUserInfo.insertId,name:name,email:email,isEmailVerified:false};

        const [sessionTableInfo] = await sessionInfoInsertion(sessionData);

        const accessToken = await generateToken(payload);

        const  refreshToken = await generateRefreshToken({sessionId:sessionTableInfo.insertId});
        
        const baseConfig= {httpOnly:true,secure:false,sameSite:'lax'}

        res.cookie('access_token',accessToken,{...baseConfig,maxAge:30*1000});
        res.cookie('refresh_token',refreshToken,{...baseConfig,maxAge:60*1000});
        
        return res.status(200).json({
            message:`Welcome ${name.toLocaleUpperCase()}, You are registered successfully! `,
            userId:savingUserInfo.insertId,
        })


        
    }catch(err){
        console.error(chalk.yellowBright("Error in registerUser: "), err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



//TODO: loginUser

export const loginUser = async (req,res)=>{

    try{
        
        const loginInfo = req.body;
        const  {data,error}= registrationValidation.safeParse(loginInfo);
        
        if (error){
            //!400 - Bad Request
            return res.status(400).json({error:error.errors[0].message});
        }
        const {email,password}= data;
        const isEmailExist = await findUserByEmail(email);

        if (!isEmailExist){
            return res.status(400).json({error:`Invalid Credentials! Enter Valid Credentials.`})
        }
        const isPasswordCorrect = await verifyPassword(isEmailExist.password,password);

        if (!isPasswordCorrect){
            return res.status(400).json({error:`Invalid Credentials! Enter Valid Credentials.`})
        }

        const payload = {id:isEmailExist.id,name:isEmailExist.name,email:isEmailExist.email,isEmailVerified:isEmailExist.isEmailVerified};

        const sessionData= {ipAddress:req.clientIp,userAgent:req.headers['user-agent'],userId:isEmailExist.id}

        const [sessionTableInfo] = await sessionInfoInsertion(sessionData);
        const accessToken = await generateToken(payload);
        const  refreshToken = await generateRefreshToken({sessionId:sessionTableInfo.insertId});
        
        const baseConfig= {httpOnly:true,secure:false,sameSite:'lax'}

        res.cookie('access_token',accessToken,{...baseConfig,maxAge:30*1000});
        res.cookie('refresh_token',refreshToken,{...baseConfig,maxAge:60*1000});
        return res.status(200).json(
            {
                message:`Hii ${isEmailExist.name}, Login Successfully!`,
                userId:isEmailExist.id,
            }
        )



        
    }catch(err){
        console.error(chalk.yellowBright("Error in registerUser: "), err);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}




//! protectedRoute 

export const routeProtected = async (req,res)=>{
    try{
        if (!req.user){
            return res.status(400).json({
                message:'Token Not Found!'
            })
        }
        else{
            return res.status(200).json({
                message:req.user.message,
                userId:req.user.id
            });
        }
    }catch(err){ 
        console.error(`Something went wrong with authenticationVerication or routeProtection!`);
    }
}



//! loggingOut 


export const loggingOut = async (req,res)=>{
    try{
        const userId = req.user.id;

        await findingDeletionSesionDataByUserId(userId);
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        
        return res.status(200).json({message:'LogOut SuccessFully!'});
    }catch(err){
        console.log(`Error while logging Out!`,err)
    }   
}





//!sessionDeletionAfterRefreshTokenDeletion


export const sessionDeletionAfterRefreshTokenDeletion= async (req,res)=>{
    try{
        
        const id =  req.body;

        if (!id){
            return res.status(200).json({
                error:'Id not not found!',
                message:'Please Login to Proceed!'
            })
        }
        
        const deletionInfo= await findingDeletionSesionDataByUserId(id.userId);
        if (!deletionInfo){
            return res.status(400).json({
                message:'Internal Server Error while clean Logout!'
            });
        }else{
            return res.status(200).json({
                message:'SuccessFully Deleted the sessionId'
            })
        }
    }catch(err){
        console.error(chalk.bgCyan.red('Error while clean logout :'),err)
    }
}

//! googleAuth

export const googleAuth = async (req,res)=>{
    try{
        const state= generateState();
        const codeVerifier= generateCodeVerifier();
        const scopes = ['openid','profile','email'];
        const url = google.createAuthorizationURL(state,codeVerifier,scopes);
        const baseConfig= {
            httpOnly:true,
            secure:false,
            sameSite:'lax',
            maxAge:60*1000
        }
        res.cookie('google_auth_state',state,baseConfig);
        res.cookie('google_auth_codeVerifier',codeVerifier,baseConfig);
        
        if(!url) throw new Error('Google URl redirection failed');

        return res.status(200).json({
            url: url.toString()
        })

    }catch(err){
        console.error(`Error while handling google authentication:`,err.message);
        throw err
    }
}


//! googleAuthCallback

export const googleAuthCallback= async (req,res)=>{
    try{
        console.log(`Google function called!`);
        const {state,code}= req.query;

        const cookieState = req.cookies.google_auth_state;
        const cookieCodeVerifier = req.cookies.google_auth_codeVerifier;
        if (
            !state||
            !code||
            !cookieState||
            !cookieCodeVerifier||
            !(state===cookieState)

        ){
           
           throw new Error(chalk.bgGray(`Couldn't login with Google because invalid login attempt. Please try again!`));
            
        }

        let tokens;

        try{
            tokens = await google.validateAuthorizationCode(code,cookieCodeVerifier);

            if (!tokens) {
                    throw new Error(chalk.bgGray(`Couldn't login with Google because invalid login attempt. Please try again!`));
            }


        }catch(err){
            console.error(chalk.redBright(`Error while getting token during google authentication callback`),err.message);
            throw err
        }

        const claim = decodeIdToken(tokens.idToken());

        const {sub:googleUnqId,email,name} = claim;


        const authUserInfo= await findingUserProviderByEmail('google',email);
       
        let authUserInfo1;


        if (!authUserInfo){
            const userInfo = {name,email,isEmailVerified:true}
            const authInfo = {provider:'google',providerId:googleUnqId}
            const authData = await storingUserInfoWithGoolgeAuth(userInfo,authInfo);
            authUserInfo1=authData;
        }

        if (authUserInfo && !authUserInfo.googleUnqId){
            const info= {provider:'google',providerId:googleUnqId,userId:authUserInfo.id};
            await onlyGoogleAuthDataInsertion(info);
        }

        const googleAuthUserInfo= authUserInfo || authUserInfo1


        const sessionData = {ipAddress:req.clientIp,userAgent:req.headers['user-agent'],userId:googleAuthUserInfo.id}

        const payload = {id:googleAuthUserInfo.id,name:googleAuthUserInfo.name,email:googleAuthUserInfo.email,isEmailVerified:googleAuthUserInfo.isEmailVerified};

        const [sessionTableInfo] = await sessionInfoInsertion(sessionData);
        const accessToken = await generateToken(payload);
        const  refreshToken = await generateRefreshToken({sessionId:sessionTableInfo.insertId});
        
        const baseConfig= {httpOnly:true,secure:false,sameSite:'lax'}

        res.cookie('access_token',accessToken,{...baseConfig,maxAge:30*1000});
        res.cookie('refresh_token',refreshToken,{...baseConfig,maxAge:60*1000});
        res.clearCookie('google_auth_state');
        res.clearCookie('google_auth_codeVerifier');
        const id= googleAuthUserInfo.id;
        return res.redirect(`http://localhost:5173/?name=${name}&email=${email}&id=${id}`);
        
    }catch(err){
        console.error(`Error while google authentication callback:`,err);
    }
}


























