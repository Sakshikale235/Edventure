import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Brain, Star, TrendingUp, Award } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import Card from '../components/Card';
import RippleButton from '../components/RippleButton';
import PageTransition from '../components/PageTransition';

const EnglishLearningPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const wordsOfTheDay = [
    { word: 'Serendipity', meaning: 'The occurrence of pleasant discoveries by accident' },
    { word: 'Ephemeral', meaning: 'Lasting for a very short time' },
    { word: 'Mellifluous', meaning: 'Sweet or musical; pleasant to hear' },
    { word: 'Ubiquitous', meaning: 'Present, appearing, or found everywhere' }
  ];

  const learningLevels = [
    {
      level: 'Basic',
      description: 'Build your foundation with essential grammar and vocabulary',
      icon: Star,
      color: 'from-green-400 to-green-600',
      lessons: '45 lessons'
    },
    {
      level: 'Intermediate',
      description: 'Advance your skills with complex sentence structures',
      icon: TrendingUp,
      color: 'from-yellow-400 to-yellow-600',
      lessons: '60 lessons'
    },
    {
      level: 'Advanced',
      description: 'Master advanced concepts and literary analysis',
      icon: Award,
      color: 'from-red-400 to-red-600',
      lessons: '75 lessons'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(prev => (prev + 1) % wordsOfTheDay.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen px-4 py-8 relative">
        <AnimatedBackground />
        
        <div className="max-w-6xl mx-auto z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate('/level')}
              className="flex items-center text-gray-600 hover:text-primary-500 transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Level Selection
            </button>
            
            <div className="text-center mb-12">
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                English Learning Hub
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Master the English language with interactive lessons and daily challenges
              </motion.p>
            </div>
          </motion.div>

          {/* Word of the Day Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
              <motion.h2
                className="text-2xl font-bold text-gray-800 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                📚 New Word a Day
              </motion.h2>
              
              <motion.div
                key={currentWordIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <motion.h3
                  className="text-4xl font-bold text-primary-600 mb-3"
                  style={{
                    fontFamily: 'serif'
                  }}
                >
                  {wordsOfTheDay[currentWordIndex].word}
                </motion.h3>
                <motion.p
                  className="text-lg text-gray-700 max-w-md mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {wordsOfTheDay[currentWordIndex].meaning}
                </motion.p>
              </motion.div>

              <motion.div
                className="animate-pulse-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RippleButton
                  onClick={() => navigate('/assessment')}
                  variant="secondary"
                  className="mb-4"
                >
                  🧠 Test Your Knowledge
                </RippleButton>
              </motion.div>
            </Card>
          </motion.div>

          {/* Learning Levels */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Choose Your Learning Path
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {learningLevels.map((level, index) => (
                <motion.div
                  key={level.level}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.2 }}
                >
                  <Card className="h-full text-center group" glow={true}>
                    <motion.div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${level.color} mb-4`}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 }
                      }}
                    >
                      <level.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Learn {level.level}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {level.description}
                    </p>
                    
                    <div className="text-sm text-primary-500 font-medium mb-6">
                      {level.lessons}
                    </div>
                    
                    <RippleButton
                      onClick={() => navigate('/english-module')}
                      className="w-full"
                      size="sm"
                    >
                      Start Learning
                    </RippleButton>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default EnglishLearningPage;