import { useState } from 'react';
const initialItems = ["Item A", "Item B", "Item C", "Item D"];
export default function Quizz() {
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
        {/* WARNING: Never use Math.random() or index as the element key here */}
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>}
      
    </div>
  );
}


   


