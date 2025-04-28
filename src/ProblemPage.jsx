import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Editor from "@monaco-editor/react";
import axios from "axios";
import { useAuth } from "./auth/AuthContext";

// Problem List (hardcoded)
const problemsList = [
    {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        category: "Array",
        acceptance: "52.3%",
        description: `Given an array of integers nums and an integer target, 
return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, 
and you may not use the same element twice.

You can return the answer in any order.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]`,
        testInput: "2,7,11,15\n9", // Input format for Judge0 (e.g., comma-separated nums, then target on a new line)
        expectedOutput: "[0,1]",
    },
    {
        id: 2,
        title: "Reverse Linked List",
        difficulty: "Medium",
        category: "Linked List",
        acceptance: "67.5%",
        description: `Given the head of a singly linked list, reverse the list, 
and return the reversed list.

Example:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]`,
        testInput: "1,2,3,4,5", // Input format for a linked list
        expectedOutput: "[5,4,3,2,1]",
    },
    {
        id: 3,
        title: "Valid Parentheses",
        difficulty: "Easy",
        category: "Stack",
        acceptance: "40.1%",
        description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', 
determine if the input string is valid.

Example:
Input: s = "()[]{}"
Output: true

Input: s = "(]"
Output: false`,
        testInput: "()[]{}", // Input string
        expectedOutput: "true",
    },
    {
        id: 4,
        title: "Maximum Subarray",
        difficulty: "Medium",
        category: "Dynamic Programming",
        acceptance: "58.9%",
        description: `Given an integer array nums, find the subarray 
with the largest sum, and return its sum.

Example:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum = 6.`,
        testInput: "-2,1,-3,4,-1,2,1,-5,4", // Comma-separated array
        expectedOutput: "6",
    },
    {
        id: 5,
        title: "Binary Tree Inorder Traversal",
        difficulty: "Medium",
        category: "Tree",
        acceptance: "71.2%",
        description: `Given the root of a binary tree, return the inorder traversal of its nodes' values.

Example:
Input: root = [1,null,2,3]
Output: [1,3,2]`,
        testInput: "1,null,2,3", // Tree representation
        expectedOutput: "[1,3,2]",
    }
];

const languageOptions = [
    { id: 52, name: "C++" },
    { id: 62, name: "Java" },
    { id: 71, name: "Python" },
    { id: 63, name: "JavaScript" },
    { id: 60, name: "Go" }
];

const languageMap = {
    52: "cpp",
    62: "java",
    71: "python",
    63: "javascript",
    60: "golang"
};

// Default code templates for each language
const codeTemplates = {
    52: ``,
    62: ``,
    71: ``,
    63: ``,
    60: ``
};

const ProblemPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const problem = problemsList.find(p => p.id === parseInt(id));
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState(52);
    const [submissionResult, setSubmissionResult] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Set default code template when language changes or on mount
    React.useEffect(() => {
        setCode(codeTemplates[language] || "// Write your code here");
    }, [language]);

    const runCode = async () => {
        setOutput("Running...");
        try {
            const submission = await axios.post(
                "https://judge0-ce.p.rapidapi.com/submissions",
                {
                    source_code: code,
                    language_id: language,
                    stdin: problem.testInput, // Pass the test input
                },
                {
                    headers: {
                        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                        "X-RapidAPI-Key": "27c32bc61bmshf0c5d6bca4fd195p1f492djsnd864275c4fe8",
                        "Content-Type": "application/json",
                    }
                }
            );

            const token = submission.data.token;

            let result;
            for (let i = 0; i < 10; i++) {
                await new Promise(resolve => setTimeout(resolve, 1500));
                result = await axios.get(
                    `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`,
                    {
                        headers: {
                            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                            "X-RapidAPI-Key": "27c32bc61bmshf0c5d6bca4fd195p1f492djsnd864275c4fe8",
                        },
                    }
                );

                const statusId = result.data.status?.id;
                if (statusId === 3 || statusId === 6 || statusId === 11) break;
            }

            const res = result.data;
            if (res.status?.description !== "Accepted") {
                setOutput(res.status?.description + "\n" + (res.compile_output || res.stderr || "Unknown error"));
            } else {
                setOutput(res.stdout || "No output");
            }

        } catch (error) {
            console.error(error);
            setOutput("An error occurred while running your code.");
        }
    };

    const updateHeatMap = (problemId) => {
        try {
            if (!user || !user.id) {
                console.error("User not logged in");
                return;
            }

            const today = new Date().toISOString().split('T')[0];
            const solvedProblemsKey = `solvedProblems_${user.id}`;
            const solvedProblems = JSON.parse(localStorage.getItem(solvedProblemsKey) || '{}');
            solvedProblems[today] = (solvedProblems[today] || 0) + 1;
            const solvedProblemIdsKey = `solvedProblemIds_${user.id}`;
            const solvedProblemIds = JSON.parse(localStorage.getItem(solvedProblemIdsKey) || '[]');
            if (!solvedProblemIds.includes(problemId)) {
                solvedProblemIds.push(problemId);
                localStorage.setItem(solvedProblemIdsKey, JSON.stringify(solvedProblemIds));
            }
            localStorage.setItem(solvedProblemsKey, JSON.stringify(solvedProblems));
            const activityKey = `activity_${user.id}`;
            const activities = JSON.parse(localStorage.getItem(activityKey) || '[]');
            activities.unshift({
                date: today,
                problemId: problemId,
                problemTitle: problem.title,
                difficulty: problem.difficulty,
                language: languageOptions.find(l => l.id === language).name,
                timestamp: new Date().toISOString()
            });
            const trimmedActivities = activities.slice(0, 50);
            localStorage.setItem(activityKey, JSON.stringify(trimmedActivities));
            console.log(`Problem ${problemId} marked as solved for ${today}`);
        } catch (error) {
            console.error("Error updating heat map data:", error);
        }
    };

    const submitCode = async () => {
        if (!user) {
            setSubmissionResult("Please log in to submit solutions.");
            return;
        }
        
        if (!output) {
            setSubmissionResult("Please run your code first.");
            return;
        }
        
        setIsSubmitting(true);

        // Normalize output by removing extra spaces, newlines, and ensuring consistent format
        const cleanedOutput = output.trim().replace(/\s+/g, '');
        const cleanedExpected = problem.expectedOutput.trim().replace(/\s+/g, '');

        console.log("Cleaned Output:", cleanedOutput);
        console.log("Cleaned Expected:", cleanedExpected);

        if (cleanedOutput === cleanedExpected) {
            setSubmissionResult("✅ Submission Accepted!");
            updateHeatMap(problem.id);
        } else {
            setSubmissionResult("❌ Wrong Answer. Try Again.");
        }
        
        setIsSubmitting(false);
    };

    if (!problem) return <div className="p-6 text-red-500 font-semibold">Problem not found</div>;

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-3xl font-bold mb-2 text-emerald-600">{problem.title}</h2>
                    <p className="text-sm mb-1"><strong>Difficulty:</strong> <span className={`font-semibold ${problem.difficulty === "Easy" ? "text-green-500" : problem.difficulty === "Medium" ? "text-yellow-500" : "text-red-500"}`}>{problem.difficulty}</span></p>
                    <p className="text-sm mb-1"><strong>Category:</strong> {problem.category}</p>
                    <p className="text-sm mb-4"><strong>Acceptance:</strong> {problem.acceptance}</p>
                    <pre className="bg-gray-100 rounded p-4 whitespace-pre-wrap font-mono text-sm">{problem.description}</pre>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium">Language:</label>
                        <select
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                            value={language}
                            onChange={(e) => {
                                const newLang = parseInt(e.target.value);
                                setLanguage(newLang);
                            }}
                        >
                            {languageOptions.map(lang => (
                                <option key={lang.id} value={lang.id}>{lang.name}</option>
                            ))}
                        </select>
                    </div>

                    <Editor
                        height="400px"
                        language={languageMap[language]}
                        theme="vs-dark"
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        className="rounded"
                    />

                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={runCode}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow transition"
                            disabled={isSubmitting}
                        >
                            Run Code
                        </button>

                        <button
                            onClick={submitCode}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
                            disabled={isSubmitting || !user}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Code"}
                        </button>
                    </div>

                    <div className="mt-4">
                        <strong className="block text-gray-700 mb-1">Output:</strong>
                        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 whitespace-pre-wrap">{output}</pre>
                    </div>

                    {submissionResult && (
                        <div className={`mt-4 font-semibold ${submissionResult.includes("✅") ? "text-green-600" : "text-red-600"}`}>
                            {submissionResult}
                        </div>
                    )}
                    
                    {!user && (
                        <div className="mt-4 text-center p-2 bg-yellow-50 text-yellow-800 rounded-md">
                            Please log in to submit solutions and track your progress.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProblemPage;