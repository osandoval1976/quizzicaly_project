import './App.css';
import './styles.css';
import { useEffect, useState } from 'react';
import shuffleArray from './Quizz';
import { clsx } from 'clsx';
import { decode } from 'html-entities';
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [guessAnswer, setGuessAnswer] = useState({});
  
  // Nuevos estados para el flujo final del juego
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [score, setScore] = useState(0);

  // Función para cargar los datos de la API
  const getMovies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=4');
      const data = await response.json();
      
      const formattedQuestions = (data.results || []).map((q) => {
        // 2. Decodificamos la respuesta correcta y las incorrectas desde la API
        const correctAnswerClean = decode(q.correct_answer);
        const incorrectAnswersClean = q.incorrect_answers.map(ans => decode(ans));
        
        const allAnswers = [correctAnswerClean, ...incorrectAnswersClean];
        
        return {
          ...q,
          // Guardamos también la pregunta decodificada
          questionClean: decode(q.question),
          correctAnswerClean: correctAnswerClean,
          shuffledAnswers: shuffleArray(allAnswers)
        };
      });

      setQuestions(formattedQuestions);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handlerClick = (questionIndex, answer) => {
    // Si el quiz ya terminó, no permitimos cambiar nada
    if (isQuizOver) return;

    setGuessAnswer((prev) => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const startQuiz = () => setVisible(true);

  // Función para procesar los puntos al terminar
  const checkAnswers = () => {
    let finalScore = 0;
    questions.forEach((item, index) => {
      if (guessAnswer[index] === item.correct_answer) {
        finalScore++;
      }
    });
    setScore(finalScore);
    setIsQuizOver(true);
  };

  // Función para reiniciar todo el juego por completo
  const resetQuiz = () => {
    setGuessAnswer({});
    setIsQuizOver(false);
    setScore(0);
    getMovies(); // Carga preguntas nuevas
  };

  // Saber si el usuario ya contestó todas las preguntas de la pantalla
  const allQuestionsAnswered = Object.keys(guessAnswer).length === questions.length;

  const listItems = questions.map((item, index) => {
    const hasBeenAnswered = guessAnswer[index] !== undefined;
    const chosenAnswer = guessAnswer[index];

    return (
      <main className="main" key={index}>
        <h2 className='questions'>{item.question}</h2>
        <ul>
          {item.shuffledAnswers.map((answer, indexAnswer) => {
            const isSelected = chosenAnswer === answer;
            
            // Lógica de clases CSS condicionales
            const className = clsx('quiz-btn', {
              // Mientras juega, solo pintamos de gris azulado la opción elegida
              'selected-playing': isSelected && !isQuizOver,
              // Al terminar, revelamos si es correcta o incorrecta con colores claros
              'correct': isQuizOver && answer === item.correct_answer,
              'incorrect': isQuizOver && isSelected && answer !== item.correct_answer,
              'dimmed': isQuizOver && !isSelected && answer !== item.correct_answer
            });

            return (
              <button
                key={indexAnswer}
                className={className}
                // Se bloquea el botón si ya eligió una opción O si el juego terminó
                disabled={hasBeenAnswered || isQuizOver}
                onClick={() => handlerClick(index, answer)}
              >
                {answer}
              </button>
            );
          })}
        </ul>
      </main>
    );
  });

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app-container">
      <h1 className="App-section-1">Quizzical App</h1>
      <p className="App-text">Start your Quizz Challenge</p>

      {!visible ? (
        <button onClick={startQuiz} className="btn-title">
          Start Quizz
        </button>
      ) : (
        <>
          <section className="answers">{listItems}</section>
          
          {/* SECCIÓN FINAL Y BOTONES DE CONTROL */}
          <div className="footer-controls">
            {!isQuizOver ? (
              <button 
                onClick={checkAnswers} 
                className="btn-action"
                disabled={!allQuestionsAnswered}
              >
                Check Answers
              </button>
            ) : (
              <div className="score-section">
                <span className="score-text">
                  You scored <strong>{score}/{questions.length}</strong> correct answers
                </span>
                <button onClick={resetQuiz} className="btn-action">
                  Play Again
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/*"The Fisher–Yates shuffle is an algorithm for shuffling a finite sequence. 
The algorithm takes a list of all the elements of the sequence, and continually determines 
the next element in the shuffled sequence by randomly drawing an element from the list until no elements remain. 
The algorithm produces an unbiased permutation: every permutation is equally likely. The modern version of the 
algorithm takes time proportional to the number of items being shuffled and shuffles them in place."
https://www.youtube.com/watch?v=FGAUekwri1Q
Modificate Shuffing sequence: https://onecompiler.com/react/44vz6tfy8


*/

/*import { useState } from 'react';

const initialItems = ["Item A", "Item B", "Item C", "Item D"];

export default function ShuffleList() {
  const [items, setItems] = useState(initialItems);
  const [visible, setInvisible] = useState(false)
  const shuffleArray = () => {
    // Clone the array first to avoid mutating state directly
    const shuffled = [...items]; 
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap
    }
    
    setItems(shuffled);
    setInvisible(items)
  };
 
  return (
    <div>
    {!visible? <button onClick={shuffleArray}>Shuffle List</button> :  <ul>
        {/* WARNING: Never use Math.random() or index as the element key here *//*}
        <h1>Answer Quizz Questions</h1>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>}
      
    </div>
  );
}
**/
