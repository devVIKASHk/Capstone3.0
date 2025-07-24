import { findingApiData,findingInfoById } from "../Model/model.js";


export const getApiData = async (req, res) => {
  try {
    console.log('Hii')
    const exercise =req.query.exercise;

    
    const data = await findingApiData(exercise);
  
    res.json({
      apiData:data
    })

    
  } catch (err) {
    console.error(`Error while getting API data:`, err.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};


export const fetchingUserDataById = async (req,res)=>{
  try{
      const id = req.query.id;
      console.log(id)
      const info= await findingInfoById(id);
      console.log(info);
      return res.status(200).json(
        {
          data:info
        }
      )
  }catch(err){
    console.log(`Error while finding userData by id:`,err)
  }
}