import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Briefcase, GraduationCap, Building, BookOpen } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import Card from '../components/Card';
import PageTransition from '../components/PageTransition';

const InterviewPrepPage: React.FC = () => {
  const navigate = useNavigate();

  const interviewTypes = [
    {
      type: 'placement',
      title: 'Company Placement',
      description: 'Prepare for corporate interviews with technical and HR rounds',
      icon: Briefcase,
      gradient: 'from-blue-400 to-blue-600',
      features: ['Technical Questions', 'HR Interview', 'Group Discussion', 'Case Studies']
    },
    {
      type: 'higher-studies',
      title: 'Higher Studies',
      description: 'Get ready for university interviews and entrance exams',
      icon: GraduationCap,
      gradient: 'from-purple-400 to-purple-600',
      features: ['Academic Interview', 'Research Discussion', 'SOP Review', 'Mock Interviews']
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
                Interview Preparation
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Choose your interview preparation path and master the skills you need
              </motion.p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {interviewTypes.map((interviewType, index) => (
              <motion.div
                key={interviewType.type}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.2 }}
              >
                <Card 
                  onClick={() => navigate(`/lsrw/listening`)}
                  className="h-full p-8 text-center hover:shadow-2xl border-2 border-transparent hover:border-primary-200"
                  glow={true}
                >
                  <motion.div
                    className={`inline-flex p-6 rounded-2xl bg-gradient-to-r ${interviewType.gradient} mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <interviewType.icon className="w-16 h-16 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {interviewType.title}
                  </h3>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {interviewType.description}
                  </p>
                  
                  <div className="space-y-2 mb-8">
                    {interviewType.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center justify-center text-gray-700"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + featureIndex * 0.1 }}
                      >
                        <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div
                    className="inline-flex items-center text-primary-500 font-medium"
                    whileHover={{ x: 5 }}
                  >
                    Start Preparation
                    <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* LSRW Skills Preview */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Master LSRW Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Listening', icon: '🎧' },
                { name: 'Speaking', icon: '🗣️' },
                { name: 'Reading', icon: '📖' },
                { name: 'Writing', icon: '✍️' }
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-primary-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl mb-2">{skill.icon}</div>
                  <div className="font-semibold text-gray-700">{skill.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default InterviewPrepPage;