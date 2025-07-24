// import React from 'react'
// import { useParams ,useNavigate} from 'react-router-dom';

// const ChallengesRouteParameter = () => {
//     const navigate= useNavigate();
//     const {id}=useParams();
//     const [data,setData]=React.useState(null);

//     const handleOnClick = ()=>{
//         navigate('/user/challenges');
//     }

    
//     React.useEffect(
//         ()=>{
//             const dataById = async ()=>{
//                 try{
//                     const res = await fetch(`/api/userId?id=${id}`,
//                         {
//                             credentials:'include'
//                         }
//                     )
//                     const result= await  res.json();

//                     if (!res.ok) throw new Error(`Something went wrong with fetch data with id.`);

//                     setData(
//                         result.data
//                     )

//                 }catch(err){
//                     console.error(`Failed to fetch userId data`,err.message);
//                     throw err
//                 }


//             }

//             dataById();
//         },[id]
//     )
//     console.log(data)
//   if (!data) return <div className="text-white p-4">Loading challenge...</div>;

//   return (
//     <div className="min-h-screen px-5 py-6  text-white" style={{ backgroundColor: '#0F172AE6' }}>
//       <div className="border border-fuchsia-600 rounded-lg p-6 shadow-lg max-w-4xl mx-auto mt-[50px]">
//         <h1 className="text-3xl text-fuchsia-400 font-extrabold text-center mb-4">{data.name.toUpperCase()}</h1>

//         <div className="flex flex-wrap gap-4 text-md mb-12 mt-8 justify-center">
//           <span className="px-3 py-1 rounded-full border border-fuchsia-600 text-purple-500">
//             Difficulty: {data.difficulty}
//           </span>
//           <span className="px-3 py-1 rounded-full border border-fuchsia-600 text-purple-500">
//             Equipment: {data.equipment}
//           </span>
//           <span className="px-3 py-1 rounded-full border border-fuchsia-600 text-purple-500">
//             Body Part: {data.bodyPart}
//           </span>
//           <span className="px-3 py-1 rounded-full border border-fuchsia-600 text-purple-500">
//             Category: {data.category}
//           </span>
//           <span className="px-3 py-1 rounded-full border border-fuchsia-600 text-purple-500">
//             Target: {data.target}
//           </span>
//         </div>

//         <div className="mb-10 ">
//           <h2 className="text-xl font-bold text-purple-400 mb-3">Description</h2>
//           <p className="text-justify text-gray-300 text-sm">{data.description}</p>
//         </div>

//         <div className="mb-6">
//           <h2 className="text-xl font-bold text-purple-400 mb-1">Instructions</h2>
//           <ul className="list-decimal list-inside space-y-1 text-gray-300 text-sm">
//             {data.instructions.map((step, index) => (
//               <li key={index}>{step}</li>
//             ))}
//           </ul>
//         </div>

//         <div className="mb-4">
//           <h2 className="text-xl font-bold text-purple-400 mb-3">Secondary Muscles</h2>
//           <div className="flex gap-2 flex-wrap">
//             {data.secondaryMuscles.map((muscle, index) => (
//               <span
//                 key={index}
//                 className="px-2 py-1 border border-fuchsia-600 rounded-md text-xs text-purple-300"
//               >
//                 {muscle}
//               </span>
//             ))}
//           </div>
//         </div>
//         <button className='mt-3 border-1 border-fuchsia-700 px-2 rounded-md py-1 hover:bg-fuchsia-600' onClick={handleOnClick}>Back To Challenges</button>
//       </div>
      
//     </div>
//   )
// }

// export default ChallengesRouteParameter







"use client"

import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MdFitnessCenter, MdTimer, MdArrowBack, MdPlayArrow, MdBookmark, MdShare } from "react-icons/md"
import { GiMuscleUp, GiRunningNinja, GiTrophyCup } from "react-icons/gi"
import { FaFire, FaUsers, FaChartLine, FaHeart } from "react-icons/fa"
import { IoCheckmarkCircle } from "react-icons/io5"

