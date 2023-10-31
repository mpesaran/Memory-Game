
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src" : "/img/helmet-1.png"  , matched: false},
  {"src" : "/img/potion-1.png" , matched: false},
  {"src" : "/img/ring-1.png" , matched: false},
  {"src" : "/img/scroll-1.png" , matched: false},
  {"src" : "/img/shield-1.png" , matched: false},
  {"src" : "/img/sword-1.png" , matched: false},
]


function App() {
  const [cards, setCards] = useState([])
  const [turns , setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null) //when user clicks on first card will update coiceone to be that card
  const [choiceTwo, setChoiceTwo] = useState(null) //then when they click on second card will update choicetwo to be that card. we need to add click event to each card
  const [disabled, setDisabled] = useState(false)

//shuffle cards
  const shuffleCards = () => {  
    const shuffledCards = [...cardImages,...cardImages]//takes the array and duplicates objects inside it.
      .sort (()=> Math.random() - 0.5) //randomize the order of the cards in the array. inside the sort we have a function that if we return a number less than 0 the order of those 2 items stays the same. if we return a numer greater than 0 the order of those 2 items swaps
      .map ((card) => ({...card , id: Math.random() })) //apply a random id to each of 12 cards to use as a key when output them in the some kind of list or grid.add an id propert for each card

    setCards(shuffledCards)
    setTurns(0)
  }
 
  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card) //if choice one is null means we don't have a selection for choiceone so setChoiceone runs. if choiceone is true so setchoicetwo runs and we update choice two
  }
  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true) // untill we've done the check we want all the cards were disabled except our two choices

      if (choiceOne.src === choiceTwo.src){ // if two choices sources matches so we update the card state
        setCards(prevCards => { //we taken the previous card state to update the state because we're going to use that inside it
          return prevCards.map(card => { //returning new array of cerds based on the function inmap method
            if (card.src === choiceOne.src){
              return {...card, matched: true}
            }else {
              return card
            }
          })
        })
        resetTurn()
      }else {   
        setTimeout(() => resetTurn() , 1000)
      }
    }
  } , [choiceOne , choiceTwo])


  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns+1)
    setDisabled(false)
  }

  // start a new game automatically
  useEffect(() => {
    shuffleCards()
    setChoiceOne(null)
    setChoiceTwo(null)
  } , [])
 

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard  
            key={card.id} 
            card={card}
            handleChoice = {handleChoice} //pass in it as  a prop
            flipped = {card === choiceOne || card === choiceTwo || card.matched} // flipped must be true in 3 options
            disabled = {disabled}
            />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
