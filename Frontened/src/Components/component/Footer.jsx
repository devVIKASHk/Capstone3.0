import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <h3 className="text-xl font-bold">Fitness Challenges</h3>
          <p className="text-sm text-gray-400 mt-2">Push your limits. Track your progress. Win the challenge.</p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><NavLink to="/" className="hover:underline">Home</NavLink></li>
            <li><NavLink to="/user/challenges" className="hover:underline">Challenges</NavLink></li>
            <li><NavLink to="/user/profile" className="hover:underline">Profile</NavLink></li>
          </ul>
        </div>

        {/* Contact or About */}
        <div>
          <h4 className="font-semibold mb-3">About Us</h4>
          <p className="text-sm text-gray-400">We're a team of fitness enthusiasts making wellness fun and competitive.</p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-6">&copy; {new Date().getFullYear()} Fitness Challenges. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
