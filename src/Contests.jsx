import React, { useState } from 'react';
import { Clock, Calendar, Users, Award, Code, ChevronRight, Filter } from 'lucide-react';

const ContestsComponent = () => {
  const [filter, setFilter] = useState('all');
  
  // Sample contest data
  const contests = [
    {
      id: 1,
      title: "Weekly Contest 386",
      startTime: "2025-03-09T10:30:00Z",
      duration: "1.5 hours",
      difficulty: "Medium",
      participants: 3850,
      registrationOpen: true,
      type: "weekly"
    },
    {
      id: 2,
      title: "Educational Round #927 (Div. 2)",
      startTime: "2025-03-08T14:00:00Z",
      duration: "2 hours",
      difficulty: "Hard",
      participants: 5620,
      registrationOpen: true,
      type: "rated"
    },
    {
      id: 3,
      title: "March Long Challenge",
      startTime: "2025-03-12T09:00:00Z",
      duration: "10 days",
      difficulty: "Various",
      participants: 7200,
      registrationOpen: true,
      type: "long"
    },
    {
      id: 4,
      title: "Biweekly Contest 124",
      startTime: "2025-03-15T16:00:00Z",
      duration: "1.5 hours",
      difficulty: "Medium",
      participants: 2940,
      registrationOpen: false,
      type: "biweekly"
    },
    {
      id: 5,
      title: "Educational Round #172",
      startTime: "2025-03-11T12:30:00Z",
      duration: "2 hours",
      difficulty: "Medium",
      participants: 4500,
      registrationOpen: true,
      type: "educational"
    }
  ];

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate time remaining
  const getTimeRemaining = (dateString) => {
    const contestTime = new Date(dateString).getTime();
    const now = new Date().getTime();
    const diff = contestTime - now;
    
    if (diff <= 0) return "Started";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h ${minutes}m`;
  };

  // Filter contests
//   const filteredContests = filter === 'all' 
//     ? contests 
//     : contests.filter(contest => contest.platform.toLowerCase() === filter);

  // Get platform color
//   const getPlatformColor = (platform) => {
//     switch(platform.toLowerCase()) {
//       case 'leetcode': return 'bg-yellow-500';
//       case 'codeforces': return 'bg-red-500';
//       case 'codechef': return 'bg-green-500';
//       default: return 'bg-blue-500';
//     }
//   };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
          <Code className="mr-2" /> Upcoming Coding Contests
        </h2>
        
        {/* Filter controls */}
        
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {contests.length > 0 ? (
          contests.map(contest => (
            <div key={contest.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${contest.difficulty === 'Hard' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : contest.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>
                      {contest.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{contest.title}</h3>
                  
                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 dark:text-gray-300 space-y-1 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1 text-gray-400" />
                      {formatDate(contest.startTime)}
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1 text-gray-400" />
                      {contest.duration}
                    </div>
                    <div className="flex items-center">
                      <Users size={14} className="mr-1 text-gray-400" />
                      {contest.participants.toLocaleString()} participants
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <div className="text-sm font-medium">
                    <span className="text-gray-500 dark:text-gray-400">Starts in: </span>
                    <span className="text-blue-600 dark:text-blue-400">{getTimeRemaining(contest.startTime)}</span>
                  </div>
                  
                  <button className={`px-3 py-1 text-sm rounded flex items-center ${contest.registrationOpen ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}>
                    {contest.registrationOpen ? 'Register' : 'Coming Soon'}
                    <ChevronRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No contests found matching your filter.
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-750 rounded-b-lg">
        <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
          <Award size={16} className="mr-1 text-blue-500" />
          Showing {contests.length} upcoming contests
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer font-medium">
          View all contests
        </button>
      </div>
    </div>
  );
};

export default ContestsComponent;