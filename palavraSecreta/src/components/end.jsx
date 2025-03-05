import '../components/end.css';

export const End = ({retry,score}) => {
  return (
    <>
    <div className='start'>
      <h1>fim de jogo</h1><br />
      <h2>sua pontuação <span>{score}</span></h2>
      <button onClick={retry}>Start</button>       
    </div>
  </>
  )
}

