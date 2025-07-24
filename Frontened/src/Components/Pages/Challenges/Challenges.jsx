// import React from 'react'
// import { NavLink } from 'react-router-dom';


// const Challenges = () => {
//   const [data, setData] = React.useState([]);
//   const [exerciseName,setExerciseName]= React.useState('All Exercises')

  

//   const exercises = ['All Exercises','waist','back','chest','upper arms', 'shoulders']
  



//   React.useEffect(
//     () => {
//      const apiFetch = async ()=>{
//       try{
//         const res = await fetch(`/api/data?exercise=${exerciseName}`,
//           {
//             method:'GET',
//             credentials:'include'
//           }
//         );
//         const result = await res.json();
        
//         if (!res.ok) throw new Error(`Failed to Fetch api!`);
//         const apiData=result.apiData;
//         setData(
//           [...apiData]
//         )
//       }catch(err){
//         console.error(`ERROR: `, err.message);
//         throw err
//       }
//      }
//      apiFetch()
//     }, [exerciseName]
//   )
//   console.log(data)

  

//   return (

//     <div className='challenges min-w-[150px]  px-5 py-5' style={{ backgroundColor: '#0F172AE6'}}>
//       <h1 className='p-3 rounded-lg text-center border-1 border-fuchsia-600 text-[3vw] sm:text-[2rem] md:text-2xl   bg-gradient-to-r  via-purple-600 text-fuchsia-200'>Fitness Challenges</h1>




//       <div className='border-1 border-fuchsia-600  rounded-md mt-[30px]'>
//         <ul className='flex overflow-auto whitespace-nowrap px-5 py-2.5 gap-[30px] ' style={{scrollbarWidth:'none'}}>
//           {
//             exercises.map(
//               (exercise,index)=>{
//                 const isSelected=exerciseName===exercise;
//                 return (<li key={index} className={`bg-gradient-to-r from-purple border-1 border-fuchsia-600 rounded-lg px-3 py-1 ${isSelected?'bg-gradient-to-r from-purple-500 via-fuchsia-400 to-purple-500':null}`}
//                 onClick={()=>{setExerciseName(exercise)}}>{exercise}</li>)
//               }
//             )
//           }
//         </ul>
//       </div>

//       <div className='w-full h-[80vh] mt-[30px] pt-4 pl-2 lg:pl-10 flex flex-wrap overflow-auto gap-[20px] border-1 border-fuchsia-600 rounded-md'>
//         {
//           data.map(
//             (obj,index) =>(
          
              
//                   <NavLink to={`/user/challenges/${obj.id}`} 
                  
                  
//                     key={index} className='workoutdiv md:w-[31.5%] sm:w-[48%] w-[98%] px-5 pt-2 pb-5 sm:px-2 sm:pt-1 sm:pb-3' >
//                 <span className=' border-1 border-fuchsia-600 rounded-lg text-purple-700 px-3 '>{(obj.difficulty)[0].toUpperCase()+obj.difficulty.slice(1)}</span>


//                 <div className='mt-[10px]'>
//                   <p className=' text-fuchsia-500 inline font-bold '>
//                     Name: 
//                   </p>
//                   <span className='font-extrabold text-[12px] ml-[5px] underline  text-shadow-gray-500  '>{obj.name.toUpperCase()}</span>
//                 </div>
//                 <div className='mt-[10px] mb-[10px]'>
//                   <p className=' text-fuchsia-500 inline '>
//                     Equipment:
//                   </p>
//                   <span className='font-bold text-[12px] ml-[5px]   text-shadow-gray-500  '>{(obj.equipment[0].toUpperCase())+(obj.equipment.slice(1))}</span>
//                 </div>
//                <div className=''>

//                   <p className='font-bold text-auto text-purple-600'>Description</p>
//                  <p className='text-[12px] text-gray-300 text-justify'>
//                   {obj.description}
//                 </p>
//                </div>
//               </NavLink>
                
             
//             )
//           )
//         }
//       </div>



