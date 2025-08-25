import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, TrendingUp, Award } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import RippleButton from '../components/RippleButton';
import PageTransition from '../components/PageTransition';

const LevelSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  const levels = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Perfect for beginners or those who need to strengthen fundamentals',
      icon: Star,
      color: 'text-green-500',
      bgColor: 'bg-green-50 border-green-200',
      selectedBg: 'bg-green-100 border-green-400'
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      description: 'Ideal for students with some knowledge looking to advance',
      icon: TrendingUp,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 border-yellow-200',
      selectedBg: 'bg-yellow-100 border-yellow-400'
    },
    {
      id: 'advanced',
      name: 'Advanced',
      description: 'For students ready to tackle challenging concepts and excel',
      icon: Award,
      color: 'text-red-500',
      bgColor: 'bg-red-50 border-red-200',
      selectedBg: 'bg-red-100 border-red-400'
    }
  ];

  const handleProceed = () => {
    if (selectedLevel) {
      navigate('/english');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-4 py-8 relative">
        <AnimatedBackground />
        
        <div className="w-full max-w-4xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <button
              onClick={() => navigate('/subjects')}
              className="flex items-center text-gray-600 hover:text-primary-500 transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Subjects
            </button>
            
            <div className="text-center">
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Check Your Level
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Select your current skill level to get personalized learning content
              </motion.p>
            </div>
          </motion.div>

          <div className="space-y-4 mb-8">
            {levels.map((level, index) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  selectedLevel === level.id 
                    ? level.selectedBg 
                    : `${level.bgColor} hover:shadow-lg`
                }`}
                onClick={() => setSelectedLevel(level.id)}
              >
                <div className="flex items-center">
                  <motion.div
                    className="flex-shrink-0 mr-4"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <level.icon className={`w-8 h-8 ${level.color}`} />
                  </motion.div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {level.name}
                    </h3>
                    <p className="text-gray-600">
                      {level.description}
                    </p>
                  </div>
                  
                  <motion.div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedLevel === level.id
                        ? 'border-primary-400 bg-primary-400'
                        : 'border-gray-300'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {selectedLevel === level.id && (
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <RippleButton
              onClick={handleProceed}
              disabled={!selectedLevel}
              className={`px-12 ${!selectedLevel ? 'opacity-50 cursor-not-allowed' : ''}`}
              size="lg"
            >
              Continue to Learning
            </RippleButton>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default LevelSelectionPage;