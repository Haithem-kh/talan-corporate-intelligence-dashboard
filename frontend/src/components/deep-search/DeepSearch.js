import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_CONFIG, API_ENDPOINTS } from '../../config/api';
import './DeepSearch.scss';

const DeepSearch = ({ onResults }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_CONFIG.DEEP_SEARCH_URL}${API_ENDPOINTS.DEEP_SEARCH}`, {
        
        company: query
      });
      
      setResults(response.data);
      if (onResults) {
        onResults(response.data);
      }
    } catch (error) {
      console.error('Deep search error:', error);
      setResults({
        error: 'Failed to perform deep search. Please try again.',
        query: query
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="deep-search"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="search-header">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          🔍 Deep Search
        </motion.h2>
        <p>Comprehensive company intelligence and analysis</p>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <motion.input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter company name for deep analysis..."
            className="search-input"
            whileFocus={{ scale: 1.02 }}
            disabled={loading}
          />
          <motion.button
            type="submit"
            className="search-button"
            disabled={loading || !query.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? (
              <div className="loading-spinner"></div>
            ) : (
              '🚀 Search'
            )}
          </motion.button>
        </div>
      </form>

      {loading && (
        <motion.div 
          className="loading-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="loading-animation">
            <div className="pulse-ring"></div>
            <div className="pulse-ring delay-1"></div>
            <div className="pulse-ring delay-2"></div>
          </div>
          <p>Performing deep analysis...</p>
        </motion.div>
      )}

      {results && !loading && (
        <SearchResults results={results} />
      )}
    </motion.div>
  );
};

const SearchResults = ({ results }) => {
  if (results.error) {
    return (
      <motion.div 
        className="search-results error"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="error-message">
          <h3>❌ Search Error</h3>
          <p>{results.error}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="search-results"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="results-header">
        <h3>📊 Analysis Results</h3>
        <span className="results-count">
          Query: {results.query || 'Unknown'}
        </span>
      </div>

      <div className="results-grid">
        {results.overview && (
          <motion.div 
            className="result-card overview"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4>🏢 Company Overview</h4>
            <div className="card-content">
              <pre>{results.overview}</pre>
            </div>
          </motion.div>
        )}

        {results.strategy && (
          <motion.div 
            className="result-card strategy"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4>🎯 Strategy</h4>
            <div className="card-content">
              <pre>{results.strategy}</pre>
            </div>
          </motion.div>
        )}

        {results.products && (
          <motion.div 
            className="result-card products"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4>🛠️ Products & Services</h4>
            <div className="card-content">
              <pre>{results.products}</pre>
            </div>
          </motion.div>
        )}

        {results.financials && (
          <motion.div 
            className="result-card financials"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4>💰 Financials</h4>
            <div className="card-content">
              <pre>{results.financials}</pre>
            </div>
          </motion.div>
        )}

        {results.report && (
          <motion.div 
            className="result-card full-report"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h4>📋 Full Report</h4>
            <div className="card-content report-content">
              <pre>{results.report}</pre>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DeepSearch;
