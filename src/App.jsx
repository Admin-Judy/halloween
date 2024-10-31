import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/python/python';
import Header from './components/Header';
import Home from './components/Home';

const questions = [
  { 
    question: "Halloween은 어느 나라에서 만들어졌을까요?",
    answer: "Ireland", 
    hint: "첫자는 대문자로! 수도는 ㄷㅂㄹ", 
    easterEgg: "🎃", 
    easterEggMessage: "할로윈 호박이 나타났어요!" 
  },
  { 
    question: "다음 패턴에서 빈칸에 들어갈 숫자는 무엇인가요? 1, 4, 9, 16, __, 36", 
    answer: "25", 
    hint: "패턴찾기 문제 (네모 루트)", 
    easterEgg: "👻", 
    easterEggMessage: "유령이 나타났어요!" 
  },
  { 
    question: "다음 숫자 패턴에서 빈칸에 들어갈 숫자는 무엇인가요? 2, 4, 8, 16, __, 64", 
    answer: "32", 
    hint: "이번문제는 힌트가 없습니다!", 
    easterEgg: "🧙‍♀️", 
    easterEggMessage: "마녀가 나타났어요!" 
  },
  { 
    question: "어느 날, 한 마을에서 보물이 도난당했습니다. 경찰은 세 명의 용의자를 조사했습니다. 각 용의자는 다음과 같은 진술을 했습니다. 용의자 A: 나는 그날 밤 집에 있었고, 아무것도 훔치지 않았어. 용의자 B: 나는 친구와 함께 영화를 보고 있었어. 나를 믿어줘! 용의자 C: 나는 그날 밤 외출하지 않았어. A와 B가 범인이야! 하지만 경찰은 한 명의 용의자가 거짓말을 하고 있다는 것을 알고 있습니다. 누가 범인일까요?", 
    answer: "A", 
    hint: "알파벳만 기재하세요!", 
    easterEgg: "🧙‍♀️", 
    easterEggMessage: "또 다른 마녀가 날아갔어요!" 
      },
  { 
    question: "???에 들어갈 정답을 구하세요! 5+3 = 28, 9+1 =810 8+6 =214, 5+4 =19 then. 7+3 = ???",
    answer: "410", 
    hint: "사칙연산",  
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
