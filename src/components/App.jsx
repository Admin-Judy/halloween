import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const startGame = () => setGameStarted(true);
  const restartGame = () => {
    setGameStarted(false);
    setScore(0);
    setCurrentQuestion(0);
  };

  return (
    <div>
      <Header />
      {!gameStarted ? (
        <Home startGame={startGame} />
      ) : (
        <Quiz 
          question="할로윈에 대한 질문?" 
          options={["옵션 1", "옵션 2", "옵션 3"]} 
          selectOption={(option) => {
            // 선택한 옵션 처리
          }} 
        />
      )}
      {/* 결과 컴포넌트는 점수에 따라 조건부로 렌더링 */}
      {score > 0 && <Result score={score} restartGame={restartGame} />}
    </div>
  );
};

export default App;
