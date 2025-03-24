import React, { useState, useEffect } from 'react';

const FindTheFox = () => {
  const [gridSize, setGridSize] = useState(5);
  const [foxPosition, setFoxPosition] = useState<number | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hint, setHint] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  // Initialize the game
  const initializeGame = () => {
    let size = 5;
    if (difficulty === 'medium') size = 7;
    if (difficulty === 'hard') size = 9;
    
    setGridSize(size);
    const randomPosition = Math.floor(Math.random() * (size * size));
    setFoxPosition(randomPosition);
    setSelectedPosition(null);
    setAttempts(0);
    setGameOver(false);
    setHint('The fox is hiding somewhere in the forest. Can you find it?');
  };
  
  // Effect to initialize game
  useEffect(() => {
    initializeGame();
  }, [difficulty]);
  
  // Calculate distance between two positions
  const calculateDistance = (pos1: number, pos2: number) => {
    const row1 = Math.floor(pos1 / gridSize);
    const col1 = pos1 % gridSize;
    const row2 = Math.floor(pos2 / gridSize);
    const col2 = pos2 % gridSize;
    
    return Math.sqrt(Math.pow(row1 - row2, 2) + Math.pow(col1 - col2, 2));
  };
  
  // Handle cell click
  const handleCellClick = (index: number) => {
    if (gameOver || foxPosition === null) return;
    
    setSelectedPosition(index);
    setAttempts(attempts + 1);
    
    if (index === foxPosition) {
      // Found the fox!
      setGameOver(true);
      setHint('You found the fox! Great job!');
      
      // Calculate score based on attempts and difficulty
      const difficultyMultiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
      const newScore = Math.floor((100 * difficultyMultiplier) / attempts);
      setScore(newScore);
      
      if (newScore > highScore) {
        setHighScore(newScore);
      }
    } else {
      // Provide hint based on distance
      const distance = calculateDistance(index, foxPosition);
      
      if (distance < 1.5) {
        setHint('Very hot! The fox is very close!');
      } else if (distance < 2.5) {
        setHint('Hot! You\'re getting closer!');
      } else if (distance < 3.5) {
        setHint('Warm. Keep looking around this area.');
      } else if (distance < 4.5) {
        setHint('Cold. The fox is a bit far from here.');
      } else {
        setHint('Very cold. The fox is far away from here.');
      }
    }
  };
  
  // Render the game grid
  const renderGrid = () => {
    const cells = [];
    
    for (let i = 0; i < gridSize * gridSize; i++) {
      const isFox = i === foxPosition;
      const isSelected = i === selectedPosition;
      const foxFound = gameOver && isFox;
      
      cells.push(
        <div 
          key={i}
          className={`flex items-center justify-center w-12 h-12 border-2 border-green-800 bg-green-100 cursor-pointer hover:bg-green-200 transition-colors ${isSelected ? 'bg-yellow-200' : ''} ${foxFound ? 'bg-orange-300' : ''}`}
          onClick={() => handleCellClick(i)}
        >
          {foxFound && 
            <div className="text-2xl">
              🦊
            </div>
          }
          {isSelected && !foxFound && 
            <div className="text-2xl">
              ❌
            </div>
          }
        </div>
      );
    }
    
    return (
      <div 
        className="grid gap-1 bg-green-800 p-2 rounded-lg shadow-lg"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` 
        }}
      >
        {cells}
      </div>
    );
  };
  
  return (
    <div className="flex flex-col items-center p-4 max-w-lg mx-auto bg-green-50 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-green-800 mb-2">Find the Fox</h1>
      
      <div className="mb-4 flex space-x-4">
        <button 
          className={`px-3 py-1 rounded ${difficulty === 'easy' ? 'bg-green-600 text-white' : 'bg-green-200'}`}
          onClick={() => setDifficulty('easy')}
        >
          Easy (5×5)
        </button>
        <button 
          className={`px-3 py-1 rounded ${difficulty === 'medium' ? 'bg-green-600 text-white' : 'bg-green-200'}`}
          onClick={() => setDifficulty('medium')}
        >
          Medium (7×7)
        </button>
        <button 
          className={`px-3 py-1 rounded ${difficulty === 'hard' ? 'bg-green-600 text-white' : 'bg-green-200'}`}
          onClick={() => setDifficulty('hard')}
        >
          Hard (9×9)
        </button>
      </div>
      
      <div className="text-center mb-4 text-green-700 font-medium min-h-14 p-2 bg-green-100 rounded w-full">
        {hint}
      </div>
      
      {renderGrid()}
      
      <div className="mt-4 flex justify-between w-full text-green-800">
        <div>Attempts: {attempts}</div>
        <div>Score: {gameOver ? score : '?'}</div>
        <div>High Score: {highScore}</div>
      </div>
      
      {gameOver && (
        <button 
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          onClick={initializeGame}
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default FindTheFox;
