import express from 'express';
import * as controller from '../Controller/control.js';


const router =express.Router()


router
    .route('/api/data')
    .get(controller.getApiData);

router
    .route('/api/userId')
    .get(controller.fetchingUserDataById)






export const  OperationalRouter =router;