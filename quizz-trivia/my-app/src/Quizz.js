import {useState, useEffect, React} from 'react

export default function Quizz() {

const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState([]);
 /*Fetching the trivia Api*/ 
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
  
 /*Mapping throught the data of triva Api*/
 const answers =  (datas.map((data, index) =>{
 const dataNumbers = [data.correct_answer +', ' + data.incorrect_answers]

  console.log(data.question)

  function getRandomnumber(array){
   
   const randonNumber = Math.floor(Math.random() * array.length)
   console.log(array[randonNumber])
   return array[randonNumber]

  }
 
  return (
           
            <div key={`${data.question}-${index}`}>
              <h2 className='questions'>{data.question}</h2>
              <li className='answers' key={index}>{getRandomnumber(dataNumbers)}</li>
              </div>
          )}
        )
        )

}

