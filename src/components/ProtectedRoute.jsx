import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, setPendingChallenge } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Store the path they were trying to access
    const path = location.pathname;
    const problemId = path.split('/problem/')[1];
    
    if (problemId) {
      setPendingChallenge(problemId);
    }
    
    return <Navigate to="/problems" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

// Update ProblemDetail page to use ProtectedRoute
// src/pages/ProblemDetail.jsx
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import ProtectedRoute from '../components/ProtectedRoute';

// const ProblemDetail = () => {
//   const { id } = useParams();
//   // Your problem detail component code

//   return (
//     <ProtectedRoute>
//       <div className="container mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6">Problem {id}</h1>
//         {/* Rest of your problem detail UI */}
//       </div>
//     </ProtectedRoute>
//   );
// };

// export default ProblemDetail;