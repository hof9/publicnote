import React, { useState, useEffect } from 'react';
import { Info, Target, CheckCircle2, XCircle } from 'lucide-react';

interface NumberCell {
  value: number;
  state: 'default' | 'prime' | 'composite';
  isHighlighted: boolean;
  isCorrect?: boolean;
}

const PrimeCompositeLearner = () => {
  const [numbers, setNumbers] = useState<NumberCell[]>([]);
  const [explanation, setExplanation] = useState('Click "Start Tutorial" to begin learning about prime and composite numbers!');
  const [tutorialStep, setTutorialStep] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Prime number checking function
  const isPrime = (num: number) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  // Initialize numbers
  useEffect(() => {
    const initialNumbers = Array.from({ length: 100 }, (_, i) => ({
      value: i + 1,
      state: 'default' as const,
      isHighlighted: false
    }));
    setNumbers(initialNumbers);
  }, []);

  // Tutorial steps
  const tutorialSteps = [
    {
      text: "Prime numbers are numbers that have exactly two factors: 1 and themselves. Let's explore!",
      action: () => {}
    },
    {
      text: "Let's start by eliminating multiples of 2 (except 2 itself). These are composite numbers.",
      action: () => {
        const updatedNumbers = numbers.map(num => {
          if (num.value !== 2 && num.value % 2 === 0) {
            return { ...num, state: 'composite' as const, isHighlighted: true };
          }
          return num;
        });
        setNumbers(updatedNumbers);
      }
    },
    {
      text: "Now, let's look at multiples of 3 (except 3 itself). These are also composite numbers.",
      action: () => {
        const updatedNumbers = numbers.map(num => {
          if (num.value !== 3 && num.value % 3 === 0) {
            return { ...num, state: 'composite' as const, isHighlighted: true };
          }
          return num;
        });
        setNumbers(updatedNumbers);
      }
    }
  ];

  // Handle number cell click
  const handleNumberClick = (index: number) => {
    const newNumbers = [...numbers];
    const currentStates = ['default', 'prime', 'composite'] as const;
    const currentStateIndex = currentStates.indexOf(newNumbers[index].state);
    const nextStateIndex = (currentStateIndex + 1) % currentStates.length;
    
    newNumbers[index].state = currentStates[nextStateIndex];
    setNumbers(newNumbers);
  };

  // Verify answers
  const verifyAnswers = () => {
    const verifiedNumbers = numbers.map(num => {
      const correctState = isPrime(num.value) ? 'prime' : 
                           num.value === 1 ? 'default' : 'composite';
      
      return {
        ...num,
        isCorrect: num.state === correctState
      };
    });

    setNumbers(verifiedNumbers);

    const correctCount = verifiedNumbers.filter(n => n.isCorrect).length;
    const incorrectCount = 100 - correctCount;

    setExplanation(`Correct answers: ${correctCount}/100\nIncorrect answers: ${incorrectCount}/100`);
  };

  // Progress tutorial
  const progressTutorial = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      const nextStep = tutorialStep + 1;
      tutorialSteps[nextStep].action();
      setTutorialStep(nextStep);
      setExplanation(tutorialSteps[nextStep].text);
    } else {
      setShowModal(false);
    }
  };

  // Reset game
  const resetGame = () => {
    const initialNumbers = Array.from({ length: 100 }, (_, i) => ({
      value: i + 1,
      state: 'default' as const,
      isHighlighted: false
    }));
    setNumbers(initialNumbers);
    setExplanation('Click "Start Tutorial" to begin learning about prime and composite numbers!');
    setTutorialStep(0);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4 text-center dark:text-white">Prime & Composite Numbers Explorer</h1>
      
      {/* Instructions */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
        <h2 className="text-xl font-bold mb-2 dark:text-white">Instructions:</h2>
        <ol className="list-decimal pl-5 dark:text-gray-200">
          <li>Click or tap numbers to toggle between: Number (default) → Prime (Yellow) → Composite (Gray)</li>
          <li>Start by eliminating every second number after 2 (all multiples of 2)</li>
          <li>Then eliminate every third number after 3 (all multiples of 3)</li>
          <li>Then eliminate every fourth number after 4 (all multiples of 4)</li>
          <li>Then eliminate every fifth number after 5 (all multiples of 5)</li>
          <li>Then eliminate every sixth number after 6 (all multiples of 6)</li>
          <li>Then eliminate every third number after 7 (all multiples of 7)</li>
        </ol>
      </div>

      {/* Color Key */}
      <div className="flex justify-center mb-4 space-x-4">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-white dark:bg-gray-700 border dark:border-gray-600 mr-2"></div>
          <span className="dark:text-white">Default</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-yellow-300 dark:bg-yellow-500 mr-2"></div>
          <span className="dark:text-white">Prime</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 mr-2"></div>
          <span className="dark:text-white">Composite</span>
        </div>
      </div>

      {/* Number Grid */}
      <div className="grid grid-cols-10 gap-2">
        {numbers.map((num, index) => (
          <div 
            key={num.value}
            onClick={() => handleNumberClick(index)}
            className={`
              number-cell 
              border 
              p-2 
              text-center 
              cursor-pointer 
              transition-all 
              dark:text-white
              ${num.state === 'prime' ? 'bg-yellow-300 dark:bg-yellow-500' : 
                num.state === 'composite' ? 'bg-gray-300 dark:bg-gray-600' : 
                'bg-white dark:bg-gray-700'}
              ${num.isHighlighted ? 'border-2 border-blue-500 dark:border-blue-400' : 
                'border-gray-300 dark:border-gray-600'}
              ${num.isCorrect === false ? 'border-2 border-red-500 dark:border-red-400' : 
                num.isCorrect === true ? 'border-2 border-green-500 dark:border-green-400' : ''}
            `}
          >
            {num.value}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-4">
        <button 
          onClick={verifyAnswers}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 flex items-center"
        >
          <CheckCircle2 className="mr-2" /> Verify Answers
        </button>
        <button 
          onClick={resetGame}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 flex items-center"
        >
          <XCircle className="mr-2" /> Reset
        </button>
      </div>

      {/* Tutorial and Explanation Area */}
      <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mt-4 flex items-center">
        <Info className="mr-3 text-blue-500 dark:text-blue-400" />
        <p className="text-lg flex-grow dark:text-white">{explanation}</p>
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Start Tutorial
        </button>
      </div>

      {/* Tutorial Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Prime Numbers Tutorial</h2>
            <p className="mb-4 dark:text-gray-200">{tutorialSteps[tutorialStep].text}</p>
            <div className="flex justify-between">
              <button 
                onClick={() => setShowModal(false)}
                className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Close
              </button>
              <button 
                onClick={progressTutorial}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {tutorialStep < tutorialSteps.length - 1 ? 'Next Step' : 'Finish'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrimeCompositeLearner;
