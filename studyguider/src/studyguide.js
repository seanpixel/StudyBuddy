import React from 'react';

function processStudyGuide(studyGuide) {
    const content = studyGuide.split('\n');
    const processedContent = content.map((line) => {
      if (line.startsWith('## ')) {
        return { type: 'heading', value: line.slice(3) };
      } else if (line.startsWith('### ')) {
        return { type: 'subheading', value: line.slice(4) };
      } else if (line.startsWith('#### ')) {
        return { type: 'subsubheading', value: line.slice(5) };
      } else {
        return { type: 'paragraph', value: line };
      }
    });
  
    return processedContent;
  }

function StudyGuide({ subtopic, studyGuide, goBack }) {
  const processedContent = processStudyGuide(studyGuide);

  return (
    <div className="StudyGuide">
      {processedContent.map((item, index) => {
        if (item.type === 'heading') {
          return <h2 key={index}>{item.value}</h2>;
        } else if (item.type === 'subheading') {
          return <h3 key={index}>{item.value}</h3>;
        } else if (item.type === 'subsubheading') {
          return <h4 key={index}>{item.value}</h4>;
        } else {
          return <p key={index}>{item.value}</p>;
        }
      })}
      <button onClick={goBack}>Go Back</button>
    </div>
  );
}

export default StudyGuide;
