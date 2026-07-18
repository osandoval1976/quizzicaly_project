import { useState, useEffect } from 'react';

export default function Quizz() {
    const [questions, setQuestions] = useState(true);
    const [data, setData] = useState([]);
    console.log(questions)
    const getMovies = async () => {
  try{
const rest =   await fetch('https://opentdb.com/api.php?amount=4')
const data = await rest.json()
setQuestions(data)
 
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

useEffect(() => {
  getMovies()

}
, [])

 return (
    <h1>{questions.question}</h1>
  )
}