import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Trophy, Star, Volume2, Mic } from 'lucide-react';
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";


// Remove saveResults from here and move it inside App component below


interface GameScore {
  correct: number;
  total: number;
  timeBonus: number;
}

function App() {
  const [currentGame, setCurrentGame] = useState(0);
  const [scores, setScores] = useState<GameScore[]>([
    { correct: 0, total: 0, timeBonus: 0 },
    { correct: 0, total: 0, timeBonus: 0 },
    { correct: 0, total: 0, timeBonus: 0 },
    { correct: 0, total: 0, timeBonus: 0 }
  ]);

  const games = [
    { title: 'Noun Hunt', icon: '🔍' },
    { title: 'Drag & Drop Sorting', icon: '🎯' },
    { title: 'Crossword', icon: '🧩' },
    { title: 'Voice Challenge', icon: '🎤' }
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const saveResults = async () => {
    try {
      const docRef = await addDoc(collection(db, "assessments"), {
        scores: scores,
        totalScore: totalScore,
        timestamp: new Date(),
      });
      console.log("Results saved with ID:", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const prevGame = () => {
    if (currentGame > 0) {
      setCurrentGame(currentGame - 1);
    }
  };

  const updateScore = (gameIndex: number, correct: number, total: number, timeBonus: number = 0) => {
    const newScores = [...scores];
    newScores[gameIndex] = { correct, total, timeBonus };
    setScores(newScores);
  };

  const totalScore = scores.reduce((sum, score) => sum + score.correct + score.timeBonus, 0);

  function nextGame(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-indigo-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-indigo-800 flex items-center gap-3">
              <Star className="text-yellow-500" />
              Noun Master Games
            </h1>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                <Trophy size={20} />
                Score: {totalScore}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm text-gray-600">{currentGame + 1} / {games.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentGame + 1) / games.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Container */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-indigo-100 overflow-hidden">
          {/* Game Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <span className="text-3xl">{games[currentGame].icon}</span>
              {games[currentGame].title}
            </h2>
          </div>

          {/* Game Content - Fixed Height Container */}
          <div className="h-[600px] p-6">
            {currentGame === 0 && <NounHuntGame onScore={(correct, total, timeBonus) => updateScore(0, correct, total, timeBonus)} />}
            {currentGame === 1 && <DragDropGame onScore={(correct, total, timeBonus) => updateScore(1, correct, total, timeBonus)} />}
            {currentGame === 2 && <CrosswordGame onScore={(correct, total, timeBonus) => updateScore(2, correct, total, timeBonus)} />}
            {currentGame === 3 && <VoiceGame onScore={(correct, total, timeBonus) => updateScore(3, correct, total, timeBonus)} />}
          </div>

          {/* Navigation */}
          <div className="bg-gray-50 p-6 flex justify-between items-center border-t-2 border-gray-100">
            <button
              onClick={prevGame}
              disabled={currentGame === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                currentGame === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            <div className="flex gap-2">
              {games.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentGame ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextGame}
              disabled={currentGame === games.length - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                currentGame === games.length - 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              Next
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Noun Hunt Game Component
function NounHuntGame({ onScore }: { onScore: (correct: number, total: number, timeBonus: number) => void }) {
  const passage = "The brave dog chased a red ball in the beautiful park while children played on the swings.";
  const words = passage.split(' ');
  const nouns = ['dog', 'ball', 'park', 'children', 'swings'];
  
  const [clickedWords, setClickedWords] = useState<string[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [startTime] = useState(Date.now());

  const handleWordClick = (word: string, index: number) => {
    if (gameComplete) return;
    
    const cleanWord = word.replace(/[.,]/g, '').toLowerCase();
    const wordKey = `${cleanWord}-${index}`;
    
    if (clickedWords.includes(wordKey)) return;
    
    setClickedWords([...clickedWords, wordKey]);
    
    const correctClicks = [...clickedWords, wordKey].filter(clickedWord => {
      const cleanClickedWord = clickedWord.split('-')[0];
      return nouns.includes(cleanClickedWord);
    });
    
    if (correctClicks.length === nouns.length) {
      const timeBonus = Math.max(0, 100 - Math.floor((Date.now() - startTime) / 1000));
      onScore(nouns.length, clickedWords.length + 1, timeBonus);
      setGameComplete(true);
    }
  };

  const getWordStatus = (word: string, index: number) => {
    const cleanWord = word.replace(/[.,]/g, '').toLowerCase();
    const wordKey = `${cleanWord}-${index}`;
    
    if (!clickedWords.includes(wordKey)) return '';
    
    return nouns.includes(cleanWord) ? 'correct' : 'incorrect';
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-blue-50 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold text-blue-800 mb-4">🎯 Click on all the nouns in the passage!</h3>
        <div className="text-lg leading-relaxed">
          {words.map((word, index) => {
            const status = getWordStatus(word, index);
            return (
              <span
                key={`${word}-${index}`}
                onClick={() => handleWordClick(word, index)}
                className={`cursor-pointer px-1 py-0.5 rounded transition-all hover:bg-blue-100 ${
                  status === 'correct' ? 'bg-green-200 text-green-800' : 
                  status === 'incorrect' ? 'bg-red-200 text-red-800 line-through' : ''
                }`}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
      
      {gameComplete && (
        <div className="bg-green-100 border-2 border-green-300 p-6 rounded-2xl text-center">
          <h4 className="text-2xl font-bold text-green-800 mb-2">🎉 Great job!</h4>
          <p className="text-green-700">You found all the nouns! Ready for the next challenge?</p>
        </div>
      )}
      
      <div className="mt-auto text-center text-gray-600">
        <p>Nouns found: {clickedWords.filter(clickedWord => nouns.includes(clickedWord.split('-')[0])).length} / {nouns.length}</p>
      </div>
    </div>
  );
}

// Drag & Drop Game Component
function DragDropGame({ onScore }: { onScore: (correct: number, total: number, timeBonus: number) => void }) {
  const words = [
    { word: 'London', type: 'proper' },
    { word: 'dog', type: 'common' },
    { word: 'happiness', type: 'abstract' },
    { word: 'family', type: 'collective' },
    { word: 'table', type: 'common' },
    { word: 'team', type: 'collective' },
    { word: 'love', type: 'abstract' },
    { word: 'Sarah', type: 'proper' }
  ];

  const buckets = [
    { type: 'proper', label: 'Proper Noun', icon: '🏙️', color: 'bg-red-100 border-red-300' },
    { type: 'common', label: 'Common Noun', icon: '🐕', color: 'bg-blue-100 border-blue-300' },
    { type: 'abstract', label: 'Abstract Noun', icon: '💭', color: 'bg-purple-100 border-purple-300' },
    { type: 'collective', label: 'Collective Noun', icon: '👨‍👩‍👧‍👦', color: 'bg-green-100 border-green-300' }
  ];

  const [placedWords, setPlacedWords] = useState<{[key: string]: string}>({});
  const [draggedWord, setDraggedWord] = useState<string | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [startTime] = useState(Date.now());

  const handleDragStart = (word: string) => {
    setDraggedWord(word);
  };

  const handleDrop = (bucketType: string) => {
    if (!draggedWord) return;
    
    const newPlacedWords = { ...placedWords, [draggedWord]: bucketType };
    setPlacedWords(newPlacedWords);
    setDraggedWord(null);

    if (Object.keys(newPlacedWords).length === words.length) {
      const correct = words.filter(word => newPlacedWords[word.word] === word.type).length;
      const timeBonus = Math.max(0, 100 - Math.floor((Date.now() - startTime) / 1000));
      onScore(correct, words.length, timeBonus);
      setGameComplete(true);
    }
  };

  const getWordColor = (word: string) => {
    if (!placedWords[word]) return 'bg-yellow-100 border-yellow-300';
    const correctType = words.find(w => w.word === word)?.type;
    return placedWords[word] === correctType ? 'bg-green-200 border-green-400' : 'bg-red-200 border-red-400';
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-indigo-800 mb-4">🎯 Drag each word to the correct noun type!</h3>
        
        {/* Words Pool */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-3">Words to Sort:</h4>
          <div className="flex flex-wrap gap-3">
            {words.map(({ word }) => (
              <div
                key={word}
                draggable
                onDragStart={() => handleDragStart(word)}
                className={`px-4 py-2 border-2 rounded-lg cursor-move font-semibold transition-all hover:shadow-md ${getWordColor(word)}`}
              >
                {word}
              </div>
            ))}
          </div>
        </div>

        {/* Buckets */}
        <div className="grid grid-cols-2 gap-4">
          {buckets.map(bucket => (
            <div
              key={bucket.type}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(bucket.type)}
              className={`p-4 border-2 border-dashed rounded-xl min-h-[120px] ${bucket.color}`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{bucket.icon}</div>
                <h4 className="font-bold text-gray-800">{bucket.label}</h4>
                <div className="mt-2 min-h-[40px] flex flex-wrap gap-1">
                  {Object.entries(placedWords)
                    .filter(([, type]) => type === bucket.type)
                    .map(([word]) => (
                      <span key={word} className="text-xs bg-white px-2 py-1 rounded">
                        {word}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {gameComplete && (
        <div className="bg-green-100 border-2 border-green-300 p-4 rounded-2xl text-center">
          <h4 className="text-xl font-bold text-green-800 mb-2">🎉 Sorting complete!</h4>
          <p className="text-green-700">
            Score: {words.filter(word => placedWords[word.word] === word.type).length} / {words.length}
          </p>
        </div>
      )}
    </div>
  );
}

// Crossword Game Component
function CrosswordGame({ onScore }: { onScore: (correct: number, total: number, timeBonus: number) => void }) {
  const clues = [
    { number: 1, clue: "A place where children study", answer: "SCHOOL", row: 0, col: 0, direction: 'across' },
    { number: 2, clue: "A four-legged animal that barks", answer: "DOG", row: 2, col: 1, direction: 'across' },
    { number: 3, clue: "Something you read", answer: "BOOK", row: 4, col: 0, direction: 'across' },
    { number: 4, clue: "Used to write on paper", answer: "PEN", row: 1, col: 3, direction: 'down' },
  ];

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [gameComplete, setGameComplete] = useState(false);
  const [startTime] = useState(Date.now());

  // Create grid (8x8 for better layout)
  const gridSize = 8;
  const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
  
  // Mark active cells based on clues
  clues.forEach((clue, clueIndex) => {
    for (let i = 0; i < clue.answer.length; i++) {
      if (clue.direction === 'across') {
        if (clue.row < gridSize && clue.col + i < gridSize) {
          grid[clue.row][clue.col + i] = {
            letter: clue.answer[i],
            clueIndex,
            position: i,
            number: i === 0 ? clue.number : null
          };
        }
      } else {
        if (clue.row + i < gridSize && clue.col < gridSize) {
          grid[clue.row + i][clue.col] = {
            letter: clue.answer[i],
            clueIndex,
            position: i,
            number: i === 0 ? clue.number : null
          };
        }
      }
    }
  });
  const handleInputChange = (clueIndex: number, value: string) => {
    const newAnswers = { ...answers, [clueIndex]: value.toUpperCase() };
    setAnswers(newAnswers);
    
    const correctAnswers = clues.filter((clue, index) => 
      newAnswers[index] === clue.answer
    ).length;
    
    if (correctAnswers === clues.length) {
      const timeBonus = Math.max(0, 100 - Math.floor((Date.now() - startTime) / 1000));
      onScore(correctAnswers, clues.length, timeBonus);
      setGameComplete(true);
    }
  };

  const getCellValue = (row: number, col: number) => {
    const cell = grid[row][col];
    if (!cell) return '';
    
    const answer = answers[cell.clueIndex] || '';
    return answer[cell.position] || '';
  };

  const isCellCorrect = (row: number, col: number) => {
    const cell = grid[row][col];
    if (!cell) return false;
    
    const answer = answers[cell.clueIndex] || '';
    return answer[cell.position] === cell.letter;
  };
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-xl font-bold text-indigo-800 mb-6">🧩 Solve the crossword puzzle with nouns!</h3>
      
      <div className="flex gap-4 flex-1">
        {/* Clues */}
        <div className="w-2/5">
          <h4 className="font-bold text-gray-700 mb-4">Clues:</h4>
          <div className="space-y-2">
            {clues.map((clue, index) => (
              <div key={index} className="bg-gray-50 p-2 rounded-lg">
                <div className="font-medium text-gray-800 mb-1 text-sm">
                  {clue.number}. {clue.direction === 'across' ? 'Across' : 'Down'}: {clue.clue}
                </div>
                <input
                  type="text"
                  value={answers[index] || ''}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  maxLength={clue.answer.length}
                  className={`w-full p-1 border-2 rounded font-mono text-center uppercase text-sm ${
                    answers[index] === clue.answer 
                      ? 'border-green-400 bg-green-50' 
                      : 'border-gray-300'
                  }`}
                  placeholder={`${clue.answer.length} letters`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Crossword Grid */}
        <div className="w-3/5 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl shadow-inner">
            <h4 className="font-bold text-center mb-4">Crossword Grid</h4>
            <div className="grid grid-cols-8 gap-0.5 bg-gray-300 p-2 rounded">
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`w-6 h-6 border border-gray-400 flex items-center justify-center text-xs font-bold relative ${
                      cell 
                        ? isCellCorrect(rowIndex, colIndex)
                          ? 'bg-green-100 text-green-800'
                          : getCellValue(rowIndex, colIndex)
                          ? 'bg-red-100 text-red-800'
                          : 'bg-white text-gray-800'
                        : 'bg-gray-800'
                    }`}
                  >
                    {cell && cell.number && (
                      <span className="absolute top-0 left-0 text-[8px] text-blue-600 font-bold leading-none">
                        {cell.number}
                      </span>
                    )}
                    {cell && (
                      <span className="text-center">
                        {getCellValue(rowIndex, colIndex)}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {gameComplete && (
        <div className="bg-green-100 border-2 border-green-300 p-3 rounded-2xl text-center mt-4">
          <h4 className="text-xl font-bold text-green-800 mb-2">🎉 Crossword solved!</h4>
          <p className="text-green-700">All clues answered correctly!</p>
        </div>
      )}
    </div>
  );
}

// Voice Game Component
function VoiceGame({ onScore }: { onScore: (correct: number, total: number, timeBonus: number) => void }) {
  const questions = [
    { question: "Name a noun that is a place", expectedAnswers: ["school", "park", "home", "store", "library", "hospital"] },
    { question: "Tell me a proper noun", expectedAnswers: ["john", "mary", "london", "america", "sarah", "david"] },
    { question: "What is the noun in: The cat slept?", expectedAnswers: ["cat"] },
    { question: "Name an abstract noun", expectedAnswers: ["love", "happiness", "anger", "joy", "fear", "hope"] }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [startTime] = useState(Date.now());

  const speakQuestion = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(questions[currentQuestion].question);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const answer = event.results[0][0].transcript.toLowerCase();
        setUserAnswer(answer);
        checkAnswer(answer);
      };
      
      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const checkAnswer = (answer: string) => {
    const currentQ = questions[currentQuestion];
    const isCorrect = currentQ.expectedAnswers.some(expected => 
      answer.includes(expected.toLowerCase())
    );
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer('');
      } else {
        const timeBonus = Math.max(0, 50 - Math.floor((Date.now() - startTime) / 1000));
        onScore(score + (isCorrect ? 1 : 0), questions.length, timeBonus);
        setGameComplete(true);
      }
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      {!gameComplete ? (
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-indigo-800">🎤 Voice Challenge</h3>
          
          <div className="bg-blue-50 p-6 rounded-2xl max-w-md">
            <h4 className="text-lg font-semibold mb-4">Question {currentQuestion + 1}:</h4>
            <p className="text-xl text-blue-800 mb-4">{questions[currentQuestion].question}</p>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={speakQuestion}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-semibold transition-all"
              >
                <Volume2 size={20} />
                Listen
              </button>
              
              <button
                onClick={startListening}
                disabled={isListening}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                <Mic size={20} />
                {isListening ? 'Listening...' : 'Answer'}
              </button>
            </div>
            
            {userAnswer && (
              <div className="mt-4 p-3 bg-white rounded-lg">
                <p className="text-gray-700">You said: "{userAnswer}"</p>
              </div>
            )}
          </div>
          
          <div className="text-gray-600">
            Score: {score} / {questions.length}
          </div>
        </div>
      ) : (
        <div className="bg-green-100 border-2 border-green-300 p-8 rounded-2xl">
          <h4 className="text-2xl font-bold text-green-800 mb-4">🎉 Voice challenge complete!</h4>
          <p className="text-green-700 text-lg">Final Score: {score} / {questions.length}</p>
          <p className="text-sm text-gray-600 mt-2">Great job using your voice to answer!</p>
        </div>
      )}
    </div>
  );
}

export default App;