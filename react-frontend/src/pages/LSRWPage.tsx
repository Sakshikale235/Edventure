import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Pause, Volume2, Mic, Eye, PenTool, CheckCircle } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import Card from '../components/Card';
import RippleButton from '../components/RippleButton';
import PageTransition from '../components/PageTransition';

const LSRWPage: React.FC = () => {
  const navigate = useNavigate();
  const { section } = useParams();

  const sectionConfig = {
    listening: {
      title: 'Listening Skills',
      icon: Volume2,
      color: 'from-blue-400 to-blue-600',
      description: 'Improve your listening comprehension with audio exercises'
    },
    speaking: {
      title: 'Speaking Skills',
      icon: Mic,
      color: 'from-green-400 to-green-600',
      description: 'Practice pronunciation and speaking fluency with AI feedback'
    },
    reading: {
      title: 'Reading Skills',
      icon: Eye,
      color: 'from-purple-400 to-purple-600',
      description: 'Enhance reading comprehension and error analysis'
    },
    writing: {
      title: 'Writing Skills',
      icon: PenTool,
      color: 'from-orange-400 to-orange-600',
      description: 'Develop writing skills with topic-based practice'
    }
  };

  const currentSection = sectionConfig[section as keyof typeof sectionConfig];

  const renderListeningContent = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Audio Exercise 1: Business Meeting</h3>
        <div className="flex items-center space-x-4 mb-4">
          <RippleButton size="sm" className="flex items-center">
            <Play className="w-4 h-4 mr-2" />
            Play Audio
          </RippleButton>
          <span className="text-gray-600">Duration: 3:45</span>
        </div>
        <p className="text-gray-700 mb-4">
          Listen to the business meeting discussion and answer the questions below.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Questions:</h4>
          <ul className="space-y-2 text-sm">
            <li>1. What was the main topic discussed in the meeting?</li>
            <li>2. How many people participated in the discussion?</li>
            <li>3. What decision was made at the end?</li>
          </ul>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">AI Listening Assessment</h3>
        <p className="text-gray-700 mb-4">
          Take a comprehensive listening test with instant AI feedback on your comprehension skills.
        </p>
        <RippleButton>Start Assessment</RippleButton>
      </Card>
    </div>
  );

  const renderSpeakingContent = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">AI Interview Simulation</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-primary-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Grammar Check</h4>
            <p className="text-sm text-gray-600">AI analyzes your sentence structure and grammar usage</p>
          </div>
          <div className="bg-secondary-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Vocabulary Assessment</h4>
            <p className="text-sm text-gray-600">Evaluate word choice and vocabulary complexity</p>
          </div>
          <div className="bg-accent-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Pronunciation</h4>
            <p className="text-sm text-gray-600">Speech analysis for clear pronunciation</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Facial Expression</h4>
            <p className="text-sm text-gray-600">AI feedback on non-verbal communication</p>
          </div>
        </div>
        <RippleButton className="flex items-center">
          <Mic className="w-4 h-4 mr-2" />
          Start AI Interview
        </RippleButton>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Practice Topics</h3>
        <div className="space-y-3">
          {['Tell me about yourself', 'Describe your strengths', 'Why do you want this role?', 'Describe a challenge you faced'].map((topic, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>{topic}</span>
              <RippleButton size="sm">Practice</RippleButton>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderReadingContent = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Reading Comprehension</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-800 leading-relaxed">
            Artificial Intelligence has revolutionized many industries, from healthcare to finance. 
            Machine learning algorithms can now process vast amounts of data to identify patterns 
            and make predictions with remarkable accuracy. However, the ethical implications of AI 
            development continue to be a subject of intense debate among researchers and policymakers...
          </p>
        </div>
        <RippleButton>Answer Comprehension Questions</RippleButton>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Error Analysis Exercise</h3>
        <p className="text-gray-700 mb-4">
          Identify and correct grammatical errors in the following passages:
        </p>
        <div className="bg-red-50 p-4 rounded-lg mb-4">
          <p className="text-red-800">
            "The company are planning to launch they're new product next month. It will provide 
            more better solutions than there competitors."
          </p>
        </div>
        <RippleButton variant="secondary">Start Error Analysis</RippleButton>
      </Card>
    </div>
  );

  const renderWritingContent = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Essay Writing Practice</h3>
        <div className="mb-4">
          <h4 className="font-medium mb-2">Topic: "The Impact of Technology on Modern Education"</h4>
          <p className="text-gray-600 mb-4">
            Write a 300-word essay discussing how technology has changed the way we learn and teach.
          </p>
          <textarea 
            className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
            placeholder="Start writing your essay here..."
          ></textarea>
        </div>
        <RippleButton>Get AI Feedback</RippleButton>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Writing Prompts</h3>
        <div className="space-y-3">
          {[
            'Describe your ideal workplace environment',
            'Explain a technological innovation that changed your life',
            'Discuss the importance of work-life balance',
            'Analyze the benefits of remote learning'
          ].map((prompt, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="flex-1">{prompt}</span>
              <RippleButton size="sm">Write</RippleButton>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (section) {
      case 'listening': return renderListeningContent();
      case 'speaking': return renderSpeakingContent();
      case 'reading': return renderReadingContent();
      case 'writing': return renderWritingContent();
      default: return <div>Section not found</div>;
    }
  };

  if (!currentSection) {
    return <div>Section not found</div>;
  }

  const otherSections = Object.keys(sectionConfig).filter(key => key !== section);

  return (
    <PageTransition>
      <div className="min-h-screen px-4 py-8 relative">
        <AnimatedBackground />
        
        <div className="max-w-4xl mx-auto z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate('/interview-prep')}
              className="flex items-center text-gray-600 hover:text-primary-500 transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Interview Prep
            </button>
            
            <div className="flex items-center mb-6">
              <motion.div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${currentSection.color} mr-4`}
                whileHover={{ scale: 1.1 }}
              >
                <currentSection.icon className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {currentSection.title}
                </h1>
                <p className="text-gray-600 mt-1">
                  {currentSection.description}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {renderContent()}
          </motion.div>

          {/* Navigation to other sections */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Continue with other skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherSections.map(sectionKey => {
                const sectionInfo = sectionConfig[sectionKey as keyof typeof sectionConfig];
                return (
                  <Card
                    key={sectionKey}
                    onClick={() => navigate(`/lsrw/${sectionKey}`)}
                    className="p-4 text-center cursor-pointer"
                  >
                    <sectionInfo.icon className="w-8 h-8 mx-auto mb-2 text-primary-500" />
                    <h4 className="font-medium text-gray-800">{sectionInfo.title}</h4>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default LSRWPage;