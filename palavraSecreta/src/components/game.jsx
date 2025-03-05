import { useState, useRef } from 'react';
import '../components/game.css';

export const Game = ({
  verificarletra,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof verificarletra === "function") {
      verificarletra(letter);
    } else {
      console.error("verificarletra não é uma função");
    }
    setLetter("");
    letterInputRef.current.focus();
  };

  return (
    <div className="game">
      <p className="pontos">
        <span>pontuação: {score}</span>
      </p>
      <br />
      <h1>adivinhe a palavra</h1>
      <br />
      <h3 className="tips">
        dica sobre a palavra <span>dica: {pickedCategory}</span>
      </h3>
      <p>você ainda tem {guesses} tentativas</p>
      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="latters">
              {letter}
            </span>
          ) : (
            <span key={i} className="blanksquare"></span>
          )
        )}
      </div>

      <div className="lettersContainer">
        <p>tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letters"
            maxLength={1}
            ref={letterInputRef}
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            required
          />
          <button>jogar!</button>
        </form>
      </div>

      <div className="wrongLettersContainer">
        <p>letras já utilizadas</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  );
};
