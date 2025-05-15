export default function ExperimentPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Experiment Page</h1>
      <div className="p-6 border rounded-lg bg-gray-100">
        <p className="text-gray-600">Section one. </p>
        <div className="grid grid-cols-5 gap-4 mt-4">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="w-12 h-12 bg-blue-500 border-[3px] border-black"
            />
          ))}
        </div>
      </div>

      <div className="h-6"></div>

      <div className="p-6 border rounded-lg bg-gray-100">
        <p className="text-gray-600">Section two. </p>
        <svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="40,20 60,60 20,60" fill="#00FF00" stroke="black" stroke-width="3" />
          <polygon points="102,20 122,60 82,60" fill="#00FF00" stroke="black" stroke-width="3" />
          <polygon points="164,20 184,60 144,60" fill="#00FF00" stroke="black" stroke-width="3" />
        </svg>
      </div>

      <div className="h-6"></div>

      <div className="p-6 border rounded-lg bg-gray-100">
        <p className="text-gray-600">Section three. </p>
        <div className="flex justify-center mt-4">
          <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            {/* Cat body */}
            <circle cx="100" cy="100" r="40" fill="#87CEEB" stroke="#00008B" stroke-width="2" />
            
            {/* Ears */}
            <polygon points="70,70 80,40 90,70" fill="white" stroke="#00008B" stroke-width="2" />
            <polygon points="110,70 120,40 130,70" fill="white" stroke="#00008B" stroke-width="2" />
            
            {/* Eyes */}
            <circle cx="85" cy="90" r="5" fill="#00008B" />
            <circle cx="115" cy="90" r="5" fill="#00008B" />
            
            {/* Nose */}
            <polygon points="100,100 95,95 105,95" fill="#00008B" />
            
            {/* Whiskers */}
            <line x1="70" y1="100" x2="40" y2="95" stroke="#00008B" stroke-width="2" />
            <line x1="70" y1="105" x2="40" y2="105" stroke="#00008B" stroke-width="2" />
            <line x1="130" y1="100" x2="160" y2="95" stroke="#00008B" stroke-width="2" />
            <line x1="130" y1="105" x2="160" y2="105" stroke="#00008B" stroke-width="2" />
            
            {/* Dancing animation */}
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="10 100 100"
              dur="0.5s"
              repeatCount="indefinite"
              direction="alternate"
            />
          </svg>
        </div>
      </div>

    </div>
  );
}
