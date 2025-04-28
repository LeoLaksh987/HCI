import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import AuthModal from "./auth/AuthModal";

const Problems = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const { user, isAuthenticated, setPendingChallenge } = useAuth();
  const navigate = useNavigate();

  const problemsList = [
    { id: 1, title: "Two Sum", difficulty: "Easy", category: "Array", acceptance: "52.3%" },
    { id: 2, title: "Reverse Linked List", difficulty: "Medium", category: "Linked List", acceptance: "67.5%" },
    { id: 3, title: "Valid Parentheses", difficulty: "Easy", category: "Stack", acceptance: "40.1%" },
    { id: 4, title: "Maximum Subarray", difficulty: "Medium", category: "Dynamic Programming", acceptance: "58.9%" },
    { id: 5, title: "Binary Tree Inorder Traversal", difficulty: "Medium", category: "Tree", acceptance: "71.2%" },
  ];

  const handleSolveClick = (e, problemId) => {
    e.preventDefault();
    console.log("Solve clicked for problem:", problemId);
    console.log("User authenticated:", isAuthenticated);
    
    if (!isAuthenticated) {
      console.log("Setting pending challenge:", problemId);
      setPendingChallenge(problemId);
      setAuthTab("login");
      setShowAuthModal(true);
    } else {
      console.log("Navigating to problem page:", problemId);
      navigate(`/problem/${problemId}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Problem Statements</h1>

      {!isAuthenticated && (
        <div className="mb-4 text-sm text-gray-700">
          Please{" "}
          <button
            onClick={() => {
              setAuthTab("login");
              setShowAuthModal(true);
            }}
            className="text-blue-600 hover:underline"
          >
            login
          </button>{" "}
          or{" "}
          <button
            onClick={() => {
              setAuthTab("register");
              setShowAuthModal(true);
            }}
            className="text-blue-600 hover:underline"
          >
            register
          </button>{" "}
          to solve problems.
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Difficulty</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Acceptance</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {problemsList.map((problem) => (
              <tr key={problem.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{problem.id}</td>
                <td className="p-4 font-medium">{problem.title}</td>
                <td className="p-4">{problem.difficulty}</td>
                <td className="p-4">{problem.category}</td>
                <td className="p-4">{problem.acceptance}</td>
                <td className="p-4">
                  <button
                    onClick={(e) => handleSolveClick(e, problem.id)}
                    className="text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-1.5 rounded-md transition"
                  >
                    Solve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialTab={authTab}
      />
    </div>
  );
};

export default Problems;