import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles, 
  Database, 
  Zap, 
  Globe, 
  Layers,
  Bot
} from 'lucide-react';
import './OnboardingModal.css';

const AnimatedText = ({ children, delay = 0 }) => {
  const words = typeof children === 'string' ? children.split(' ') : [];
  return (
    <span>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + idx * 0.05, duration: 0.3 }}
          style={{ display: 'inline-block', marginRight: '4px' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export const OnboardingModal = ({ show, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const hasResetRef = useRef(false);

  useEffect(() => {
    if (show && !hasResetRef.current) {
      setCurrentStep(0);
      hasResetRef.current = true;
    } else if (!show) {
      hasResetRef.current = false;
    }
  }, [show]);

  const steps = [
    {
      title: "Real-Time Synchronization ⚡",
      description: "DishBoard uses Socket.IO for instantaneous updates. Toggle a dish in one tab, and watch it flip across all connected dashboards with zero latency.",
      icon: Globe,
      colorClass: "gradient-blue-indigo",
      content: (
        <div className="modal-visual-area">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="visual-icon-box gradient-blue-indigo"
          >
            <Globe size={48} />
          </motion.div>
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="visual-orbit"
            style={{ width: '200px', height: '200px' }}
          >
            <Zap size={16} color="#60A5FA" />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#93C5FD' }} />
          </motion.div>
        </div>
      )
    },
    {
      title: "Optimistic UI ✨",
      description: "When you interact, the UI assumes success and updates instantly. If the API fails, it seamlessly rolls back and notifies you, ensuring a friction-free experience.",
      icon: Layers,
      colorClass: "gradient-cyan-emerald",
      content: (
        <div className="modal-visual-area">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="visual-card"
          >
            <div className="visual-tag" style={{ color: '#10B981' }}>Optimistic State</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', background: 'var(--bg)', padding: '8px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
              <span>Action: Publish Dish</span>
              <span style={{ color: '#10B981' }}>UI Updated Immediately</span>
            </div>
            <div className="visual-progress-bg">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1 }}
                className="visual-progress-fill gradient-cyan-emerald"
              />
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Syncing with API in background...</div>
          </motion.div>
        </div>
      )
    },
    {
      title: "SQLite WAL Performance 📦",
      description: "Zero setup, maximum speed. We use better-sqlite3 in WAL mode, enabling concurrent reads and preventing database locking during high-frequency writes.",
      icon: Database,
      colorClass: "gradient-amber-orange",
      content: (
        <div className="modal-visual-area">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="visual-card"
            style={{ border: '1px solid rgba(245, 158, 11, 0.3)' }}
          >
            <div className="visual-latency-box">
              <span className="visual-tag" style={{ color: '#F59E0B', margin: 0 }}>WAL Journaling</span>
              <span className="visual-latency-pill">Concurrent Reads</span>
            </div>
            
            <div style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px', textAlign: 'left' }}>dishes.db</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '16px', textAlign: 'left' }}>Synchronous Driver Active</div>

            <div className="visual-progress-bg">
              <motion.div 
                animate={{ x: ["-100%", "300%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="visual-progress-fill gradient-amber-orange"
                style={{ width: '33%' }}
              />
            </div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'right' }}>Background connection stable...</div>
          </motion.div>
        </div>
      )
    },
    {
      title: "Built with AI Synergy 🤖",
      description: "Architected by a human, accelerated by AI. This dashboard leverages modern tools to deliver a premium, production-grade product rapidly without cutting corners.",
      icon: Bot,
      colorClass: "gradient-blue-emerald",
      content: (
        <div className="modal-visual-area">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="visual-icon-box gradient-blue-emerald"
          >
            <Bot size={40} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="visual-ai-pill"
          >
            <Sparkles size={16} color="#F59E0B" />
            <span>Human Architecture + AI Velocity</span>
          </motion.div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGetStarted = () => {
    localStorage.setItem('dishboard_onboarding_viewed', 'true');
    onClose();
  };

  const activeStep = steps[currentStep] || steps[0];
  const IconComponent = activeStep.icon;

  if (!show) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleGetStarted}
          className="modal-backdrop"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="modal-container"
        >
          <div className="modal-progress-track">
            <motion.div
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
              className={`modal-progress-bar ${activeStep.colorClass}`}
            />
          </div>

          <button onClick={handleGetStarted} className="modal-close-btn">
            <X size={16} />
          </button>

          <div className="modal-content-wrapper">
            {activeStep.content}

            <div className="modal-text-area">
              <h2 className="modal-title">
                <IconComponent size={20} color="var(--text-secondary)" />
                <AnimatedText delay={0.1}>{activeStep.title}</AnimatedText>
              </h2>
              <p className="modal-description">
                <AnimatedText delay={0.4}>{activeStep.description}</AnimatedText>
              </p>
            </div>

            <div className="modal-footer">
              <div className="modal-dots">
                {steps.map((_, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ 
                      width: currentStep === idx ? 24 : 8,
                      opacity: currentStep === idx ? 1 : 0.3 
                    }}
                    transition={{ duration: 0.3 }}
                    className={`modal-dot ${currentStep === idx ? activeStep.colorClass : ''}`}
                    style={{ background: currentStep === idx ? '' : 'var(--border)' }}
                  />
                ))}
              </div>

              <div className="modal-actions">
                {currentStep > 0 ? (
                  <button onClick={handleBack} className="btn-back">
                    <ChevronLeft size={16} /> Back
                  </button>
                ) : (
                  <button onClick={handleGetStarted} className="btn-skip">Skip</button>
                )}

                {currentStep < steps.length - 1 ? (
                  <button onClick={handleNext} className={`btn-next ${activeStep.colorClass}`}>
                    Next <ChevronRight size={16} />
                  </button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGetStarted}
                    className={`btn-next ${activeStep.colorClass}`}
                  >
                    Explore Dashboard <Sparkles size={16} />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
