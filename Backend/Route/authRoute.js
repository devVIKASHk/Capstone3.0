import express from 'express'

import * as authControl from '../Controller/authControl.js';
import { authenticationVerification } from '../Controller/authmiddleware.js';


const router = express.Router();


router
    .route('/api/user/register')
    .post(authControl.registerUser);

router
    .route('/api/user/login')
    .post(authControl.loginUser);


router
    .route('/api/protectedRoute')
    .get(authenticationVerification,authControl.routeProtected);


router
    .route('/api/cleanLogout')
    .post(authControl.sessionDeletionAfterRefreshTokenDeletion);
router
    .route('/api/googleAuth')
    .get(authControl.googleAuth)
router
    .route('/auth/google/callback')
    .get(authControl.googleAuthCallback)

router
    .route('/api/logout')
    .get(authControl.loggingOut);




export const  AuthRouter  = router;


