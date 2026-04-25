//fake data
const mockData = {
  summary: "This video explains the fundamentals of AI and how it can be used to enhance learning experiences through automation and intelligent systems.",
  
  timestamps: [
    { time: 30, label: "Introduction to AI" },
    { time: 120, label: "Key Concepts Explained" },
    { time: 300, label: "Real-world Applications" }
  ],

  notes: [
    {
      heading: "What is AI?",
      details: [
        "AI stands for Artificial Intelligence",
        "Used to simulate human intelligence",
        "Includes ML and NLP"
      ]
    },
    {
      heading: "Applications",
      details: [
        "Healthcare",
        "Education",
        "Automation"
      ]
    }
  ],

  quiz: [
    {
      question: "What does AI stand for?",
      options: [
        "Artificial Intelligence",
        "Automated Input",
        "Advanced Interface",
        "None of the above"
      ]
    },
    {
      question: "Which field is part of AI?",
      options: [
        "Machine Learning",
        "Cooking",
        "Painting",
        "Driving"
      ]
    }
  ]
};


import { useState } from 'react';
import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoUrl) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setData(mockData);
    
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-container">
          <div className="logo-icon">⚡</div>
          <h1>FlashLearn</h1>
        </div>
        <p className="subtitle">AI-Powered Video Learning Assistant</p>
      </header>

      <main className="main-content">
        {!data && !loading && (
          <section className="hero">
            <h2>Transform YouTube videos into structured study material instantly.</h2>
            <form onSubmit={handleSubmit} className="url-form">
              <input
                type="text"
                placeholder="Paste YouTube URL here..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="url-input"
              />
              <button type="submit" className="submit-btn" disabled={!videoUrl}>
                Generate
              </button>
            </form>
            {error && <div className="error-message">{error}</div>}
          </section>
        )}

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Analyzing transcript and generating study materials...</p>
          </div>
        )}

        {data && !loading && (
          <div className="dashboard">
            <div className="dashboard-header">
              <button className="back-btn" onClick={() => setData(null)}>← Back</button>
              <h2>Study Dashboard</h2>
            </div>
            
            <div className="tabs">
              <button className={`tab ${activeTab === 'summary' ? 'active' : ''}`} onClick={() => setActiveTab('summary')}>Summary</button>
              <button className={`tab ${activeTab === 'timestamps' ? 'active' : ''}`} onClick={() => setActiveTab('timestamps')}>Timestamps</button>
              <button className={`tab ${activeTab === 'notes' ? 'active' : ''}`} onClick={() => setActiveTab('notes')}>Notes</button>
              <button className={`tab ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>Quiz</button>
            </div>

            <div className="tab-content">
              {activeTab === 'summary' && (
                <div className="card glass">
                  <h3>Video Summary</h3>
                  <p>{data.summary}</p>
                </div>
              )}

              {activeTab === 'timestamps' && (
                <div className="card glass">
                  <h3>Key Moments</h3>
                  <ul className="timestamp-list">
                    {data.timestamps?.map((ts, i) => (
                      <li key={i} className="timestamp-item">
                        <span className="time">{formatTime(ts.time)}</span>
                        <span className="label">{ts.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="card glass">
                  <h3>Detailed Notes</h3>
                  {data.notes?.map((note, i) => (
                    <div key={i} className="note-section">
                      <h4>{note.heading}</h4>
                      <ul>
                        {note.details?.map((detail, j) => (
                          <li key={j}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'quiz' && (
                <div className="card glass">
                  <h3>Test Your Knowledge</h3>
                  {data.quiz?.map((q, i) => (
                    <div key={i} className="quiz-question">
                      <h4>Q{i + 1}: {q.question}</h4>
                      <ul className="quiz-options">
                        {q.options?.map((opt, j) => (
                          <li key={j} className="quiz-option">{opt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
