
import {tools} from './Database/MongoDb/mongodb.js';

const {db,collection} =tools;




export const findingApiData= async (exercise)=>{
    try{
        if (exercise==='All Exercises'){
            const data =  await collection.find().toArray();
            return data
        }else{
            const data= await collection.find({'bodyPart':exercise}).toArray();
            return data
        }
        
    }catch(err){
        console.error(`Error while apiData`,err)
    }
}



export const findingInfoById = async (apiId)=>{
    try{
        const info= await collection.findOne({id:apiId});
        return info
    }catch(err){
        console.error('Error while finding apiData by id',err)
    }
}