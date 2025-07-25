import express from 'express';
import cors from 'cors';
import requestIp from 'request-ip';
import cookieParser from 'cookie-parser';


import { OperationalRouter } from './Route/route.js';
import { AuthRouter } from './Route/authRoute.js';
import { env } from './zodValidation/envValidation.js';
import { authenticationVerification } from './Controller/authmiddleware.js';






const app = express();


app.use(
    cors(
        {
            origin:env.FRONTEND_END_POINT,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH','HEAD'],
            credentials:true,

        }
    )
)


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestIp.mw());

app.use(authenticationVerification)

app.use(OperationalRouter);
app.use(AuthRouter);

app.get(
    '/',
    (req,res)=>{
        res.send(
            {
                activeStatus:true,
                error:false
            }
        )
    }
)



app.use(
    (req,res)=>{
        res.status(404).send(`<h1>404 Not Found</h1>`)
    }

)


app.listen(env.PORT, env.HOST, (error)=>{
    if(error){
        console.error(`Error in starting the server: ${error}`);
    }else{
        console.log(`Server is running on http://${env.HOST}:${env.PORT}`);
    }

})