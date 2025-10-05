import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatbotPage from '../chatbot/ChatbotPage';
import DeepSearch from '../deep-search/DeepSearch';
import './Dashboard.scss';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('chatbot');

  const handleDeepSearchResults = (results) => {
    console.log('Deep search results:', results);
  };

  const tabs = [
    {
      id: 'chatbot',
      label: '💬 AI Assistant',
      icon: '🤖',
      description: 'Interactive AI chat assistant'
    },
    {
      id: 'deep-search',
      label: '🔍 Deep Search',
      icon: '🎯',
      description: 'Company intelligence analysis'
    }
  ];

  return (
    <motion.div 
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Dashboard Header */}
      <motion.header 
        className="dashboard-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="header-content">
          <motion.div 
            className="logo-section"
            whileHover={{ scale: 1.05 }}
          >
            <h1>
              <span className="logo-icon">🚀</span>
              AI Intelligence Hub
            </h1>
            <p>Advanced AI-powered research and analysis platform</p>
          </motion.div>
          
          <motion.div 
            className="stats-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="stat-card">
              <span className="stat-number">∞</span>
              <span className="stat-label">AI Queries</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Available</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">⚡</span>
              <span className="stat-label">Fast Results</span>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Navigation Tabs */}
      <motion.nav 
        className="dashboard-nav"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="nav-container">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <span className="tab-icon">{tab.icon}</span>
              <div className="tab-content">
                <span className="tab-label">{tab.label}</span>
                <span className="tab-description">{tab.description}</span>
              </div>
              {activeTab === tab.id && (
                <motion.div
                  className="tab-indicator"
                  layoutId="activeTab"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Main Content Area */}
      <motion.main 
        className="dashboard-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <AnimatePresence mode="wait">
          {activeTab === 'chatbot' && (
            <motion.div
              key="chatbot"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="content-panel"
            >
              <div className="panel-header">
                <h2>🤖 AI Assistant</h2>
                <p>Chat with our intelligent AI assistant for instant help and information</p>
              </div>
              <ChatbotPage />
            </motion.div>
          )}

          {activeTab === 'deep-search' && (
            <motion.div
              key="deep-search"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="content-panel"
            >
              <div className="panel-header">
                <h2>🔍 Deep Search Analytics</h2>
                <p>Comprehensive company intelligence and competitive analysis</p>
              </div>
              <DeepSearch onResults={handleDeepSearchResults} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      {/* Floating Action Buttons */}
      <motion.div 
        className="floating-actions"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <motion.button
          className="fab help-fab"
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          title="Help & Documentation"
        >
          ❓
        </motion.button>
        
        <motion.button
          className="fab settings-fab"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          title="Settings"
        >
          ⚙️
        </motion.button>
      </motion.div>

      {/* Background Particles */}
      <div className="background-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;
