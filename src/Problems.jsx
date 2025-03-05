import React from 'react';
import { Link } from 'react-router-dom';

const Problems = () => {
    const problemsList = [
        {
            id: 1,
            title: "Two Sum",
            difficulty: "Easy",
            category: "Array",
            acceptance: "52.3%"
        },
        {
            id: 2,
            title: "Reverse Linked List",
            difficulty: "Medium",
            category: "Linked List",
            acceptance: "67.5%"
        },
        {
            id: 3,
            title: "Valid Parentheses",
            difficulty: "Easy",
            category: "Stack",
            acceptance: "40.1%"
        },
        {
            id: 4,
            title: "Maximum Subarray",
            difficulty: "Medium",
            category: "Dynamic Programming",
            acceptance: "58.9%"
        },
        {
            id: 5,
            title: "Binary Tree Inorder Traversal",
            difficulty: "Medium",
            category: "Tree",
            acceptance: "71.2%"
        }
    ];

    const getDifficultyColor = (difficulty) => {
        switch(difficulty) {
            case "Easy": return "text-green-600";
            case "Medium": return "text-yellow-600";
            case "Hard": return "text-red-600";
            default: return "text-gray-600";
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Problem Statements</h1>
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
                            <tr key={problem.id} className="border-b hover:bg-gray-50 transition-colors">
                                <td className="p-4">{problem.id}</td>
                                <td className="p-4 font-medium">{problem.title}</td>
                                <td className={`p-4 font-semibold ${getDifficultyColor(problem.difficulty)}`}>
                                    {problem.difficulty}
                                </td>
                                <td className="p-4">{problem.category}</td>
                                <td className="p-4">{problem.acceptance}</td>
                                <td className="p-4">
                                    <Link 
                                        to={`/problem/${problem.id}`} 
                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                        Solve
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Problems;