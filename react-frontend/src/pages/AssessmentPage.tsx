import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, X, Star, Trophy } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import Card from '../components/Card';
import RippleButton from '../components/RippleButton';
import PageTransition from '../components/PageTransition';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the meaning of 'Serendipity'?",
      options: [
        "A planned discovery",
        "A pleasant accidental discovery",
        "A scientific method",
        "A type of poetry"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "Choose the correct grammar: 'She ___ to the store yesterday.'",
      options: [
        "go",
        "goes",
        "went",
        "going"
      ],
      correct: 2
    },
    {
      id: 3,
      question: "Which word is a synonym for 'Happy'?",
      options: [
        "Sad",
        "Angry",
        "Joyful",
        "Tired"
      ],
      correct: 2
    },
    {
      id: 4,
      question: "What type of sentence is: 'What a beautiful day!'?",
      options: [
        "Declarative",
        "Interrogative",
        "Imperative",
        "Exclamatory"
      ],
      correct: 3
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswered = [...answeredQuestions, selectedAnswer];
      setAnsweredQuestions(newAnswered);
      
      if (selectedAnswer === questions[currentQuestion].correct) {
        setScore(score + 1);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return { message: "Excellent! You're doing great!", icon: Trophy, color: "text-yellow-500" };
    if (percentage >= 60) return { message: "Good job! Keep practicing!", icon: Star, color: "text-blue-500" };
    return { message: "Keep learning! You'll improve!", icon: Check, color: "text-green-500" };
  };

  if (showResult) {
    const result = getScoreMessage();
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center px-4 py-8 relative">
          <AnimatedBackground />
          
          <div className="w-full max-w-2xl mx-auto z-10">
            <Card className="text-center p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                <result.icon className={`w-20 h-20 mx-auto ${result.color}`} />
              </motion.div>
              
              <motion.h2
                className="text-3xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Assessment Complete!
              </motion.h2>
              
              <motion.div
                className="text-6xl font-bold text-primary-500 mb-4"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                {score}/{questions.length}
              </motion.div>
              
              <motion.p
                className="text-xl text-gray-600 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {result.message}
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <RippleButton
                  onClick={() => {
                    setCurrentQuestion(0);
                    setScore(0);
                    setSelectedAnswer(null);
                    setShowResult(false);
                    setAnsweredQuestions([]);
                  }}
                  variant="secondary"
                >
                  Try Again
                </RippleButton>
                <RippleButton
                  onClick={() => navigate('/english')}
                >
                  Continue Learning
                </RippleButton>
              </motion.div>
            </Card>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-4 py-8 relative">
        <AnimatedBackground />
        
        <div className="w-full max-w-3xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate('/english')}
              className="flex items-center text-gray-600 hover:text-primary-500 transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Learning
            </button>
            
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Question {currentQuestion + 1} of {questions.length}
                </h1>
                <div className="text-lg text-gray-600">Score: {score}</div>
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-primary-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>

          <Card className="p-8 mb-8">
            <motion.h2
              className="text-2xl font-semibold text-gray-800 mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {questions[currentQuestion].question}
            </motion.h2>
            
            <div className="grid gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card
                    onClick={() => handleAnswerSelect(index)}
                    className={`p-4 cursor-pointer transition-all duration-200 ${
                      selectedAnswer === index
                        ? 'bg-primary-100 border-2 border-primary-400 shadow-lg'
                        : 'hover:bg-gray-50 border border-gray-200'
                    }`}
                    hover={false}
                  >
                    <div className="flex items-center">
                      <motion.div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${
                          selectedAnswer === index
                            ? 'border-primary-400 bg-primary-400'
                            : 'border-gray-300'
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {selectedAnswer === index && (
                          <motion.div
                            className="w-2 h-2 bg-white rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          />
                        )}
                      </motion.div>
                      <span className="text-lg text-gray-700">{option}</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <RippleButton
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={`px-12 ${selectedAnswer === null ? 'opacity-50 cursor-not-allowed' : ''}`}
              size="lg"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Assessment'}
            </RippleButton>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AssessmentPage;