import '../components/startscreen.css';

const StartScreen = ({startGame}) => {
  return (
    <>
      <div className='start'>
        <h1>Start Screen</h1><br />
        <p>Aperte abaixo para jogar</p><br />
        <button onClick={startGame}>Start</button>       
      </div>
    </>
  );
}

export default StartScreen;
