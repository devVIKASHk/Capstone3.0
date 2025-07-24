import chalk from 'chalk';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';


import { db } from "./Database/dbase/dbs.js";
import { googleAuthTable, sessionTable, usersTable } from './Database/dbase/schema.js';
import { eq,and } from 'drizzle-orm';
import { env } from '../zodValidation/envValidation.js';




//TODO: findUserByEmail

export const findUserByEmail = async (email)=>{
    try{
        const [info]= await db.select().from(usersTable).where(
            eq(usersTable.email,email)
        )

        return info
    }catch(err){
        console.error(chalk.red(`Error while searching email in database!:`),err)
    }
}


//TODO: savingUserData


export const savingUserData  = async (data)=>{
    try{
        const info= await db.insert(usersTable).values(data)
        
        if (!info) throw new Error({message:`Something went wrong! Can't save user's data!`});
        return info
    }catch(err){
        if (err.code===`ER_DUP_ENTRY`){
            throw new Error(`User already exists with this email, Try another email!`);
        }
        console.error(chalk.red(`Error while saving user's data in database!: ${err.message}`));
        throw err
    }
}


//TODO: 


















//! Password Hashing & Password Verifying 


export const hashPassword = async (password)=>{
   
    try{
        return await argon2.hash(password)
    }catch(err){
        console.error(chalk.greenBright(`Error while hashing password!: ${err}`))
    }
}



export const verifyPassword = async (hashedPassword,password )=>{
    try{
        return await argon2.verify(hashedPassword,password)
    }catch(err){
        console.error(chalk.greenBright(`Error while verify password!: ${err}`))
    }
}










//! JWT token generation and creation 


//* Token Generation

export const generateToken = async (payload)=>{
    try{
        return  jwt.sign(payload,env.TOKEN_SECRET_ID,{expiresIn:'30s'});

    }catch(err){
        console.error(chalk.bgCyanBright(`Error while generating token: `),err)
    }
}

//* Refresh Token Generation 

export const generateRefreshToken = async (payload)=>{
    try{
        return  jwt.sign(payload,env.TOKEN_SECRET_ID,{expiresIn:'1m'});

    }catch(err){
        console.error(chalk.bgCyanBright(`Error while generating refresh token: `),err)
    }
}


//* Token Verification 

export const verifyToken = async (token)=>{
   try{
        console.log(token);
        return  jwt.verify(token,env.TOKEN_SECRET_ID);

    }catch(err){
        console.error(chalk.bgCyanBright(`Error while verifying token: `),err)
    }
}




//* sessionTable insertion 


export const sessionInfoInsertion = async (sessionData)=>{
    try{
        return  await db.insert(sessionTable).values(sessionData);

    }catch(err){
        console.error(chalk.bgCyanBright(`Error while insertion into sessionTable: `),err)
    }
}





//* findingDeletionSessionDataByUserId 

export const findingDeletionSesionDataByUserId = async (id)=>{
    try{
        console.log(id)
       return await db.transaction(
       async  (trx)=>{
            const [sessionData]= await trx.select().from(sessionTable).where(
                eq(sessionTable.userId,id)
            )
            if (sessionData){
                return  await trx.delete(sessionTable).where(
                    eq(sessionTable.userId,id)
                )
            }
        }
       )
    }catch(err){
        console.error(`Something went wrong while finding sessionId:`,err)
    }
}





//! findingUserProviderByEmail

export const findingUserProviderByEmail = async  (provider,email)=>{
    try{
        const [user] = await db.select(
            {
                id:usersTable.id,
                name:usersTable.name,
                email:usersTable.email,
                isEmailVerified:usersTable.isEmailVerified,
                googleUnqId:googleAuthTable.providerId,
                provider:googleAuthTable.provider
            }
        )
        .from(
            usersTable
        )
        .where(
            eq(usersTable.email,email)
        )
        .leftJoin(
            googleAuthTable,
            and(
                eq(googleAuthTable.userId,usersTable.id),
                eq(googleAuthTable.provider,provider)
            )
        )
        return user
    }catch(err){
        console.error(chalk.gray(`Error while finding user and provider by email:`),err)
    }
}





//! storingUserInfoWithGoolgeAuth


export const storingUserInfoWithGoolgeAuth= async (userInfo,authInfo)=>{
    try{
        const insertedData = await db.transaction(
           async (trx)=>{
            const [info1] = await trx.insert(usersTable).values(userInfo);

            const [info2]= await trx.insert(googleAuthTable).values({...authInfo,userId:info1.insertId});

            return {id:info1.insertId,name:userInfo.name,email:userInfo.email,isEmailVerified:userInfo.isEmailVerified,googleUnqId:authInfo.providerId,provider:authInfo.provider}
           }
        )

        return insertedData
    }catch(err){
        console.error(
            chalk.yellow(`Error while storing user Info with google Authentication:`),err
        )
    }
}





//! onlyGoogleAuthDataInsertion

export const onlyGoogleAuthDataInsertion= async (info)=>{
   
  try {
    
    await db.transaction(async (trx) => {
      await trx.update(usersTable)
        .set({ isEmailVerified: true })
        .where(eq(usersTable.id, info.userId));

      await trx.insert(googleAuthTable).values(info);
    });

    return;
  } catch (err) {
    console.error(chalk.blueBright(`Error while only google authentication data insertion: `), err);
  }
};





