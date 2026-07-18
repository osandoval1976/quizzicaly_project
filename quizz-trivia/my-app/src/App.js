import './App.css';
import { useState, useEffect, React } from 'react';


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
  
  
  return (
    <section className='App-section-1'>
      <div>
        {isLoading ? (
          'Loading...'
        ) : (datas.map((data, index) => (
           
            <div key={`${data.question}-${index}`}>
              <h2 className='f-size'>{data.question}</h2>
              <li className='q-list'>{[data.correct_answer+' ,'+data.incorrect_answers.join(' , ')]}</li>
              
              
            </div>
          ))
        )
          }
      </div>
    </section>
  );
}


