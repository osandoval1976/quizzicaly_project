import { useState, React } from 'react';

export default function Quizz(props) {
    
const initialItems = props.map(items=>{
    return [items.correct_answer , ... items.incorrect_answers]
})
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
        <>
        <h1 className='App-section-1'>Quizzical App</h1>
        <p className='App-text'>Start your Quizz Challenge</p>
        </>
    {!visible? <button onClick={shuffleArray} className='btn-title'>Start Quizz</button> :  <ul>
        {/* WARNING: Never use Math.random() or index as the element key here */}
        <><h2>datas</h2></>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>}
      
    </div>
  );
}


   


