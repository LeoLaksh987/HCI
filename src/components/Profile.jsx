import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import ActivityCalendar from "react-activity-calendar";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const [activityData, setActivityData] = useState([]);
  const [stats, setStats] = useState({
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    streak: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserData().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      const solvedProblems = JSON.parse(localStorage.getItem(`solvedProblems_${user.id}`) || '{}');
      const solvedProblemIds = JSON.parse(localStorage.getItem(`solvedProblemIds_${user.id}`) || '[]');
      const activities = JSON.parse(localStorage.getItem(`activity_${user.id}`) || '[]');
 
      const calendarData = generateCalendarData(solvedProblems);
      setActivityData(calendarData);
      calculateStats(solvedProblems, solvedProblemIds);
      setRecentActivity(activities.slice(0, 5));
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

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

  const generateCalendarData = (solvedProblems) => {
    const calendarData = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = solvedProblems[dateStr] || 0;
      
      let level = 0;
      if (count > 0) level = 1; // Set level to 1 for any successful submission

      calendarData.push({
        date: dateStr,
        count,
        level,
      });
    }
    
    return calendarData;
  };

 const calculateStats = (solvedProblems, solvedProblemIds) => {
  const totalSolved = solvedProblemIds.length;

  let easySolved = 0;
  let mediumSolved = 0;
  let hardSolved = 0;

  solvedProblemIds.forEach(problemId => {
    const problem = problemsList.find(p => p.id === problemId);
    if (problem) {
      if (problem.difficulty === "Easy") {
        easySolved++;
      } else if (problem.difficulty === "Medium") {
        mediumSolved++;
      } else if (problem.difficulty === "Hard") {
        hardSolved++;
      }
    }
  });

  const streak = calculateStreak(solvedProblems);

  setStats({
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    streak,
  });
};


  const calculateStreak = (solvedProblems) => {
    let streak = 0;
    const today = new Date();
    
    const todayStr = today.toISOString().split('T')[0];
    const hasTodaySolved = solvedProblems[todayStr] && solvedProblems[todayStr] > 0;
    
    let currentStreak = hasTodaySolved ? 1 : 0;
    let dayOffset = hasTodaySolved ? 1 : 0;
    
    while (true) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - dayOffset);
      const checkDateStr = checkDate.toISOString().split('T')[0];
      
      if (solvedProblems[checkDateStr] && solvedProblems[checkDateStr] > 0) {
        currentStreak++;
        dayOffset++;
      } else {
        break;
      }
    }
    
    return currentStreak;
  };

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <p className="text-gray-600 mb-6">Please log in to view your profile and coding activity.</p>
          <Link to="/login" className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">👤 {user.username}'s Profile</h1>
            <p className="text-gray-600">Member since April 2025</p>
          </div>
          {/* <div className="mt-4 md:mt-0">
            <button className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition">
              Edit Profile
            </button>
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
            <h3 className="text-lg font-semibold text-emerald-800">Total Solved</h3>
            <p className="text-3xl font-bold text-emerald-600">{stats.totalSolved}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-lg font-semibold text-green-800">Easy</h3>
            <p className="text-3xl font-bold text-green-600">{stats.easySolved}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <h3 className="text-lg font-semibold text-yellow-800">Medium</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.mediumSolved}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <h3 className="text-lg font-semibold text-red-800">Hard</h3>
            <p className="text-3xl font-bold text-red-600">{stats.hardSolved}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <h2 className="text-xl font-bold">Current Streak</h2>
            <span className="ml-2 bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">
              🔥 {stats.streak} days
            </span>
          </div>
          <p className="text-gray-600">Keep solving problems daily to maintain your streak!</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Coding Activity</h2>
        <div className="mb-2 text-gray-600 text-sm">
          Problems solved per day over the past year
        </div>

        <div className="overflow-x-auto pb-4">
          {loading ? (
            <p>Loading activity data...</p>
          ) : activityData.length > 0 ? (
            <ActivityCalendar
              data={activityData}
              blockSize={12}
              blockMargin={4}
              fontSize={14}
              hideMonthLabels={false}
              hideColorLegend={false}
              theme={{
                light: ['#ebedf0', '#000000'], // Light grey for level 0, green for level 1
              }}
              tooltipRenderer={({ date, count }) => (
                `${count} problems solved on ${new Date(date).toLocaleDateString()}`
              )}
            />
          ) : (
            <p>No activity data available.</p>
          )}
        </div>

        {!loading && activityData.length > 0 && (
          <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
            <div>Less</div>
            <div className="flex gap-1">
              {[0, 1].map((level) => (
                <div
                  key={level}
                  className="w-3 h-3 rounded-sm"
                  style={{
                    backgroundColor: ['#ebedf0', '#000000'][level],
                  }}
                ></div>
              ))}
            </div>
            <div>More</div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        {recentActivity.length > 0 ? (
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">
                      Solved "{activity.problemTitle}" problem 
                      {activity.language && <span className="text-gray-500"> using {activity.language}</span>}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activity.difficulty === "Easy" 
                      ? "bg-green-100 text-green-800" 
                      : activity.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {activity.difficulty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500">No recent activity found.</p>
            <Link to="/problems" className="text-emerald-500 hover:text-emerald-600 mt-2 inline-block">
              Start solving problems now!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;