import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, Calculator, Beaker, ArrowLeft } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import Card from '../components/Card';
import PageTransition from '../components/PageTransition';

const SubjectSelectionPage: React.FC = () => {
  const navigate = useNavigate();

  const subjects = [
    {
      name: 'English',
      description: 'Grammar, vocabulary, reading comprehension, and writing skills',
      icon: Book,
      color: 'from-blue-400 to-blue-600',
      route: '/level'
    },
    {
      name: 'Mathematics',
      description: 'Arithmetic, algebra, geometry, and problem-solving',
      icon: Calculator,
      color: 'from-green-400 to-green-600',
      route: '/level'
    },
    {
      name: 'Science',
      description: 'Biology, chemistry, physics, and scientific reasoning',
      icon: Beaker,
      color: 'from-purple-400 to-purple-600',
      route: '/level'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-4 py-8 relative">
        <AnimatedBackground />
        
        <div className="w-full max-w-5xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <button
              onClick={() => navigate('/user-type')}
              className="flex items-center text-gray-600 hover:text-primary-500 transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to User Type
            </button>
            
            <div className="text-center">
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Choose Your Subject
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Select a subject to begin your personalized learning journey
              </motion.p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 0.6 + index * 0.2,
                  type: "spring",
                  stiffness: 100 
                }}
              >
                <Card 
                  onClick={() => navigate(subject.route)}
                  className="h-full p-8 text-center group"
                  glow={true}
                >
                  <motion.div
                    className={`inline-flex p-6 rounded-2xl bg-gradient-to-r ${subject.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <subject.icon className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-primary-500 transition-colors">
                    {subject.name}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {subject.description}
                  </p>
                  
                  <motion.div
                    className="inline-flex items-center text-primary-500 font-medium"
                    whileHover={{ x: 5 }}
                  >
                    Start Learning
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

export default SubjectSelectionPage;