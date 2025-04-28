import React, { useState, useEffect } from 'react';
import { useAuth } from './auth/AuthContext';

const Contests = () => {
  const { user, isAuthenticated } = useAuth();
  const [contests, setContests] = useState([
    {
      difficulty: 'Medium',
      title: 'Weekly Contest 386',
      date: 'Thu, May 1, 04:00 PM',
      duration: '1.5 hours',
      participants: '3,850',
      startsIn: '3d 18h 38m',
    },
    {
      difficulty: 'Hard',
      title: 'Educational Round #827 (Div. 2)',
      date: 'Fri, May 2, 07:30 PM',
      duration: '2 hours',
      participants: '5,620',
      startsIn: '4d 22h 8m',
    },
    {
      difficulty: 'Medium',
      title: 'Educational Round #172',
      date: 'Wed, Apr 30, 06:00 PM',
      duration: '2 hours',
      participants: '4,500',
      startsIn: '2d 20h 38m',
    },
    {
      difficulty: 'Hard',
      title: 'Global Code Jam',
      date: 'Thu, May 1, 10:00 AM',
      duration: '4 hours',
      participants: '8,800',
      startsIn: '3d 12h 38m',
    },
    {
      difficulty: 'Easy',
      title: "Beginner's Bash",
      date: 'Fri, May 2, 09:00 AM',
      duration: '1 hour',
      participants: '1,300',
      startsIn: '4d 11h 38m',
    },
  ]);
  const [registeredContests, setRegisteredContests] = useState({});

  useEffect(() => {
    // Load registered contests from local storage on component mount
    if (isAuthenticated && user) {
      const storedRegistrations = localStorage.getItem(
        `registeredContests_${user.id}`
      );
      if (storedRegistrations) {
        setRegisteredContests(JSON.parse(storedRegistrations));
      }
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    // Save registered contests to local storage whenever it changes
    if (isAuthenticated && user) {
      localStorage.setItem(
        `registeredContests_${user.id}`,
        JSON.stringify(registeredContests)
      );
    }
  }, [registeredContests, isAuthenticated, user]);

  const handleRegister = (contestTitle) => {
    if (!isAuthenticated) {
      alert('Please log in to register for contests.');
      return;
    }

    setRegisteredContests((prev) => ({
      ...prev,
      [contestTitle]: !prev[contestTitle],
    }));
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Hard':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Coding Contests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contests.map((contest, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-white font-semibold text-sm px-3 py-1 rounded-full ${getDifficultyColor(
                      contest.difficulty
                    )}`}
                  >
                    {contest.difficulty}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {contest.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  Date: {contest.date}
                  <br />
                  Duration: {contest.duration}
                  <br />
                  Participants: {contest.participants}
                </p>
                <p className="text-blue-500 text-sm mt-2">
                  Starts In: {contest.startsIn}
                </p>
              </div>
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <button
                  onClick={() => handleRegister(contest.title)}
                  className={`w-full ${
                    isAuthenticated
                      ? registeredContests[contest.title]
                        ? 'bg-red-500 hover:bg-red-700 text-white'
                        : 'bg-blue-500 hover:bg-blue-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                  type="button"
                  disabled={!isAuthenticated}
                >
                  {isAuthenticated
                    ? registeredContests[contest.title]
                      ? 'Unregister'
                      : 'Register'
                    : 'Register'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contests;
