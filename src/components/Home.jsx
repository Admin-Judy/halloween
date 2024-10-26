import React from 'react';
import './Home.css';

const GameDescription = () => (
  <div className="game-description">
    <h2>🎃 할로윈 방탈출 게임 🎃</h2>
    <p>
      당신은 어두운 방에서 이스터 에그를 찾고 있습니다. 
      각 질문에 대한 정답을 맞추면 이스터 에그가 나타납니다.
      조심하세요! 숨겨진 힌트를 찾고, 모든 이스터 에그를 모아야 합니다!
    </p>
    <p>게임을 시작하려면 아래 버튼을 클릭하세요!</p>
  </div>
);

const Home = ({ startGame }) => {
  return (
    <div className="home">
      <GameDescription />
      <button className="start-button" onClick={startGame}>
        게임 시작
      </button>
    </div>
  );
};

export default Home;
