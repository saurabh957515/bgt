import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import InquiryLogo from './Icons/InquiryLogo';

export const checkAuth = async () => {
    try {
        const response = await axios.get('api/check-auth', {
            withCredentials: true,
        });
        return response.status === 200;
    } catch (error) {
        return false;
    }
};
const ProtectedRoute = ({ element: Component }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const verifyAuth = async () => {
            const authenticated = await checkAuth();
            setIsAuthenticated(authenticated);
        };
        verifyAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                {/* <InquiryLogo /> */}
                <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
                <h2 className="text-2xl font-semibold text-gray-700">Loading...</h2>
                <p className="mt-2 text-gray-500">Please wait while we are loading your content.</p>
            </div>
        </div>;
    }

    return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
