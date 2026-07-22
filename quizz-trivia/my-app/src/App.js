import './App.css';
import { useState, useEffect, React } from 'react';
import Quizz from './Quizz';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState([]);
 
  const getMovies = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=4');
      const data = await response.json();
      setDatas(data.results || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
 
const answers =  (datas.map((data, index) =>{
const newRandom = Quizz(data)
return (
           
            <div key={`${data.question}-${index}`}>
              <h2 className='questions'>{data.question}</h2>
              <p className='answers'>{newRandom[data.correct_answer-data.incorrect_answers]}</p>
              </div>
          )
        }
       ))

   console.log(answers)     
  return (
    <section className='App-section-1'>
      <div>
        {isLoading ? (
          'Loading...'
        ) :answers
          }
      </div>
    </section>
  );
}


