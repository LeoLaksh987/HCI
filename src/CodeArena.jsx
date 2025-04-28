import React, { useState, useEffect } from 'react';



// AccessibilityWidget Component



// Main CodeArena Component
const CodeArena = () => {
  const coreFeatures = [
    {
      title: "Battle in Contests",
      items: [
        "3-5 timed competitions weekly",
        "Divisions for all skill levels",
        "International programming rules",
        "Detailed post-contest analytics"
      ]
    },
    {
      title: "Solve & Learn",
      items: [
        "3,200+ problems archive",
        "Tags: Dynamic Programming • Graph Theory • Geometry • Strings",
        "Difficulty spectrum: Newbie → Legendary",
        "Editorials & test case explanations"
      ]
    },
    {
      title: "Community Hub",
      items: [
        "Weekly strategy blogs by top coders",
        "Solution discussion forums",
        "Customizable practice lists",
        "User-created problem proposals"
      ]
    }
  ];

  const platformStats = [
    { value: "92%", label: "Contest Start Punctuality" },
    { value: "15ms", label: "Code Execution Judge" },
    { value: "40+", label: "Supported Languages" },
    { value: "24/7", label: "Submission Handling" }
  ];

  const footerLinks = [
    {
      title: "About",
      links: [
        { text: "About Us", href: "#" },
        { text: "Contact", href: "#" },
        { text: "Documentation", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { text: "Terms of Service", href: "#" },
        { text: "Privacy Policy", href: "#" }
      ]
    },
    {
      title: "Community",
      links: [
        { text: "Blog", href: "#" },
        { text: "Twitter", href: "#" },
        { text: "Discord Server", href: "#" }
      ]
    }
  ];

  return (
    <div className="bg-gray-50 min-w-screen">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-emerald-600 mb-2">CodeArena</h1>
          <p className="text-xl text-gray-600">Become an Algorithm Champion</p>
        </header>

        {/* Featured Contest */}
        <section className="bg-white rounded-lg shadow-lg p-6 mb-8" aria-labelledby="featured-contest">
          <h2 id="featured-contest" className="text-2xl font-bold text-emerald-600 mb-4">
            Featured Contest
          </h2>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Weekly Coding Sprint #108</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center">
                <span className="mr-2">📅</span>
                <span>Starts: Friday, November 17 • 19:00 UTC</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">⏳</span>
                <span>Duration: 2.5 hours</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✨</span>
                <span>Prizes: Top 50 rated, Special badges</span>
              </div>
            </div>
            <button 
              className="mt-4 text-emerald-600 text-black font-semibold border-2 px-6 py-2 rounded-lg hover:bg-emerald-600 hover:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
              aria-label="bg for Weekly Coding Sprint"
            >
              Register Now
            </button>
          </div>
        </section>

        {/* Core Features */}
        <section className="grid md:grid-cols-3 gap-6 mb-8" aria-label="Core Platform Features">
          {coreFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-emerald-600 mb-4">{feature.title}</h2>
              <ul className="space-y-2">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Current Activities */}
        <section className="bg-white rounded-lg shadow-lg p-6 mb-8" aria-labelledby="current-activities">
          <h2 id="current-activities" className="text-2xl font-bold text-emerald-600 mb-4">
            Current Activities
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">🚀 New This Week</h3>
              <ul className="list-disc pl-6">
                <li>18 fresh problems added (Div 2-4)</li>
                <li>"Greedy Algorithms" video tutorial series</li>
                <li>System design contest announcement</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">🔥 Trending Discussion</h3>
              <p>"Are Segment Trees Overrated?"</p>
              <p className="text-sm text-gray-600">153 comments • 890 views • 2 days old</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">📌 Important Notice</h3>
              <p>Server maintenance: November 20, 02:00-04:00 UTC</p>
            </div>
          </div>
        </section>

        {/* Platform Stats */}
        <section className="bg-white rounded-lg shadow-lg p-6 mb-8" aria-labelledby="platform-stats">
          <h2 id="platform-stats" className="text-2xl font-bold text-emerald-600 mb-4">
            Why Coders Choose Us?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {platformStats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-bold">{stat.value}</p>
                <p className="text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t pt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-2">{section.title}</h3>
                <ul className="space-y-1">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.href} className="text-blue-600 hover:underline">
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-600">
            <p>© 2018-2023 CodeArena • Hosted in 12 global regions</p>
          </div>
        </footer>

        {/* Accessibility Widget */}
        {/* <AccessibilityWidget /> */}
      </div>
    </div>
  );
};

export default CodeArena;