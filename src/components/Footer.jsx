import React from 'react';
import './Feedbackform.css';

function Footer() {
    return (
        <footer className="bg-gray-900 py-4 text-center text-white">
            <div className="mx-auto container">
                <p className="mb-2 font-semibold text-3xl">PreciousNotes Feedback System</p>
                <p className="text-sm">Developed by <span className="font-bold">Vikas Singh</span> for the PreciousNotes project.</p>
                <p className="mt-2 text-xs">© {new Date().getFullYear()} PreciousNotes. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
