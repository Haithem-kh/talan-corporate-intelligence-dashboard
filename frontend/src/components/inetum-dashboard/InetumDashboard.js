import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatbotPage from '../chatbot/ChatbotPage';
import DeepSearch from '../deep-search/DeepSearch';
import './InetumDashboard.scss';

const InetumDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleDeepSearchResults = (results) => {
    console.log('Deep search results:', results);
  };

  const tabs = [
    {
      id: 'overview',
      label: '🏢 Inetum Overview',
      icon: '🌟',
      description: "Discover Inetum's expertise and services"
    },
    {
      id: 'locations',
      label: '🌍 Global Presence',
      icon: '📍',
      description: 'Worldwide offices and locations'
    },
    {
      id: 'social-campaigns',
      label: '📱 Digital Presence',
      icon: '📊',
      description: 'Social media and marketing campaigns'
    },
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
      className="inetum-dashboard"
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
            whileHover={{ scale: 1.02 }}
          >
            <h1>
              <span className="logo-icon">⚡</span>
              Inetum Intelligence Hub
            </h1>
            <p>Empowering Digital Flow with AI-Powered Solutions</p>
          </motion.div>
          <motion.div 
            className="stats-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="stat-card">
              <span className="stat-number">27+</span>
              <span className="stat-label">Countries</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">28,000+</span>
              <span className="stat-label">Employees</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">50+</span>
              <span className="stat-label">Years Experience</span>
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
          {activeTab === 'overview' && (
            <InetumOverview key="overview" />
          )}
          {activeTab === 'locations' && (
            <InetumLocations key="locations" />
          )}
          {activeTab === 'social-campaigns' && (
            <InetumSocialCampaigns key="social-campaigns" />
          )}
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
                <p>Chat with our intelligent AI assistant powered by Inetum's expertise</p>
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
                <p>Comprehensive company intelligence powered by Inetum's research capabilities</p>
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
          className="fab contact-fab"
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          title="Contact Inetum"
          onClick={() => window.open('https://www.inetum.com/contact', '_blank')}
        >
          📞
        </motion.button>
        <motion.button
          className="fab website-fab"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          title="Visit Inetum.com"
          onClick={() => window.open('https://www.inetum.com', '_blank')}
        >
          🌐
        </motion.button>
      </motion.div>
      {/* Background Particles */}
      <div className="background-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
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

// Inetum Overview Component
const InetumOverview = () => {
  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="content-panel inetum-overview"
    >
      <div className="panel-header">
        <h2>🌟 About Inetum</h2>
        <p>Leading European IT services and digital solutions provider</p>
      </div>
      <div className="overview-content">
        {/* Hero Section */}
        <motion.section 
          className="hero-section"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="hero-content">
            <h3>🚀 Digital Flow Expert</h3>
            <p>
              Inetum is a global IT services company, helping organizations get the most out of digital flow. With a presence in 27+ countries and 28,000+ employees, Inetum delivers innovative solutions in consulting, systems integration, outsourcing, and software.
            </p>
          </div>
        </motion.section>
        {/* Services Grid */}
        <motion.section 
          className="services-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3>💼 Our Core Services</h3>
          <div className="services-cards">
            {[
              {
                icon: '🔄',
                title: 'Digital Transformation',
                description: 'Business process optimization and digital strategy',
                color: 'blue'
              },
              {
                icon: '🤖',
                title: 'Smart Automation',
                description: 'AI, RPA, and intelligent automation solutions',
                color: 'purple'
              },
              {
                icon: '☁️',
                title: 'Cloud Services',
                description: 'Cloud migration, management, and security',
                color: 'cyan'
              },
              {
                icon: '📊',
                title: 'Data & Analytics',
                description: 'Big data, analytics, and business intelligence',
                color: 'green'
              },
              {
                icon: '🔒',
                title: 'Cybersecurity',
                description: 'End-to-end security and risk management',
                color: 'red'
              },
              {
                icon: '📱',
                title: 'Software Solutions',
                description: 'Custom software and application development',
                color: 'orange'
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                className={`service-card ${service.color}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="service-icon">{service.icon}</div>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        {/* Global Presence */}
        <motion.section 
          className="global-presence"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3>🌍 Global Presence</h3>
          <div className="presence-content">
            <div className="presence-stats">
              <div className="stat-item">
                <span className="stat-number">27+</span>
                <span className="stat-label">Countries</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">28,000+</span>
                <span className="stat-label">Employees</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2500+</span>
                <span className="stat-label">Clients</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Years Experience</span>
              </div>
            </div>
            <div className="presence-description">
              <p>
                Inetum operates across Europe, Africa, Latin America, and Asia, providing local expertise with global reach.
              </p>
            </div>
          </div>
        </motion.section>
        {/* Industries */}
        <motion.section 
          className="industries"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <h3>🏭 Industries We Serve</h3>
          <div className="industries-list">
            {[
              '🏦 Banking & Finance',
              '🏥 Healthcare',
              '🏭 Manufacturing',
              '🛒 Retail',
              '⚡ Energy',
              '🚗 Transport',
              '📡 Telecom',
              '🏛️ Public Sector'
            ].map((industry, index) => (
              <motion.div
                key={industry}
                className="industry-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                {industry}
              </motion.div>
            ))}
          </div>
        </motion.section>
        {/* Call to Action */}
        <motion.section 
          className="cta-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <div className="cta-content">
            <h3>🤝 Ready to Accelerate Your Digital Flow?</h3>
            <p>Let Inetum's experts guide your digital transformation journey</p>
            <div className="cta-buttons">
              <motion.button
                className="cta-button primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://www.inetum.com/contact', '_blank')}
              >
                Contact Us
              </motion.button>
              <motion.button
                className="cta-button secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://www.inetum.com', '_blank')}
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

// Inetum Locations Component
const InetumLocations = () => {
  const regions = [
    {
      name: 'Europe',
      countries: [
        { name: 'France', cities: ['Paris', 'Lille', 'Lyon', 'Marseille'], headquarters: true },
        { name: 'Spain', cities: ['Madrid', 'Barcelona'] },
        { name: 'Portugal', cities: ['Lisbon', 'Porto'] },
        { name: 'Belgium', cities: ['Brussels'] },
        { name: 'Germany', cities: ['Berlin', 'Frankfurt'] },
        { name: 'Poland', cities: ['Warsaw'] }
      ]
    },
    {
      name: 'Africa',
      countries: [
        { name: 'Morocco', cities: ['Casablanca', 'Rabat'] },
        { name: 'Tunisia', cities: ['Tunis'] },
        { name: 'Ivory Coast', cities: ['Abidjan'] }
      ]
    },
    {
      name: 'Latin America',
      countries: [
        { name: 'Brazil', cities: ['Sao Paulo', 'Rio de Janeiro'] },
        { name: 'Chile', cities: ['Santiago'] }
      ]
    },
    {
      name: 'Asia',
      countries: [
        { name: 'India', cities: ['Bangalore', 'Mumbai'] },
        { name: 'Singapore', cities: ['Singapore'] }
      ]
    }
  ];
  return (
    <motion.div
      key="locations"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="content-panel inetum-locations"
    >
      <div className="panel-header">
        <h2>🌍 Global Presence</h2>
        <p>Inetum's worldwide network spanning 4 continents and 27+ countries</p>
      </div>
      <div className="locations-content">
        {/* Global Stats */}
        <motion.section 
          className="global-stats"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">27+</span>
              <span className="stat-label">Countries</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Offices</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4</span>
              <span className="stat-label">Continents</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">28,000+</span>
              <span className="stat-label">Employees</span>
            </div>
          </div>
        </motion.section>
        {/* Regions */}
        <motion.section 
          className="regions-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3>🗺️ Regional Presence</h3>
          <div className="regions-grid">
            {regions.map((region, regionIndex) => (
              <motion.div
                key={region.name}
                className="region-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + regionIndex * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <h4>{region.name}</h4>
                <div className="countries-list">
                  {region.countries.map((country, countryIndex) => (
                    <motion.div
                      key={country.name}
                      className={`country-item ${country.headquarters ? 'headquarters' : ''}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + regionIndex * 0.1 + countryIndex * 0.05 }}
                    >
                      <div className="country-header">
                        <span className="country-name">
                          {country.name}
                          {country.headquarters && <span className="hq-badge">🏛️ HQ</span>}
                        </span>
                        <span className="cities-count">{country.cities.length} office{country.cities.length > 1 ? 's' : ''}</span>
                      </div>
                      <div className="cities-list">
                        {country.cities.map((city, cityIndex) => (
                          <span key={cityIndex} className="city-tag">{city}</span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

// Inetum Social & Campaigns Component
const InetumSocialCampaigns = () => {
  return (
    <motion.div
      key="social-campaigns"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="content-panel inetum-social"
    >
      <div className="panel-header">
        <h2>📱 Digital Presence & Campaigns</h2>
        <p>Inetum's social media presence, thought leadership, and marketing initiatives</p>
      </div>
      <div className="social-content">
        {/* Social Media Stats */}
        <motion.section 
          className="social-stats"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3>📊 Social Media Reach</h3>
          <div className="social-platforms">
            {[
              { platform: 'LinkedIn', followers: '200K+', engagement: '9.2%', icon: '💼', color: '#0077b5' },
              { platform: 'Twitter', followers: '50K+', engagement: '7.1%', icon: '🐦', color: '#1da1f2' },
              { platform: 'YouTube', followers: '30K+', engagement: '13.5%', icon: '📺', color: '#ff0000' },
              { platform: 'Instagram', followers: '35K+', engagement: '10.2%', icon: '📸', color: '#e4405f' }
            ].map((platform, index) => (
              <motion.div
                key={platform.platform}
                className="social-platform"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                style={{ borderTopColor: platform.color }}
              >
                <div className="platform-icon">{platform.icon}</div>
                <h4>{platform.platform}</h4>
                <div className="platform-stats">
                  <div className="stat">
                    <span className="number">{platform.followers}</span>
                    <span className="label">Followers</span>
                  </div>
                  <div className="stat">
                    <span className="number">{platform.engagement}</span>
                    <span className="label">Engagement</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        {/* Current Campaigns */}
        <motion.section 
          className="current-campaigns"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3>🚀 Current Campaigns</h3>
          <div className="campaigns-grid">
            {[
              {
                title: 'Digital Flow for All',
                type: 'Brand Awareness',
                status: 'Active',
                reach: '3.0M+ impressions',
                description: 'Promoting Inetum’s vision for digital flow in business and society',
                platforms: ['LinkedIn', 'Twitter', 'Blog'],
                startDate: '2025-Q2'
              },
              {
                title: 'Smart Automation Week',
                type: 'Tech Event',
                status: 'Active',
                reach: '2.2M+ impressions',
                description: 'Showcasing automation solutions and client success stories',
                platforms: ['LinkedIn', 'YouTube', 'Website'],
                startDate: '2025-Q1'
              },
              {
                title: 'Sustainable IT',
                type: 'ESG Initiative',
                status: 'Ongoing',
                reach: '2.8M+ impressions',
                description: 'Highlighting Inetum’s commitment to sustainable technology',
                platforms: ['All Platforms', 'Website'],
                startDate: '2024-Q4'
              }
            ].map((campaign, index) => (
              <motion.div
                key={campaign.title}
                className="campaign-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="campaign-header">
                  <h4>{campaign.title}</h4>
                  <span className={`campaign-status ${campaign.status.toLowerCase()}`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="campaign-details">
                  <p><strong>Type:</strong> {campaign.type}</p>
                  <p><strong>Reach:</strong> {campaign.reach}</p>
                  <p><strong>Started:</strong> {campaign.startDate}</p>
                  <p className="campaign-description">{campaign.description}</p>
                  <div className="campaign-platforms">
                    <strong>Platforms:</strong>
                    <div className="platforms-list">
                      {campaign.platforms.map((platform, idx) => (
                        <span key={idx} className="platform-badge">{platform}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        {/* Thought Leadership */}
        <motion.section 
          className="thought-leadership"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <h3>🎯 Thought Leadership Initiatives</h3>
          <div className="leadership-grid">
            {[
              {
                title: 'AI for Good',
                leader: 'Chief Innovation Officer',
                content: 'White papers, webinars, conference speaking',
                impact: '600K+ views',
                focus: 'Ethical and responsible AI'
              },
              {
                title: 'Future of Digital Flow',
                leader: 'CEO',
                content: 'Research reports, podcast series',
                impact: '900K+ engagement',
                focus: 'Digital transformation strategies'
              },
              {
                title: 'Sustainable IT',
                leader: 'ESG Lead',
                content: 'Industry reports, client case studies',
                impact: '400K+ downloads',
                focus: 'Green technology solutions'
              }
            ].map((initiative, index) => (
              <motion.div
                key={initiative.title}
                className="leadership-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <h4>{initiative.title}</h4>
                <p><strong>Leader:</strong> {initiative.leader}</p>
                <p><strong>Content:</strong> {initiative.content}</p>
                <p><strong>Impact:</strong> {initiative.impact}</p>
                <div className="focus-area">
                  <strong>Focus:</strong> {initiative.focus}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        {/* Partnership & Events */}
        <motion.section 
          className="partnerships-events"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <h3>🤝 Strategic Partnerships & Events</h3>
          <div className="partnerships-content">
            <div className="partnerships-list">
              <h4>Key Technology Partners</h4>
              <div className="partners-grid">
                {['Microsoft', 'AWS', 'Google Cloud', 'Salesforce', 'SAP', 'IBM'].map((partner, index) => (
                  <motion.div
                    key={partner}
                    className="partner-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.0 + index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {partner}
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="events-list">
              <h4>Major Events & Conferences</h4>
              <div className="events-grid">
                {[
                  'Digital Flow Summit', 'Web Summit', 'VivaTech', 'FinTech Festival',
                  'AWS re:Invent', 'Microsoft Build', 'Salesforce Dreamforce'
                ].map((event, index) => (
                  <motion.div
                    key={event}
                    className="event-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.2 + index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {event}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
        {/* Content Performance */}
        <motion.section 
          className="content-performance"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
        >
          <h3>📈 Content Performance Metrics</h3>
          <div className="performance-grid">
            <div className="performance-card">
              <h4>Blog & Articles</h4>
              <div className="metrics">
                <div className="metric">
                  <span className="metric-number">180+</span>
                  <span className="metric-label">Articles/Year</span>
                </div>
                <div className="metric">
                  <span className="metric-number">3.0M+</span>
                  <span className="metric-label">Annual Views</span>
                </div>
              </div>
            </div>
            <div className="performance-card">
              <h4>Video Content</h4>
              <div className="metrics">
                <div className="metric">
                  <span className="metric-number">250+</span>
                  <span className="metric-label">Videos/Year</span>
                </div>
                <div className="metric">
                  <span className="metric-number">2.2M+</span>
                  <span className="metric-label">Total Views</span>
                </div>
              </div>
            </div>
            <div className="performance-card">
              <h4>Webinars & Events</h4>
              <div className="metrics">
                <div className="metric">
                  <span className="metric-number">60+</span>
                  <span className="metric-label">Events/Year</span>
                </div>
                <div className="metric">
                  <span className="metric-number">30K+</span>
                  <span className="metric-label">Attendees</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default InetumDashboard;
