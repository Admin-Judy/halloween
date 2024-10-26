// src/components/Scoreboard.jsx
import React from 'react';

const Scoreboard = ({ score }) => {
  return (
    <div>
      <h2>현재 점수: {score}</h2>
    </div>
  );
};

export default Scoreboard;
