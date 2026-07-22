



export default function Quizz(props) {

const answers =  [props.correct_answer,...props.incorrect_answers]


const random = [Math.floor(Math.random() * answers.length)]
console.log(answers)
return random

   
}

