import React, { useState, useEffect } from 'react';
import Sapling from './Sapling';

function Hangman() {
  const [word, setWord] = useState('');
  const [clue, setClue] = useState('');
  const [guessed, setGuessed] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const maxWrong = 6;

  useEffect(() => {
    fetchWord();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        handleGuess(key); // Call handleGuess if the key is a letter
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      // Cleanup event listener
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [guessed, word, wrongGuesses]); // Dependencies to ensure the latest values are used

  const fetchWord = async () => {
    try {
      const response = await fetch('http://localhost:3032/api/word');
      const data = await response.json();
      setWord(data.word.toUpperCase());
      setClue(data.clue);
      setGuessed([]);
      setWrongGuesses(0);
      setGameOver(false);
      setIsWinner(false);
    } catch (error) {
      console.error('Error fetching word:', error);
    }
  };

  const handleGuess = (letter) => {
    if (guessed.includes(letter)) return;

    if (word.includes(letter)) {
      setGuessed([...guessed, letter]);
    } else {
      setWrongGuesses(wrongGuesses + 1);
      setGuessed([...guessed, letter]);
    }
  };

  const isGameOver = wrongGuesses >= maxWrong;
  useEffect(() => {
    if (isGameOver || word.split('').every((letter) => guessed.includes(letter))) {
      setGameOver(true);
      setIsWinner(word.split('').every((letter) => guessed.includes(letter)));
    }
  }, [isGameOver, guessed, word]);

  const renderWord = () =>
    word
      .split('')
      .map((letter) => (guessed.includes(letter) ? letter : '_'))
      .join(' ');

  return (
    <div style={{ textAlign: 'center' }}>
      <Sapling wrongGuesses={wrongGuesses} />
      <p>Clue: {clue}</p>
      <p>Wrong guesses: {wrongGuesses}</p>
      <p>Word: {renderWord()}</p>

      {gameOver ? (
        <div>
          {isWinner ? <p>Congratulations! You guessed the word!</p> : <p>You lost! The word was {word}.</p>}
          <button onClick={fetchWord}>Next Word</button>
        </div>
      ) : (
        <div>
          <p>Guess a letter:</p>
          {[...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map((letter) => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessed.includes(letter)}
            >
              {letter}
            </button>
          ))}
          <p style={{ fontStyle: 'italic' }}>You can also press keys on your keyboard to guess letters.</p>
        </div>
      )}
    </div>
  );
}

export default Hangman;
