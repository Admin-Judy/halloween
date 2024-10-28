import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/python/python';
import Header from './components/Header';
import Home from './components/Home';

const questions = [
  { 
    question: "할로윈에 가장 많이 사용하는 색깔은 무엇일까요?", 
    answer: "오렌지", 
    hint: "이 색깔은 주로 호박과 관련이 있어요.", 
    easterEgg: "🎃", 
    easterEggMessage: "할로윈 호박이 나타났어요!" 
  },
  { 
    question: "유령이 가장 좋아하는 음료는 무엇일까요?", 
    answer: "스프라이트", 
    hint: "유령을 영어로 생각해보세요!", 
    easterEgg: "👻", 
    easterEggMessage: "유령이 나타났어요!" 
  },
  { 
    question: "마녀가 가장 좋아하는 인터넷 사이트는 무엇일까요?", 
    answer: "위키피디아", 
    hint: "이 사이트는 모든 지식을 모아놓은 곳이에요.", 
    easterEgg: "🧙‍♀️", 
    easterEggMessage: "마녀가 나타났어요!" 
  },
  { 
    question: "마녀가 사용하는 컴퓨터의 운영체제는 무엇일까요?", 
    answer: "윈도우", 
    hint: "마녀를 영어로 생각해보세요.", 
    easterEgg: "🧙‍♀️", 
    easterEggMessage: "또 다른 마녀가 날아갔어요!" 
  },
  { 
    question: "좀비가 가장 좋아하는 운동은 무엇일까요?", 
    answer: "브레인 스톰", 
    hint: "🧠이 운동은 생각을 자극하는 활동이에요.", 
    easterEgg: "🧟", 
    easterEggMessage: "좀비가 나타났어요!" 
  }
];

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [hintVisible, setHintVisible] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [easterEggVisible, setEasterEggVisible] = useState('');
  const [easterEggsFound, setEasterEggsFound] = useState(0);
  const [showEasterEggMessage, setShowEasterEggMessage] = useState(false);
  const [congratsVisible, setCongratsVisible] = useState(false);

  const startGame = () => setGameStarted(true);
  const restartGame = () => {
    setGameStarted(false);
    setScore(0);
    setCurrentQuestion(0);
    setAttempts(0);
    setHintVisible(false);
    setUserAnswer('');
    setEasterEggVisible('');
    setEasterEggsFound(0);
    setShowEasterEggMessage(false);
    setCongratsVisible(false);
  };

  const handleAnswer = () => {
    const normalizedUserAnswer = userAnswer.trim();
    const normalizedCorrectAnswer = questions[currentQuestion].answer.trim();

    if (normalizedUserAnswer === normalizedCorrectAnswer) {
      setScore(score + 10);
      setEasterEggVisible(questions[currentQuestion].easterEgg);
      setShowEasterEggMessage(true);
      setEasterEggsFound(easterEggsFound + 1);

      setTimeout(() => {
        setShowEasterEggMessage(false);
        setEasterEggVisible('');
      }, 3000); // 3초 후에 숨기기

      setAttempts(0);
      setUserAnswer('');

      // 모든 문제를 푼 경우
      if (easterEggsFound + 1 === questions.length) {
        setCongratsVisible(true);
        setTimeout(() => {
          setCongratsVisible(false);
          restartGame();
        }, 5000); // 5초 후에 게임 재시작
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setHintVisible(false);
      }
    } else {
      setScore(score - 1);
      setAttempts(attempts + 1);
      if (attempts >= 2) {
        setHintVisible(true);
      }
      setUserAnswer('');
    }
  };

  return (
    <div className="container">
      <Header />
      {!gameStarted ? (
        <Home startGame={startGame} />
      ) : (
        <div className="quiz">
          <div className="easter-egg-boxes">
            {questions.map((q, index) => (
              <div key={index} className="easter-egg-box" style={{ backgroundColor: easterEggsFound > index ? '#ffcc00' : '#444' }}>
                {easterEggsFound > index && (
                  <div className="easter-egg-animation">
                    {showEasterEggMessage && index === currentQuestion ? q.easterEggMessage : q.easterEgg}
                  </div>
                )}
              </div>
            ))}
          </div>
          <h2>{questions[currentQuestion].question}</h2>
          <div className="panel-container">
            <div className="panel">
              <h3>답변 입력</h3>
              <CodeMirror
                value={userAnswer}
                options={{
                  mode: 'python',
                  theme: 'material',
                  lineNumbers: true,
                  matchBrackets: true,
                  autoCloseBrackets: true,
                }}
                onBeforeChange={(editor, data, value) => {
                  setUserAnswer(value);
                }}
              />
              <button onClick={handleAnswer}>제출</button>
              {hintVisible && <p>힌트: {questions[currentQuestion].hint}</p>}
              {attempts > 0 && <p>시도 횟수: {attempts}</p>}
            </div>
          </div>
          {congratsVisible && (
            <div className="congrats-modal">
              <div className="congrats-message">
                <h1>🎉 축하합니다! 🎉</h1>
                <h2>모든 문제를 풀었습니다!</h2>
                <button onClick={restartGame}>게임 재시작</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
