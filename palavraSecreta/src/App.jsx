import { useState, useEffect, useCallback } from 'react';
import './App.css';
import StartScreen from './components/startscreen';
import { wordsList } from "./data/data";
import { Game } from './components/game';
import { End } from './components/end';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickedWordCategories = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    return { word, category };
  }, [words]);

  const startGame = useCallback(() => {
    clearLetterStage();
    const { word, category } = pickedWordCategories();
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(word.toLowerCase().split(""));
    setGameStage(stages[1].name);
  }, [pickedWordCategories]);

  const verificarletra = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((prev) => [...prev, normalizedLetter]);
    } else {
      setWrongLetters((prev) => [...prev, normalizedLetter]);
      setGuesses((prev) => prev - 1);
    }
  };

  const clearLetterStage = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStage();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    if (guessedLetters.length === uniqueLetters.length && uniqueLetters.length > 0) {
      setScore((prev) => prev + 100);
      setTimeout(startGame, 500); // Pequeno delay para evitar re-renderização imediata
    }
  }, [guessedLetters, letters, startGame]);

  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verificarletra={verificarletra}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <End retry={retry} score={score} />}
    </div>
  );
}

export default App;
