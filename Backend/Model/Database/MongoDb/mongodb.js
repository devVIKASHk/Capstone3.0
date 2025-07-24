import 'dotenv/config'
import {MongoClient} from 'mongodb';


const uri=`mongodb+srv://vikashkumar2024:VpgZTXpEFody0OdE@mystriveupcluster.w0w0tfz.mongodb.net/fitnessChallenges?retryWrites=true&w=majority`

const client = new MongoClient(uri);

let db,collection;
const mongodbServerConnection = async ()=>{
    try{
        await client.connect();
        db= client.db('fitnessChallenges');
        collection= db.collection('apiData')
    }catch(err){
        console.error(' Failed to connect to MongoDB:', err.message);
        process.exit(1);
    }
}

await mongodbServerConnection();
export const tools = {db,collection}