//       {/* <div className='p-3 rounded-lg text-center border-1 border-fuchsia-600    bg-gradient-to flex justify-between flex-col sm:flex-row  sm:text-[1rem] text-[2vw]'>

//         <div className='flex gap-3 flex-col sm:flex-row '>
//           <button className='bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 px-2 rounded-sm sm:py-0 py-[3px]' onClick={() => setOffset(0)}>First Page</button>
//           <button className='bg-fuchsia-700 px-2 rounded-sm sm:py-0 py-[3px]' onClick={handlePrev}>Prev</button>
//         </div>

//         <div className='flex gap-3 flex-col sm:flex-row mt-[10px] sm:mt-0 '>
//           <button className='bg-fuchsia-700 px-2 rounded-sm sm:py-0 py-[3px]' onClick={handleNext} disabled={offset>=1290}>Next</button>
//           <button className='bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 px-2 rounded-sm sm:py-0 py-[3px]' onClick={() => setOffset(1290)}>Last Page</button>
//         </div>

//       </div> */}

//     </div>



//   )
// }

// export default Challenges








import React from 'react'
import { NavLink } from 'react-router-dom';
import { GiMuscleUp, GiRunningNinja } from "react-icons/gi";
import { MdFitnessCenter, MdTimer, MdTrendingUp } from "react-icons/md";
import { FaFire, FaSearch, FaFilter } from "react-icons/fa";

