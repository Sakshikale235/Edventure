import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UserTypePage from './pages/UserTypePage';
import SubjectSelectionPage from './pages/SubjectSelectionPage';
import LevelSelectionPage from './pages/LevelSelectionPage';
import EnglishLearningPage from './pages/EnglishLearningPage';
import AssessmentPage from './pages/AssessmentPage';
import EnglishModule from './pages/EnglishModule';
import InterviewPrepPage from './pages/InterviewPrepPage';
import LSRWPage from './pages/LSRWPage';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 font-poppins">
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/user-type" element={<UserTypePage />} />
            <Route path="/subjects" element={<SubjectSelectionPage />} />
            <Route path="/level" element={<LevelSelectionPage />} />
            <Route path="/english" element={<EnglishLearningPage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/interview-prep" element={<InterviewPrepPage />} />
            <Route path="/lsrw/:section" element={<LSRWPage />} />
            <Route path="/english-module" element={<EnglishModule />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </div>
  );
}

export default App;