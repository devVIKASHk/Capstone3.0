// import React from 'react';
// import { useGlobalContext } from '../../component/globalContext/GlobalProvider';
// import { useLocation } from 'react-router-dom';






// const Home = () => {
//   const { message, handleMessage, settingRefreshToken } = useGlobalContext();
//   const { search } = useLocation();
//   const params = new URLSearchParams(search);

//   React.useEffect(
//     () => {

//       if (params.get('name')) {
//         console.log(params.get('name'))
//         const messages = `Welcome ${(params.get('name'))}, You are LoggedIn Successfully!`;
//         handleMessage(messages);

//       }

//       if (params.get('id')) {
//         console.log(params.get('id'));
//         settingRefreshToken(params.get('id'));
//       }
//     },[]
//   )








//   return (
//     <h3>{message}</h3>
//   )
// }

// export default Home





// import React from 'react';
// import { useGlobalContext } from '../../component/globalContext/GlobalProvider';
// import { useLocation, Link } from 'react-router-dom';
// import { Dumbbell, Flame, Footprints } from 'lucide-react';

// const challenges = [
//   {
//     title: "10K Steps Daily",
//     desc: "Walk your way to better health and consistency.",
//     icon: <Footprints className="w-10 h-10 text-indigo-500" />
//   },
//   {
//     title: "Yoga Flex Challenge",
//     desc: "Boost your flexibility with daily yoga sessions.",
//     icon: <Flame className="w-10 h-10 text-pink-500" />
//   },
//   {
//     title: "No Sugar Week",
//     desc: "Break free from sugar cravings and feel refreshed.",
//     icon: <Dumbbell className="w-10 h-10 text-green-500" />
//   }
// ];

// const Home = () => {
//   const { message, handleMessage, settingRefreshToken } = useGlobalContext();
//   const { search } = useLocation();
//   const params = new URLSearchParams(search);

//   React.useEffect(() => {
//     if (params.get('name')) {
//       const messages = `Welcome ${params.get('name')}, You are Logged In Successfully!`;
//       handleMessage(messages);
//     }
//     if (params.get('id')) {
//       settingRefreshToken(params.get('id'));
//     }
//   }, []);

//   return (
//     <main className="min-h-screen bg-white text-gray-800 font-sans">
//       {/* Hero Section */}
//       <section className="h-[90vh] flex flex-col justify-center items-center text-center bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white px-4 relative overflow-hidden">
//         <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in">
//           Push Limits. Track Progress. Get Fit.
//         </h1>
//         <p className="text-lg md:text-xl max-w-xl mb-6 opacity-90">
//           Join a community of fitness enthusiasts and complete exciting challenges every week.
//         </p>

//         {/* Dynamic Welcome Message */}
//         {message && (
//           <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white text-lg mb-6 shadow-lg animate-fade-in-down">
//             🎉 {message}
//           </div>
//         )}

//         <Link
//           to="/challenges"
//           className="bg-white text-indigo-600 px-6 py-3 rounded-full font-bold text-lg shadow hover:scale-105 transition"
//         >
//           🚀 Explore Challenges
//         </Link>
//       </section>

//       {/* Featured Challenges */}
//       <section className="py-20 bg-gray-50">
//         <h2 className="text-3xl font-bold text-center mb-12">🔥 Popular Challenges</h2>
//         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
//           {challenges.map((c, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 text-center"
//             >
//               <div className="mb-4 flex justify-center">{c.icon}</div>
//               <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
//               <p className="text-sm text-gray-600">{c.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 text-center bg-indigo-50">
//         <h2 className="text-3xl font-bold mb-4">Start Your Fitness Journey Today</h2>
//         <p className="mb-6 text-gray-700">Track your activities, join fun challenges, and level up your health.</p>
//         <Link
//           to="/profile"
//           className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition"
//         >
//           Go to Dashboard
//         </Link>
//       </section>

//       {/* Motivational Quote */}
//       <section className="py-16 px-4 bg-white">
//         <h2 className="text-2xl font-bold text-center mb-8">💬 Get Inspired</h2>
//         <blockquote className="text-center italic text-gray-700 max-w-xl mx-auto">
//           “The only bad workout is the one that didn’t happen.”
//         </blockquote>
//       </section>
//     </main>
//   );
// };

// export default Home;







