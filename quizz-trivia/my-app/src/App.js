
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
 

return (
    <div>{
      
      !isLoading? 'isLoading': Quizz(datas)
  
    }
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
