import './App.css';
import { useState, useEffect, React } from 'react';
import Quizz from './Quizz';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState(false||[]);

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
 const dataNumber = [data.incorrect_answers +' ,' + [data.correct_answer]]
 const randonNumber = Math.floor(Math.random() * dataNumber.length)

console.log(data.question, dataNumber[randonNumber])

  return (
           
            <div key={`${data.question}-${index}`}>
              <h2 className='questions'>{data.question}</h2>
              <li className='answers'>{dataNumber[randonNumber]}</li>
              </div>
          )}
        )
        )
        
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