const Challenges = () => {
  const [data, setData] = React.useState([]);
  const [exerciseName, setExerciseName] = React.useState('All Exercises')
  const [loading, setLoading] = React.useState(false);

  const exercises = ['All Exercises', 'waist', 'back', 'chest', 'upper arms', 'shoulders']

  React.useEffect(
    () => {
      const apiFetch = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/data?exercise=${exerciseName}`,
            {
              method: 'GET',
              credentials: 'include'
            }
          );
          const result = await res.json();

          if (!res.ok) throw new Error(`Failed to Fetch api!`);
          const apiData = result.apiData;
          setData([...apiData])
        } catch (err) {
          console.error(`ERROR: `, err.message);
          throw err
        } finally {
          setLoading(false);
        }
      }
      apiFetch()
    }, [exerciseName]
  )

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'from-green-500 to-emerald-500';
      case 'intermediate':
        return 'from-yellow-500 to-orange-500';
      case 'expert':
        return 'from-red-500 to-pink-500';
      default:
        return 'from-fuchsia-500 to-purple-500';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return <MdTrendingUp className="text-sm" />;
      case 'intermediate':
        return <MdTimer className="text-sm" />;
      case 'expert':
        return <FaFire className="text-sm" />;
      default:
        return <MdFitnessCenter className="text-sm" />;
    }
  };

  return (
    <div className='min-h-screen text-white px-5 py-8' style={{ backgroundColor: '#0F172A' }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-4'>
            <span className="bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Fitness Challenges
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-para">
            Transform your body with our comprehensive collection of workout challenges designed for every fitness level.
          </p>
        </div>

        {/* Filter Section */}
        <div className='bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-fuchsia-500/20 p-6 mb-8'>
          <div className="flex items-center gap-3 mb-4">
            <FaFilter className="text-fuchsia-500 text-xl" />
            <h2 className="text-2xl font-heading font-bold text-fuchsia-400">Filter by Category</h2>
          </div>
          
          <div className='overflow-x-auto'>
            <div className='flex gap-4 pb-2 min-w-max'>
              {exercises.map((exercise, index) => {
                const isSelected = exerciseName === exercise;
                return (
                  <button
                    key={index}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                      isSelected
                        ? 'bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 text-white shadow-lg scale-105'
                        : 'bg-gradient-to-r from-gray-700/50 to-gray-600/50 border border-fuchsia-500/30 text-gray-300 hover:border-fuchsia-500/50 hover:text-white hover:scale-105'
                    }`}
                    onClick={() => { setExerciseName(exercise) }}
                  >
                    {exercise === 'All Exercises' ? (
                      <span className="flex items-center gap-2">
                        <GiRunningNinja /> {exercise}
                      </span>
                    ) : (
                      exercise.charAt(0).toUpperCase() + exercise.slice(1)
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FaSearch className="text-fuchsia-500" />
            <span className="text-gray-400 font-para">
              {loading ? 'Loading...' : `${data.length} challenges found`}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Category: <span className="text-fuchsia-400 font-semibold">{exerciseName}</span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-fuchsia-500"></div>
          </div>
        )}

        {/* Challenges Grid */}
        {!loading && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {data.map((obj, index) => (
              <NavLink 
                to={`/user/challenges/${obj.id}`} 
                key={index} 
                className='group bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-fuchsia-500/20 p-6 hover:border-fuchsia-500/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-fuchsia-500/10'
              >
                {/* Difficulty Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${getDifficultyColor(obj.difficulty)} text-white`}>
                    {getDifficultyIcon(obj.difficulty)}
                    {obj.difficulty.charAt(0).toUpperCase() + obj.difficulty.slice(1)}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <GiMuscleUp className="text-fuchsia-500 text-xl" />
                  </div>
                </div>

                {/* Exercise Name */}
                <div className='mb-4'>
                  <h3 className='text-xl font-heading font-bold text-white mb-2 group-hover:text-fuchsia-400 transition-colors duration-300'>
                    {obj.name.toUpperCase()}
                  </h3>
                </div>

                {/* Equipment Info */}
                <div className='mb-4'>
                  <div className="flex items-center gap-2 mb-2">
                    <MdFitnessCenter className="text-purple-500" />
                    <span className='text-purple-400 font-semibold text-sm'>Equipment:</span>
                  </div>
                  <span className='text-gray-300 text-sm bg-gray-800/50 px-3 py-1 rounded-lg'>
                    {obj.equipment.charAt(0).toUpperCase() + obj.equipment.slice(1)}
                  </span>
                </div>

                {/* Description */}
                <div className='mb-6'>
                  <h4 className='text-purple-400 font-semibold mb-2 flex items-center gap-2'>
                    <FaFire className="text-sm" />
                    Description
                  </h4>
                  <p className='text-sm text-gray-300 leading-relaxed line-clamp-3'>
                    {obj.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="bg-fuchsia-500/20 px-2 py-1 rounded">
                      {obj.bodyPart}
                    </span>
                    <span className="bg-purple-500/20 px-2 py-1 rounded">
                      {obj.target}
                    </span>
                  </div>
                  <div className="text-fuchsia-400 font-semibold text-sm group-hover:text-fuchsia-300 transition-colors duration-300">
                    Start Challenge →
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && data.length === 0 && (
          <div className="text-center py-20">
            <GiRunningNinja className="text-6xl text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-heading font-bold text-gray-400 mb-2">
              No challenges found
            </h3>
            <p className="text-gray-500">
              Try selecting a different category to see available challenges.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        {!loading && data.length > 0 && (
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-fuchsia-900/20 via-purple-900/20 to-pink-900/20 rounded-2xl border border-fuchsia-500/20">
            <h3 className="text-2xl font-heading font-bold text-fuchsia-400 mb-4">
              Ready to Push Your Limits?
            </h3>
            <p className="text-gray-300 mb-6">
              Choose a challenge that matches your fitness level and start your transformation journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setExerciseName('All Exercises')}
                className="px-6 py-3 bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
              >
                View All Challenges
              </button>
              <NavLink 
                to="/user/profile"
                className="px-6 py-3 border border-fuchsia-500 rounded-lg font-semibold hover:bg-fuchsia-500/10 transition-all duration-300"
              >
                Track Progress
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Challenges

