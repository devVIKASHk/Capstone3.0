import chalk from "chalk";
import { findingDeletionSesionDataByUserId, generateRefreshToken, generateToken, verifyToken } from "../Model/authmodel.js";
import { db } from "../Model/Database/dbase/dbs.js";
import { sessionTable, usersTable } from "../Model/Database/dbase/schema.js";
import { and, eq } from "drizzle-orm";




//* finding session & usersData by session id

const findingDataId = async (id) => {
  try {
    const [sessionData] = await db
      .select({
        userId: usersTable.id,
        usersEmail: usersTable.email,
        name: usersTable.name,
        isEmailVerified: usersTable.isEmailVerified,
        sessionId: sessionTable.id,
      })
      .from(usersTable)
      .leftJoin(sessionTable, and(eq(sessionTable.id, id), eq(usersTable.id, sessionTable.userId)))
      .where(eq(sessionTable.id, id)) // Add explicit where clause

    return sessionData || null // Ensure we return null if no data
  } catch (err) {
    console.error(chalk.yellow(`Error while fetching session data! `), err)
    return null // Return null on error
  }
}
//TODO: refreshing Token

// const refreshingToken = async (refreshToken) => {
//     try {
//         const decodedRefreshingToken = await verifyToken(refreshToken);
//         console.log(decodedRefreshingToken,'refreshtokenfdkjfdjf')
//         const collectiveData = await findingDataId(decodedRefreshingToken.sessionId);
//         if (!collectiveData) throw new Error(`Invalid User!`)

//         const userPayload = {
//             id:collectiveData.userId,
//             name:collectiveData.name,
//             email:collectiveData.email,
//             isEmailVerified:collectiveData.isEmailVerified
//         }
//         console.log(userPayload)
       
//         const refreshedAccessToken = await generateToken(userPayload);
//         const refreshedRefreshToken = await generateRefreshToken({sessionId:collectiveData.sessionId});


//         return {userPayload,refreshedAccessToken,refreshedRefreshToken}
//     }catch(err){
//         console.error(chalk.bgBlue(`Error while verifying refreshToken:`),err.message);
// }
// }


const refreshingToken = async (refreshToken) => {
  try {
    const decodedRefreshingToken = await verifyToken(refreshToken)

    if (!decodedRefreshingToken || !decodedRefreshingToken.sessionId) {
      throw new Error(`Invalid refresh token structure`)
    }

    const collectiveData = await findingDataId(decodedRefreshingToken.sessionId)

    if (!collectiveData || !collectiveData.userId) {
      throw new Error(`Invalid session or user not found`)
    }

    const userPayload = {
      id: collectiveData.userId,
      name: collectiveData.name,
      email: collectiveData.usersEmail,
      isEmailVerified: collectiveData.isEmailVerified,
    }

    const refreshedAccessToken = await generateToken(userPayload)
    const refreshedRefreshToken = await generateRefreshToken({ sessionId: collectiveData.sessionId })

    return { userPayload, refreshedAccessToken, refreshedRefreshToken }
  } catch (err) {
    console.error(chalk.bgBlue(`Error while verifying refreshToken:`), err.message)
    throw err // Re-throw the error to be handled by caller
  }
}



//TODO:Authentication Middleware




export const authenticationVerification = async (req, res, next) => {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;


    if (!accessToken && !refreshToken) {
        return next();
        
    }

    // if (accessToken) {
    //     try {
    //         const decoded = await verifyToken(accessToken);
    //         console.log(decoded)
    //         req.user = decoded;
    //         return next();
    //     } catch (err) {
    //         console.error(chalk.redBright(`Access Token Expired!`), err);
    //     }
    // }

    if (accessToken) {
    try {
      const decoded = await verifyToken(accessToken)
      if (decoded && decoded.id) {
        req.user = decoded
        return next()
      }
    } catch (err) {
      console.error(chalk.redBright(`Access Token Invalid/Expired!`), err.message)
      // Continue to refresh token logic
    }
  }

    // if (refreshToken) {
    //     const {userPayload,refreshedAccessToken,refreshedRefreshToken}= await refreshingToken(refreshToken);
    //     req.user=userPayload;
    //     req.user.message='Token Refreshed';
    //     const baseConfig ={httpOnly:true,secure:false,sameSite:'lax'};

    //     res.cookie('access_token',refreshedAccessToken,{...baseConfig,maxAge:30*1000});
    //     res.cookie('refresh_token',refreshedRefreshToken,{...baseConfig,maxAge:60*60*1000});
    //     return next();
    // }



    if (refreshToken) {
    try {
      const { userPayload, refreshedAccessToken, refreshedRefreshToken } = await refreshingToken(refreshToken)

      req.user = userPayload
      req.user.message = "Token Refreshed"

      const baseConfig = { httpOnly: true, secure: false, sameSite: "lax" }

      res.cookie("access_token", refreshedAccessToken, { ...baseConfig, maxAge: 30 * 1000 })
      res.cookie("refresh_token", refreshedRefreshToken, { ...baseConfig, maxAge: 60 * 60 * 1000 })

      return next()
    } catch (err) {
      console.error(chalk.redBright(`Refresh Token Invalid/Expired!`), err.message)

      // Clear invalid cookies
      res.clearCookie("access_token")
      res.clearCookie("refresh_token")

      // Continue without authentication
      return next()
    }
  }
    return next();
}






















