// src/components/Quiz.jsx
import React from 'react';

const Quiz = ({ question, userAnswer, setUserAnswer, handleAnswerSubmit }) => {
  return (
    <div className="quiz">
      <h2>{question}</h2>
      <form onSubmit={handleAnswerSubmit}>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="답변을 입력하세요"
          required
        />
        <button type="submit">제출</button>
      </form>
    </div>
  );
};

export default Quiz;
