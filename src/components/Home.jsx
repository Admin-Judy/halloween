import React from 'react';
import './Home.css';

const GameDescription = () => (
  <div className="game-description">
    <h2>당신은 어두운 방에서 이스터 에그를 찾고 있습니다. </h2>
    <h2>각 질문에 대한 정답을 맞추면 이스터 에그가 나타납니다.</h2>
    <h2>숨겨진 힌트를 찾고, 모든 이스터 에그를 모아야 합니다!</h2>
    <h3>게임을 시작하려면 아래 버튼을 클릭하세요!</h3>

  </div>
);

const Home = ({ startGame }) => {
  return (
    <div className="home">
      <GameDescription />
      <button className="start-button" onClick={startGame}>
        게임 시작
      </button>
      <h4>모든 이스터 에그를 모은 화면을 카카오채널로 캡쳐해서 보내면 상품을 드립니다</h4>

    </div>
  );
};

export default Home;