const ChallengesRouteParameter = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [data, setData] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [isBookmarked, setIsBookmarked] = React.useState(false)

  const handleOnClick = () => {
    navigate("/user/challenges")
  }

  React.useEffect(() => {
    const dataById = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/userId?id=${id}`, {
          credentials: "include",
        })
        const result = await res.json()

        if (!res.ok) throw new Error(`Something went wrong with fetch data with id.`)

        setData(result.data)
      } catch (err) {
        console.error(`Failed to fetch userId data`, err.message)
        throw err
      } finally {
        setLoading(false)
      }
    }

    dataById()
  }, [id])

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return "from-green-500 to-emerald-500"
      case "intermediate":
        return "from-yellow-500 to-orange-500"
      case "expert":
        return "from-red-500 to-pink-500"
      default:
        return "from-fuchsia-500 to-purple-500"
    }
  }

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return <GiRunningNinja className="text-lg" />
      case "intermediate":
        return <MdTimer className="text-lg" />
      case "expert":
        return <FaFire className="text-lg" />
      default:
        return <MdFitnessCenter className="text-lg" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white" style={{ backgroundColor: "#0F172A" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-fuchsia-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-400">Loading challenge details...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white" style={{ backgroundColor: "#0F172A" }}>
        <div className="text-center">
          <GiRunningNinja className="text-6xl text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-heading font-bold text-gray-400 mb-2">Challenge Not Found</h2>
          <p className="text-gray-500 mb-6">The challenge you're looking for doesn't exist.</p>
          <button
            onClick={handleOnClick}
            className="px-6 py-3 bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
          >
            Back to Challenges
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#0F172A" }}>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-fuchsia-900/20 via-purple-900/20 to-pink-900/20 px-5 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <button
            onClick={handleOnClick}
            className="flex items-center gap-2 text-fuchsia-400 hover:text-fuchsia-300 transition-colors duration-300 mb-8 group"
          >
            <MdArrowBack className="text-xl group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold">Back to Challenges</span>
          </button>

          {/* Challenge Header */}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${getDifficultyColor(data.difficulty)} text-white`}
                >
                  {getDifficultyIcon(data.difficulty)}
                  {data.difficulty?.charAt(0).toUpperCase() + data.difficulty?.slice(1)}
                </span>
                <span className="px-3 py-1 bg-fuchsia-500/20 text-fuchsia-400 rounded-full text-sm font-semibold">
                  {data.category}
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold">
                  {data.bodyPart}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6">
                <span className="bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {data.name?.toUpperCase()}
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed mb-8 font-para">{data.description}</p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl p-4 border border-fuchsia-500/20 text-center">
                  <MdFitnessCenter className="text-2xl text-fuchsia-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Equipment</p>
                  <p className="font-semibold text-white">{data.equipment}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl p-4 border border-purple-500/20 text-center">
                  <GiMuscleUp className="text-2xl text-purple-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Target</p>
                  <p className="font-semibold text-white">{data.target}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl p-4 border border-pink-500/20 text-center">
                  <FaUsers className="text-2xl text-pink-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Participants</p>
                  <p className="font-semibold text-white">1.2K+</p>
                </div>
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl p-4 border border-green-500/20 text-center">
                  <FaChartLine className="text-2xl text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Success Rate</p>
                  <p className="font-semibold text-white">94%</p>
                </div>
              </div>
            </div>

            {/* Action Panel */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-fuchsia-500/20 p-6 sticky top-8">
                <h3 className="text-2xl font-heading font-bold text-fuchsia-400 mb-6 text-center">
                  Start Your Challenge
                </h3>

                <button className="w-full bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg mb-4 flex items-center justify-center gap-2">
                  <MdPlayArrow className="text-2xl" />
                  Begin Challenge
                </button>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border transition-all duration-300 ${
                      isBookmarked
                        ? "bg-fuchsia-500/20 border-fuchsia-500 text-fuchsia-400"
                        : "border-gray-600 text-gray-400 hover:border-fuchsia-500 hover:text-fuchsia-400"
                    }`}
                  >
                    <MdBookmark />
                    {isBookmarked ? "Saved" : "Save"}
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-gray-600 text-gray-400 hover:border-purple-500 hover:text-purple-400 transition-all duration-300">
                    <MdShare />
                    Share
                  </button>
                </div>

                <div className="text-center text-sm text-gray-400">
                  <p className="mb-2">Join thousands who completed this challenge</p>
                  <div className="flex items-center justify-center gap-1">
                    <FaHeart className="text-red-500" />
                    <span>4.8/5 rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-5 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Instructions */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-fuchsia-500/20 p-8">
                <h2 className="text-3xl font-heading font-bold text-fuchsia-400 mb-6 flex items-center gap-3">
                  <IoCheckmarkCircle className="text-green-500" />
                  Exercise Instructions
                </h2>

                <div className="space-y-4">
                  {data.instructions?.map((step, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-fuchsia-500/30 transition-colors duration-300"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-gray-300 leading-relaxed font-para">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Muscles */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-purple-500/20 p-8">
                <h2 className="text-3xl font-heading font-bold text-purple-400 mb-6 flex items-center gap-3">
                  <GiMuscleUp />
                  Secondary Muscles Worked
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {data.secondaryMuscles?.map((muscle, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg px-4 py-3 text-center hover:border-purple-500/50 transition-colors duration-300"
                    >
                      <span className="text-purple-300 font-semibold capitalize">{muscle}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Challenge Stats */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-fuchsia-500/20 p-6">
                <h3 className="text-xl font-heading font-bold text-fuchsia-400 mb-4 flex items-center gap-2">
                  <GiTrophyCup />
                  Challenge Stats
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Difficulty</span>
                    <span className="text-white font-semibold capitalize">{data.difficulty}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Body Part</span>
                    <span className="text-fuchsia-400 font-semibold capitalize">{data.bodyPart}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Equipment</span>
                    <span className="text-purple-400 font-semibold capitalize">{data.equipment}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Target Muscle</span>
                    <span className="text-pink-400 font-semibold capitalize">{data.target}</span>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-green-500/20 p-6">
                <h3 className="text-xl font-heading font-bold text-green-400 mb-4 flex items-center gap-2">
                  <FaFire />
                  Pro Tips
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">Focus on proper form over speed</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">Take breaks when needed</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">Stay hydrated throughout</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">Track your progress daily</p>
                  </div>
                </div>
              </div>

              {/* Related Challenges */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-blue-500/20 p-6">
                <h3 className="text-xl font-heading font-bold text-blue-400 mb-4">Similar Challenges</h3>

                <div className="space-y-3">
                  <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-blue-500/30 transition-colors duration-300 cursor-pointer">
                    <p className="text-white font-semibold text-sm">Upper Body Blast</p>
                    <p className="text-gray-400 text-xs">Intermediate • 15 min</p>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-blue-500/30 transition-colors duration-300 cursor-pointer">
                    <p className="text-white font-semibold text-sm">Core Crusher</p>
                    <p className="text-gray-400 text-xs">Expert • 20 min</p>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-blue-500/30 transition-colors duration-300 cursor-pointer">
                    <p className="text-white font-semibold text-sm">Cardio Burn</p>
                    <p className="text-gray-400 text-xs">Beginner • 10 min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChallengesRouteParameter
