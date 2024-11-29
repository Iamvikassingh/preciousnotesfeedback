import React from 'react';
import './Feedbackform.css';
import projectlogo from '../assets/preciouslogo.png';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-gray-900 shadow-lg py-4 text-white">
            <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center mx-auto px-4 container">
                {/* Left Section: Logo and Project Name */}
                <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                    <img src={projectlogo} className="w-12 sm:w-16 md:w-20" alt="Precious Notes Logo" />
                    <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">PreciousNotes</h1>
                </div>

                {/* Right Section: Navigation Buttons */}
                <div className="flex flex-wrap justify-center sm:justify-end space-x-2 sm:space-x-4">
                    <Link
                        to="/"
                        className="bg-indigo-600 hover:bg-indigo-700 my-2 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition duration-300"
                    >
                        Home
                    </Link>
                    <Link
                        to="/Getallfeedback"
                        className="bg-indigo-600 hover:bg-indigo-700 my-2 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition duration-300"
                    >
                        See Feedback
                    </Link>
                    <a
                        href="https://myportfoliobyvikassingh.netlify.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-indigo-600 hover:bg-indigo-700 my-2 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition duration-300"
                    >
                        View Portfolio
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;
