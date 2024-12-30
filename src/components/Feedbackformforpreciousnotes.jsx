import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaPhone, FaBook, FaStar, FaComments } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import preciouslogo from '../assets/preciouslogo.png';
import Header from './Header';
import Footer from './Footer';

function FeedbackFormForPreciousNotes() {
    const apilinkforfeedback = import.meta.env.VITE_APILINK;
    const [feedbackData, setFeedbackData] = useState({
        sNo: 1, // Auto-increment logic could be handled in the backend
        name: '',
        course: '',
        userType: 'student',
        department: '',
        suggestion: '',
        phone: '',
        rating: 3, // Default rating
    });

    const [isSubmitted, setIsSubmitted] = useState(false); // State to manage form submission
    const [isLoading, setIsLoading] = useState(false); // State to manage loading

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedbackData({ ...feedbackData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Show loader
        try {
            const response = await axios.post(`${apilinkforfeedback}/api/feedback`, feedbackData);

            // Show success message using React Toastify
            toast.success('Feedback submitted successfully!');
            console.log(response.data);

            // Hide the form and show the thank-you message
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting feedback:', error);

            // Show error message using React Toastify
            toast.error('Failed to submit feedback. Please try again.');
        } finally {
            setIsLoading(false); // Hide loader
        }
    };

    return (
        <>
            <Header />
            <div className="flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 min-h-screen">
                {isSubmitted ? (
                    <div className="text-center">
                        <img
                            src={preciouslogo}
                            className="mx-auto mb-6 w-40"
                            alt="Precious Logo"
                        />
                        <h2 className="mb-4 font-bold text-3xl text-white">
                            Thank You for Submitting Your Feedback!
                        </h2>
                        <p className="text-gray-200 text-lg">
                            Your feedback is valuable to us and helps us improve.
                        </p>
                    </div>
                ) : isLoading ? (
                    <div className="text-center">
                        {/* Loader */}
                        <div className="border-white border-t-4 border-b-4 rounded-full w-16 h-16 animate-spin"></div>
                        <p className="mt-4 text-white">Submitting your feedback...</p>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-lg p-8 rounded-lg w-full max-w-lg"
                    >
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <img
                                src={preciouslogo}
                                className="w-40 img-fluid"
                                alt="Precious Logo"
                            />
                        </div>

                        <h2 className="mb-6 font-bold text-center text-gray-800 text-xl">
                            <span className="text-3xl">PreciousNotes...</span>
                            <br />
                            Feedback Form by Vikas Singh
                        </h2>

                        {/* Name */}
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold text-gray-700">
                                <FaUser className="inline mr-2" /> Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={feedbackData.name}
                                onChange={handleChange}
                                className="border-gray-300 px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-500 w-full focus:outline-none"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        {/* Course */}
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold text-gray-700">
                                <FaBook className="inline mr-2" /> Course
                            </label>
                            <input
                                type="text"
                                name="course"
                                value={feedbackData.course}
                                onChange={handleChange}
                                className="border-gray-300 px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-500 w-full focus:outline-none"
                                placeholder="Enter your course"
                                required
                            />
                        </div>

                        {/* User Type */}
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold text-gray-700">User Type</label>
                            <div className="flex items-center">
                                <label className="mr-4">
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="student"
                                        checked={feedbackData.userType === 'student'}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    Student
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="teacher"
                                        checked={feedbackData.userType === 'teacher'}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    Teacher
                                </label>
                            </div>
                        </div>

                        {/* Department */}
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold text-gray-700">Department</label>
                            <input
                                type="text"
                                name="department"
                                value={feedbackData.department}
                                onChange={handleChange}
                                className="border-gray-300 px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-500 w-full focus:outline-none"
                                placeholder="Enter your department"
                                required
                            />
                        </div>

                        {/* Suggestion */}
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold text-gray-700">
                                <FaComments className="inline mr-2" /> Your Suggestion
                            </label>
                            <textarea
                                name="suggestion"
                                value={feedbackData.suggestion}
                                onChange={handleChange}
                                className="border-gray-300 px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-500 w-full focus:outline-none"
                                placeholder="Share your feedback or suggestions"
                                rows="6"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold text-gray-700">
                                <FaPhone className="inline mr-2" /> Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={feedbackData.phone}
                                onChange={handleChange}
                                className="border-gray-300 px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-500 w-full focus:outline-none"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        {/* Rating */}
                        <div className="d-flex flex-column justify-content-center align-items-center mb-4">
                            <label className="block mb-2 font-semibold text-gray-700">
                                <FaStar className="inline mr-2" /> Rating
                            </label>
                            <div className="flex items-center space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setFeedbackData({ ...feedbackData, rating: star })}
                                        className={`text-2xl ${star <= feedbackData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    >
                                        <FaStar />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg w-full font-bold text-white transition duration-200"
                        >
                            Submit Feedback
                        </button>
                    </form>
                )}
                <ToastContainer />
            </div>
            <Footer />
        </>
    );
}

export default FeedbackFormForPreciousNotes;
