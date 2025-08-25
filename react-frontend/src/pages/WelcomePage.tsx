import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import RippleButton from '../components/RippleButton';
import PageTransition from '../components/PageTransition';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-4 relative">
        <AnimatedBackground />
        
        <div className="text-center max-w-4xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <BookOpen className="w-8 h-8 text-primary-500" />
                <Sparkles className="w-6 h-6 text-secondary-500" />
              </motion.div>
            </div>
            
            <motion.h1
              className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent mb-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Welcome to AI Tutor
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Unlock Your Potential with Intelligent Learning
            </motion.p>
            
            <motion.p
              className="text-lg text-gray-500 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Personalized AI-powered education that adapts to your learning style and helps you achieve your academic goals
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <RippleButton
              onClick={() => navigate('/signup')}
              size="lg"
              className="w-full sm:w-auto min-w-[200px]"
            >
              Get Started
            </RippleButton>
            
            <RippleButton
              onClick={() => navigate('/login')}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-w-[200px]"
            >
              Sign In
            </RippleButton>
          </motion.div>

          <motion.div
            className="mt-12 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            Join thousands of students already learning smarter
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default WelcomePage;