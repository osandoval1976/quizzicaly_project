
import './App.css';
import { useState, useEffect} from 'react';
import React from 'react'


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


const [items, setItems] = useState([]);
const [visible, setInvisible] = useState(false);

const answers = datas.map(data=>{
  let allData = {
  answer : [data.correct_answer, ...data.incorrect_answers],
  questions : data.question
  }
  return allData
  
})  



const shuffleArray = () => {
// Clone the array first to avoid mutating state directly
    const shuffled = [...answers]; 
    console.log(shuffled)
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap
    }
    
    setItems(shuffled);
    setInvisible(items)

}


if(!isLoading){

 return (
 <div>
        <>
        <h1 className='App-section-1'>Quizzical App</h1>
        <p className='App-text'>Start your Quizz Challenge</p>
        </>
    {!visible? <button onClick={shuffleArray} className='btn-title'>Start Quizz</button> :  
    <div>
     
    <ul>
    {items.map(item => (
    
   <li key={item}> <h2> {item.questions}</h2>{item.answer}</li>
    ))} 
        
      </ul>
      </div>
      }
    </div>
   
  );
}

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
