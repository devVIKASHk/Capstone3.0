import {Google} from 'arctic';
import 'dotenv/config';

const clientId = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;

export const google = new Google(clientId,clientSecret,'http://localhost:4000/auth/google/callback')
