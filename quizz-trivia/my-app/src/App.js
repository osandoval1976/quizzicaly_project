import logo from './logo.svg';
import './App.css';
import Quizz from './Quizz';
function App() {

function handleClick() {
  
  console.log("Button clicked");
}



  return (
    <div className="App">
    <h1 className='app-title'>Quizzical</h1>
    <p className='app-text'>Some description if needed</p>
    <button className='btn-title' onClick={handleClick}>
      Start Quiz
    </button> 
    </div>
  );
}

export default App;
