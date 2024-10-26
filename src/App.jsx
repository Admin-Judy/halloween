import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/python/python';
import Header from './components/Header';
import Home from './components/Home';

const questions = [
  { 
    question: "1부터 10까지의 합을 구하는 코드를 작성하세요.", 
    answer: "sum(range(1, 11))", 
    hint: "range() 함수를 사용해 보세요.", 
    easterEgg: "🎃", 
    easterEggMessage: "할로윈 호박이 나타났어요!" 
  },
  { 
    question: "주어진 리스트에서 최대값을 찾는 코드를 작성하세요.", 
    answer: "max(your_list)", 
    hint: "max() 함수를 사용해 보세요.", 
    easterEgg: "👻", 
    easterEggMessage: "유령이 나타났어요!" 
  },
  { 
    question: "주어진 문자열을 거꾸로 출력하는 코드를 작성하세요.", 
    answer: "your_string[::-1]", 
    hint: "슬라이싱을 사용해 보세요.", 
    easterEgg: "🕷️", 
    easterEggMessage: "거미가 나타났어요!" 
  },
  { 
    question: "리스트의 모든 요소를 제곱하는 코드를 작성하세요.", 
    answer: "[x**2 for x in your_list]", 
    hint: "리스트 컴프리헨션을 사용해 보세요.", 
    easterEgg: "🦇", 
    easterEggMessage: "박쥐가 날아갔어요!" 
  },
  { 
    question: "주어진 숫자가 홀수인지 짝수인지 확인하는 코드를 작성하세요.", 
    answer: "your_number % 2", 
    hint: "모듈로 연산자를 사용해 보세요.", 
    easterEgg: "🧙‍♀️", 
    easterEggMessage: "마녀가 나타났어요!" 
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
            <div className="congrats-message">
              <h1 style={{ color: 'orange', textAlign: 'center' }}>🎉 축하합니다! 🎉</h1>
              <h2 style={{ color: 'purple', textAlign: 'center' }}>모든 문제를 풀었습니다!</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;



