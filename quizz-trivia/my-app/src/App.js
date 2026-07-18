import logo from './logo.svg';
import './App.css';
import Quizz from './Quizz';
import {useState,React} from 'react';

export default function App() {
;

function handleClick() {
return (
  <div>
    <Quizz />
  </div>
)
  


}

  return (
    
    <div className="App">
      <div>
    <h1 className='app-title'>Quizzical</h1>
    <p className='app-text'>Some description if needed</p>
    <button className='btn-title' onClick={() => handleClick}>
    Start-Quizing
   </button>
    </div>
    <div>
      <Quizz />
    </div>
    </div>
  );
}


