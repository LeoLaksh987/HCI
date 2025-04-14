import { useState } from "react";

const Blog = () => {
  const [expandedPost, setExpandedPost] = useState(null);

  const posts = [
    {
      id: 1,
      title: "Understanding Dynamic Programming",
      description: "A deep dive into solving problems efficiently using Dynamic Programming.",
      content: `
      🚀 **What is Dynamic Programming?**  
      Dynamic Programming (DP) is a method for solving complex problems by breaking them down into smaller subproblems.

      📌 **Key Concepts:**  
      - **Overlapping Subproblems** - Reuse solutions to save computation.  
      - **Optimal Substructure** - Build optimal solutions from smaller ones.  
      - **Approaches:** Memoization (Top-Down) 🆚 Tabulation (Bottom-Up).  

      🏆 **Common DP Problems:**  
      ✅ **Fibonacci Sequence** - Recursive vs. Iterative.  
      ✅ **0/1 Knapsack** - Choosing items optimally.  
      ✅ **Longest Common Subsequence** - Text similarity.  
      ✅ **Coin Change Problem** - Ways to make change.  
      ✅ **Matrix Chain Multiplication** - Parenthesization.  
      
      **Master DP** to excel in coding competitions like Google Kickstart, Codeforces, and ACM-ICPC! 🎯`,
      date: "March 30, 2025",
    },
    {
      id: 2,
      title: "Graph Algorithms for Competitive Programming",
      description: "Learn about Dijkstra, BFS, and DFS and their applications in contests.",
      content: `
      🕸️ **Understanding Graphs**  
      Graphs are networks of nodes & edges used in real-world scenarios like **Google Maps, social networks, and AI**.

      🔍 **Key Graph Algorithms:**  
      1️⃣ **Breadth-First Search (BFS)** - Shortest path in unweighted graphs.  
      2️⃣ **Depth-First Search (DFS)** - Cycle detection, topological sorting.  
      3️⃣ **Dijkstra’s Algorithm** - Efficient shortest path in weighted graphs.  
      4️⃣ **Floyd-Warshall Algorithm** - Computes shortest paths between **all pairs**.  
      5️⃣ **Bellman-Ford Algorithm** - Works even with **negative weights**.

      📌 **Why Learn Graphs?**  
      Graph-based questions appear in **ICPC, Codeforces, and Google Code Jam** frequently!`,
      date: "March 25, 2025",
    },
    {
      id: 3,
      title: "Mastering Number Theory for CP",
      description: "Prime numbers, modular arithmetic, and number properties explained.",
      content: `
      🔢 **Why Learn Number Theory?**  
      Essential for **cryptography, hashing, modular arithmetic**, and **prime factorization**.

      🔍 **Key Topics:**  
      🔹 **Prime Numbers & Sieve of Eratosthenes** - Efficient prime detection.  
      🔹 **GCD & LCM (Greatest Common Divisor)** - Fast computation using **Euclidean Algorithm**.  
      🔹 **Modular Arithmetic** - Used in cryptography & hashing.  
      🔹 **Chinese Remainder Theorem (CRT)** - Solves modular congruences.  

      **Number Theory** is used in Codeforces **Div 1/2**, AtCoder, and Google Code Jam! 🚀`,
      date: "March 20, 2025",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">Blog</h1>
      <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-8">
        Explore in-depth articles on Competitive Programming, Algorithms, and more.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
            <p className="text-gray-500 mt-2">{post.date}</p>

            {/* Content Container */}
            <div
              className={`mt-2 transition-all duration-500 ${
                expandedPost === post.id ? "border-l-4 border-indigo-600 pl-4 bg-gray-100 p-3 rounded-lg shadow-sm" : ""
              }`}
            >
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {expandedPost === post.id ? post.content : post.description}
              </p>
            </div>

            {/* Read More / Read Less Button */}
            <button
              className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-full"
              onClick={() =>
                setExpandedPost(expandedPost === post.id ? null : post.id)
              }
            >
              {expandedPost === post.id ? "Read Less ▲" : "Read More ▼"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
