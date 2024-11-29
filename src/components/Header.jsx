import React from 'react';
import './Feedbackform.css';
import projectlogo from '../assets/preciouslogo.png'

function Header() {
    return (
        <header className="bg-gray-900 py-4 text-white">
            <div className="flex justify-between items-center mx-auto container">

                {/* Project Name */}
                <h1 className="d-flex items-center font-bold text-2xl">
                    <span>
                        {/* project image */}
                        <img src={projectlogo} className='w-20 img-fluid' alt="" />
                    </span>
                    PreciousNotes
                </h1>

                {/* Portfolio Link Button */}
                <a
                    href="https://myportfoliobyvikassingh.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-semibold text-white transition duration-300"
                >
                    View Portfolio
                </a>
            </div>
        </header>
    );
}

export default Header;