import React from 'react';
import { useGlobalContext } from '../../component/globalContext/GlobalProvider';
import { useLocation, NavLink } from 'react-router-dom';
import { GiRunningNinja, GiMuscleUp, GiTrophyCup } from "react-icons/gi";
import { FaUsers, FaChartLine, FaFire } from "react-icons/fa";
import { MdFitnessCenter, MdTimer, MdEmojiEvents } from "react-icons/md";

const Home = () => {
  const { message, handleMessage, settingRefreshToken, refreshToken } = useGlobalContext();
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  React.useEffect(
    () => {
      if (params.get('name')) {
        console.log(params.get('name'))
        const messages = `Welcome ${(params.get('name'))}, You are LoggedIn Successfully!`;
        handleMessage(messages);
      }

      if (params.get('id')) {
        console.log(params.get('id'))
        console.log(params.get('id'));
        settingRefreshToken(params.get('id'));
      }
    }, []
  )

  const features = [
    {
      icon: <GiRunningNinja className="text-4xl text-fuchsia-500" />,
      title: "Diverse Challenges",
      description: "Access hundreds of fitness challenges targeting different muscle groups and fitness levels."
    },
    {
      icon: <MdTimer className="text-4xl text-purple-500" />,
      title: "Track Progress",
      description: "Monitor your fitness journey with detailed progress tracking and performance analytics."
    },
    {
      icon: <GiTrophyCup className="text-4xl text-pink-500" />,
      title: "Achievements",
      description: "Unlock achievements and compete with others to stay motivated on your fitness journey."
    }
  ];

  const stats = [
    { number: "500+", label: "Exercises", icon: <MdFitnessCenter /> },
    { number: "10K+", label: "Active Users", icon: <FaUsers /> },
    { number: "50K+", label: "Challenges Completed", icon: <FaChartLine /> },
    { number: "95%", label: "Success Rate", icon: <FaFire /> }
  ];

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#0F172A' }}>
      {/* Success Message */}
      {message && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 rounded-lg shadow-lg border border-green-400">
          <p className="text-white font-medium">{message}</p>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-5 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/20 via-purple-900/20 to-pink-900/20"></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold mb-6">
            <span className="bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              STRIVEUP
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 font-para">
            Transform Your Body, Elevate Your Mind
          </p>
          
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto font-para">
            Join thousands of fitness enthusiasts in our comprehensive challenge platform. 
            Push your limits, track your progress, and achieve your fitness goals with personalized workouts.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {refreshToken ? (
              <NavLink 
                to="/user/challenges" 
                className="px-8 py-4 bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 rounded-lg text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Start Your Journey
              </NavLink>
            ) : (
              <>
                <NavLink 
                  to="/user/register" 
                  className="px-8 py-4 bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 rounded-lg text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Get Started Free
                </NavLink>
                <NavLink 
                  to="/user/login" 
                  className="px-8 py-4 border-2 border-fuchsia-500 rounded-lg text-lg font-semibold hover:bg-fuchsia-500/10 transition-all duration-300"
                >
                  Sign In
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <GiMuscleUp className="text-6xl text-fuchsia-500/30" />
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse">
          <MdEmojiEvents className="text-5xl text-purple-500/30" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="text-4xl text-fuchsia-500">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-number font-bold bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-para">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Why Choose StriveUp?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-para">
              Experience the ultimate fitness platform designed to help you achieve your goals faster and more effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-8 rounded-xl border border-fuchsia-500/20 hover:border-fuchsia-500/40 transition-all duration-300 hover:scale-105">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold text-center mb-4 text-fuchsia-400">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-center font-para leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-fuchsia-900/30 via-purple-900/30 to-pink-900/30 p-12 rounded-2xl border border-fuchsia-500/30">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Ready to Transform?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 font-para">
              Join our community of fitness enthusiasts and start your transformation journey today.
            </p>
            {!refreshToken && (
              <NavLink 
                to="/user/register" 
                className="inline-block px-10 py-4 bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 rounded-lg text-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Start Your Free Trial
              </NavLink>
            )}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-5 border-t border-fuchsia-500/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 font-para mb-4">
            Ready to take your fitness to the next level?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink 
              to="/about" 
              className="px-6 py-3 border border-fuchsia-500 rounded-lg hover:bg-fuchsia-500/10 transition-all duration-300"
            >
              Learn More
            </NavLink>
            {refreshToken && (
              <NavLink 
                to="/user/profile" 
                className="px-6 py-3 bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 rounded-lg hover:scale-105 transition-all duration-300"
              >
                View Profile
              </NavLink>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home































