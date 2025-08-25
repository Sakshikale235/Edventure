import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, ArrowLeft } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import Card from '../components/Card';
import PageTransition from '../components/PageTransition';

const UserTypePage: React.FC = () => {
  const navigate = useNavigate();

  const userTypes = [
    {
      type: 'student',
      title: 'Student',
      description: 'Elementary to High School learning with fun, interactive lessons',
      icon: BookOpen,
      gradient: 'from-primary-400 to-primary-600',
      route: '/subjects'
    },
    {
      type: 'undergraduate',
      title: 'Undergraduate',
      description: 'College-level preparation for careers and higher education',
      icon: GraduationCap,
      gradient: 'from-secondary-400 to-secondary-600',
      route: '/interview-prep'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-4 py-8 relative">
        <AnimatedBackground />
        
        <div className="w-full max-w-4xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate('/login')}
              className="flex items-center text-gray-600 hover:text-primary-500 transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            
            <div className="text-center">
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Are you a Student or Undergraduate?
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Choose your learning path to get personalized content and features
              </motion.p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {userTypes.map((userType, index) => (
              <motion.div
                key={userType.type}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.2 }}
              >
                <Card 
                  onClick={() => navigate(userType.route)}
                  className="h-full p-8 text-center hover:shadow-2xl border-2 border-transparent hover:border-primary-200"
                  glow={true}
                >
                  <motion.div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${userType.gradient} mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <userType.icon className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {userType.title}
                  </h3>
                  
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {userType.description}
                  </p>
                  
                  <motion.div
                    className="mt-6 inline-flex items-center text-primary-500 font-medium"
                    whileHover={{ x: 5 }}
                  >
                    Get Started
                    <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default UserTypePage;