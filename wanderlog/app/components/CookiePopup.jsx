import React, { useState } from 'react';

const CookiePolicy = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleAccept = () => {
        
        setIsVisible(false);
    };

    return (
        <>
            {isVisible && (
                <div className="fixed bottom-0 right-0 mb-4 mr-4 w-64">
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                                <img src="https://www.svgrepo.com/show/401340/cookie.svg" alt="Cookie" className="h-6 w-6 mr-2" />
                                <span className="text-gray-700 font-bold text-sm">Cookie Policy</span>
                            </div>
                            <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <p className="text-gray-600 text-sm">
                            We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of
                            cookies.
                            Some browsers may require you to enable cross-site tracking in order to use our site.
                        </p>
                        <button onClick={handleAccept} className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded">
                            Accept
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CookiePolicy;

