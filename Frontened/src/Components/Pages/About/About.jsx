import React from 'react';
import { NavLink } from 'react-router-dom';
import { GiRunningNinja, GiMuscleUp, GiTrophyCup, GiHeartBeats } from "react-icons/gi";
import { FaUsers, FaChartLine, FaFire, FaHeart, FaLightbulb, FaRocket, FaShieldAlt } from "react-icons/fa";
import { MdFitnessCenter, MdTimer, MdEmojiEvents, MdGroup, MdTrendingUp, MdSecurity } from "react-icons/md";
import { IoMdRocket } from "react-icons/io";
import { useGlobalContext } from '../../component/globalContext/GlobalProvider';

const About = () => {
  const { refreshToken } = useGlobalContext();

  const stats = [
    { number: "500+", label: "Workout Exercises", icon: <MdFitnessCenter /> },
    { number: "10K+", label: "Active Members", icon: <FaUsers /> },
    { number: "50K+", label: "Challenges Completed", icon: <GiTrophyCup /> },
    { number: "95%", label: "Success Rate", icon: <FaChartLine /> }
  ];

  const features = [
    {
      icon: <GiRunningNinja className="text-4xl text-fuchsia-500" />,
      title: "Diverse Workouts",
      description: "From beginner-friendly routines to advanced challenges, we offer exercises for every fitness level and body part."
    },
    {
      icon: <MdTimer className="text-4xl text-purple-500" />,
      title: "Progress Tracking",
      description: "Monitor your fitness journey with detailed analytics, streak tracking, and personalized progress reports."
    },
    {
      icon: <FaUsers className="text-4xl text-pink-500" />,
      title: "Community Support",
      description: "Join a thriving community of fitness enthusiasts who motivate and support each other's goals."
    },
    {
      icon: <GiTrophyCup className="text-4xl text-fuchsia-500" />,
      title: "Achievement System",
      description: "Unlock badges, compete in leaderboards, and celebrate milestones as you progress on your fitness journey."
    },
    {
      icon: <MdSecurity className="text-4xl text-purple-500" />,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security. We respect your privacy and never share personal information."
    },
    {
      icon: <FaRocket className="text-4xl text-pink-500" />,
      title: "Continuous Innovation",
      description: "We constantly update our platform with new features, exercises, and improvements based on user feedback."
    }
  ];

  const values = [
    {
      icon: <FaHeart className="text-3xl text-red-500" />,
      title: "Health First",
      description: "We prioritize your wellbeing above all else, promoting sustainable and healthy fitness practices."
    },
    {
      icon: <FaLightbulb className="text-3xl text-yellow-500" />,
      title: "Innovation",
      description: "We embrace cutting-edge technology to create the most effective and engaging fitness experience."
    },
    {
      icon: <MdGroup className="text-3xl text-blue-500" />,
      title: "Community",
      description: "We believe in the power of community support and shared motivation to achieve fitness goals."
    },
    {
      icon: <FaShieldAlt className="text-3xl text-green-500" />,
      title: "Integrity",
      description: "We maintain transparency, honesty, and ethical practices in everything we do."
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former Olympic trainer with 15+ years of experience in fitness coaching and sports science.",
      initial: "S"
    },
    {
      name: "Mike Chen",
      role: "Head of Product",
      bio: "Tech entrepreneur passionate about creating innovative solutions for health and wellness.",
      initial: "M"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Chief Medical Officer",
      bio: "Sports medicine physician specializing in exercise physiology and injury prevention.",
      initial: "E"
    },
    {
      name: "Alex Thompson",
      role: "Lead Developer",
      bio: "Full-stack developer with expertise in creating scalable fitness and health applications.",
      initial: "A"
    }
  ];

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#0F172A' }}>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-5 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/20 via-purple-900/20 to-pink-900/20"></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold mb-6">
            <span className="bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              About StriveUp
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 font-para">
            Empowering Your Fitness Journey Since Day One
          </p>
          
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-4xl mx-auto font-para leading-relaxed">
            We're more than just a fitness platform. We're your dedicated partner in achieving lasting health, 
            building strength, and creating sustainable wellness habits that transform lives.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {!refreshToken && (
              <NavLink 
                to="/user/register" 
                className="px-8 py-4 bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 rounded-lg text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Join Our Community
              </NavLink>
            )}
            <NavLink 
              to="/user/challenges" 
              className="px-8 py-4 border-2 border-fuchsia-500 rounded-lg text-lg font-semibold hover:bg-fuchsia-500/10 transition-all duration-300"
            >
              Explore Challenges
            </NavLink>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <GiHeartBeats className="text-6xl text-fuchsia-500/30" />
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse">
          <IoMdRocket className="text-5xl text-purple-500/30" />
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Our Story
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-heading font-bold text-fuchsia-400 mb-6">
                Born from Passion, Built for Results
              </h3>
              <div className="space-y-6 text-gray-300 font-para leading-relaxed">
                <p>
                  StriveUp was founded in 2024 with a simple yet powerful vision: to make fitness accessible, 
                  engaging, and sustainable for everyone, regardless of their starting point or experience level.
                </p>
                <p>
                  Our founders, a team of fitness professionals, technologists, and health advocates, 
                  recognized that traditional fitness approaches often failed to provide the motivation, 
                  guidance, and community support needed for long-term success.
                </p>
                <p>
                  Today, we're proud to serve thousands of users worldwide, helping them transform their 
                  lives through structured challenges, expert guidance, and a supportive community that 
                  celebrates every victory, no matter how small.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-fuchsia-900/30 via-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-fuchsia-500/30">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-3">
                        <div className="text-3xl text-fuchsia-500">
                          {stat.icon}
                        </div>
                      </div>
                      <div className="text-2xl md:text-3xl font-number font-bold bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-1">
                        {stat.number}
                      </div>
                      <div className="text-gray-400 text-sm font-para">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Mission */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-fuchsia-500/20 p-8">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full p-3 mr-4">
                  <MdTrendingUp className="text-3xl text-white" />
                </div>
                <h3 className="text-3xl font-heading font-bold text-fuchsia-400">Our Mission</h3>
              </div>
              <p className="text-gray-300 font-para leading-relaxed text-lg">
                To democratize fitness by providing accessible, science-backed workout programs and 
                fostering a supportive community where everyone can achieve their health and wellness goals, 
                regardless of their background or fitness level.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-purple-500/20 p-8">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-3 mr-4">
                  <FaRocket className="text-3xl text-white" />
                </div>
                <h3 className="text-3xl font-heading font-bold text-purple-400">Our Vision</h3>
              </div>
              <p className="text-gray-300 font-para leading-relaxed text-lg">
                To become the world's leading fitness platform that transforms lives through innovative 
                technology, expert guidance, and community support, making healthy living a joyful and 
                sustainable lifestyle choice for millions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                What Makes Us Different
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-para">
              We've built StriveUp with features that address real fitness challenges and provide genuine value to our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-6 rounded-xl border border-fuchsia-500/20 hover:border-fuchsia-500/40 transition-all duration-300 hover:scale-105">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-center mb-4 text-fuchsia-400">
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

      {/* Values Section */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Our Core Values
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-para">
              These principles guide everything we do and shape the experience we create for our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-full p-6 border border-fuchsia-500/20">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-heading font-bold mb-4 text-fuchsia-400">
                  {value.title}
                </h3>
                <p className="text-gray-300 font-para leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-para">
              The passionate individuals behind StriveUp who are dedicated to your fitness success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-fuchsia-500/20 p-6 text-center hover:border-fuchsia-500/40 transition-all duration-300 hover:scale-105">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-fuchsia-600 via-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold">
                  {member.initial}
                </div>
                <h3 className="text-xl font-heading font-bold text-fuchsia-400 mb-2">
                  {member.name}
                </h3>
                <p className="text-purple-400 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-300 text-sm font-para leading-relaxed">
                  {member.bio}
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
                Ready to Start Your Journey?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 font-para">
              Join thousands of fitness enthusiasts who have already transformed their lives with StriveUp.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {!refreshToken ? (
                <>
                  <NavLink 
                    to="/user/register" 
                    className="px-10 py-4 bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 rounded-lg text-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Join Free Today
                  </NavLink>
                  <NavLink 
                    to="/user/challenges" 
                    className="px-10 py-4 border-2 border-fuchsia-500 rounded-lg text-xl font-semibold hover:bg-fuchsia-500/10 transition-all duration-300"
                  >
                    Browse Challenges
                  </NavLink>
                </>
              ) : (
                <NavLink 
                  to="/user/challenges" 
                  className="px-10 py-4 bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 rounded-lg text-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Continue Your Journey
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-5 border-t border-fuchsia-500/20">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-heading font-bold text-fuchsia-400 mb-4">
            Get in Touch
          </h3>
          <p className="text-gray-400 font-para mb-6">
            Have questions or feedback? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:hello@striveup.com" 
              className="px-6 py-3 bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 rounded-lg hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </a>
            <a 
              href="#" 
              className="px-6 py-3 border border-fuchsia-500 rounded-lg hover:bg-fuchsia-500/10 transition-all duration-300"
            >
              Follow Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
