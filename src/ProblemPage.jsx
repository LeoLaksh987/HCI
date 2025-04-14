import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Editor from "@monaco-editor/react";
import axios from "axios";

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
Output: [0,1]`
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
Output: [5,4,3,2,1]`
    },
    {
        id: 3,
        title: "Valid Parentheses",
        difficulty: "Easy",
        category: "Stack",
        acceptance: "40.1%",
        description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', 
determine if the input string is valid.

An input string is valid if:
1. Open brackets are closed by the same type of brackets.
2. Open brackets are closed in the correct order.

Example:
Input: s = "()[]{}"
Output: true

Input: s = "(]"
Output: false`
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
Explanation: The subarray [4,-1,2,1] has the largest sum = 6.`
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
Output: [1,3,2]`
    }
];


const languageOptions = [
    { id: 52, name: "C++" },
    { id: 62, name: "Java" },
    { id: 71, name: "Python" },
    { id: 63, name: "JavaScript" },
    { id: 60, name: "Go"}
];

const languageMap = {
    52: "cpp",
    62: "java",
    71: "python",
    63: "javascript",
    60: "golang"
};

const ProblemPage = () => {
    const { id } = useParams();
    const problem = problemsList.find(p => p.id === parseInt(id));
    const [code, setCode] = useState("// Write your code here");
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState(52); // Default to C++

    const runCode = async () => {
        setOutput("Running...");
        try {
            // Submit the code
            const submission = await axios.post(
                "https://judge0-ce.p.rapidapi.com/submissions",
                {
                    source_code: code,
                    language_id: language,
                    stdin: "",
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
    
            // Poll until the result is ready
            let result;
            for (let i = 0; i < 10; i++) {
                await new Promise(resolve => setTimeout(resolve, 1500)); // wait 1.5 sec
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
                if (statusId === 3 || statusId === 6 || statusId === 11) break; // 3 = Accepted, 6 = Compilation error, 11 = Runtime error
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
    

    if (!problem) return <div className="p-6 text-red-500 font-semibold">Problem not found</div>;

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {/* Left Side - Problem Description */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-3xl font-bold mb-2 text-emerald-600">{problem.title}</h2>
                    <p className="text-sm mb-1"><strong>Difficulty:</strong> <span className={`font-semibold ${problem.difficulty === "Easy" ? "text-green-500" : problem.difficulty === "Medium" ? "text-yellow-500" : "text-red-500"}`}>{problem.difficulty}</span></p>
                    <p className="text-sm mb-1"><strong>Category:</strong> {problem.category}</p>
                    <p className="text-sm mb-4"><strong>Acceptance:</strong> {problem.acceptance}</p>
                    <pre className="bg-gray-100 rounded p-4 whitespace-pre-wrap font-mono text-sm">{problem.description}</pre>
                </div>

                {/* Right Side - Code Editor */}
                <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium">Language:</label>
                        <select
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                            value={language}
                            onChange={(e) => {
                                const newLang = parseInt(e.target.value);
                                setLanguage(newLang);
                                setCode(""); 
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

                    <button
                        onClick={runCode}
                        className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow transition"
                    >
                        Run Code
                    </button>

                    <div className="mt-4">
                        <strong className="block text-gray-700 mb-1">Output:</strong>
                        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 whitespace-pre-wrap">{output}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemPage;
