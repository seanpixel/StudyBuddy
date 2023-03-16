import React, { useState } from 'react';
import StudyGuide from './studyguide';
import './App.css';

function App() {
  const [topic, setTopic] = useState('');
  const [subtopics, setSubtopics] = useState([]);
  const [studyGuide, setStudyGuide] = useState('');
  const [currentSubtopic, setCurrentSubtopic] = useState('');
  const [showStudyGuide, setShowStudyGuide] = useState(false);
  const url = "https://studybuddy-backend.herokuapp.com"

  const handleSubtopicClick = async (subtopic) => {
    setCurrentSubtopic(subtopic);
    await generateStudyGuide(subtopic);
    setShowStudyGuide(true);
  };
  
  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const fetchSubtopics = async () => {
    try {
      const response = await fetch(`${url}/subtopics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      setSubtopics(data);
    } catch (error) {
      console.error("Error fetching subtopics:", error);
    }
  };

  const generateStudyGuide = async (subtopic) => {
    try {
      const response = await fetch(`${url}/study-guide`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, subtopic }),
      });
      const data = await response.json();
      setStudyGuide(data.study_guide);
    } catch (error) {
      console.error("Error fetching study guide:", error);
    }
  };

  const goBack = () => {
    setShowStudyGuide(false);
  };

  return (
    <div className="App">
      {!showStudyGuide ? (
        <>
          <h1>AI-Generated Study Guide</h1>
          <div className='input-container'>
            <input
              type="text"
              placeholder="Enter a topic"
              value={topic}
              onChange={handleTopicChange}
            />
            <button onClick={fetchSubtopics}>Generate Subtopics</button>
          </div>
          <ul>
            {subtopics.map((subtopic, index) => (
              <li key={index}>
                <button onClick={() => handleSubtopicClick(subtopic)}>
                  {subtopic}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <StudyGuide
          subtopic={currentSubtopic}
          studyGuide={studyGuide}
          goBack={goBack}
        />
      )}
    </div>
  );
}

export default App;
