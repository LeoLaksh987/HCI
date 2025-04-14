const Tutorials = () => {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Tutorials</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn Competitive Programming and Problem-Solving from expert tutorials!
        </p>
  
        <div className="mt-8 space-y-8">
          {/* Dynamic Programming Video */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Dynamic Programming Basics
            </h2>
            <iframe
              className="w-full max-w-xl mx-auto"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/oN_Cnzl5W9c"
              title="Dynamic Programming Basics"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
  
          {/* Number Theory Video */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Number Theory for Competitive Programming
            </h2>
            <iframe
              className="w-full max-w-xl mx-auto"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/-BglZNHvQu8"
              title="Number Theory Basics"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    );
  };
  
  export default Tutorials;
  