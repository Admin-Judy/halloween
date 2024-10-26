// src/components/Result.jsx
import React from 'react';

const Result = ({ score, totalQuestions, restartGame }) => {
  return (
    <div className="result">
      <h2>결과</h2>
      <p>당신의 점수: {score} / {totalQuestions}</p>
      <button onClick={restartGame}>다시 시작하기</button>
    </div>
  );
};

export default Result;
