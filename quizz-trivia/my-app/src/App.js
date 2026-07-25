import './App.css';
import './styles.css';
import { useState, useEffect } from 'react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);

  const getMovies = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=4');
      const data = await response.json();
      setDatas(data.results || []);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startQuiz = () => {
    const questions = datas.map((all, index) => ({
      id: index,
      question: all.question,
      answers: shuffleArray([all.correct_answer, ...all.incorrect_answers]),
    }));

    setItems(questions);
    setVisible(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className='App-section-1'>Quizzical App</h1>
      <p className='App-text'>Start your Quizz Challenge</p>

      {!visible ? (
        <button onClick={startQuiz} className='btn-title'>
          Start Quizz
        </button>
      ) : (
        <div className='questions'>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            {items.map((item) => (
              <li key={item.id} style={{ 
            padding: '10px', 
            backgroundColor: '#f4f4f4',
            marginBottom: '5px' 
          }}>
                <h2>{item.question}</h2>
                <button className='list' key={item}>{item.answers.join(' ')}</button>
                
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
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
