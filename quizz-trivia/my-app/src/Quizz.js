
export default function Quizz(props) {
const array =[]
const answer = props.map(items=>items).join(', ');
array.push(answer)
const randomAnswers = Math.floor(Math.random() * array.length)
console.log(array[randomAnswers])
console.log(array)

return array[randomAnswers]

}

