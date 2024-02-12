import { useState } from "react";
import PlusIcon from '../icons/PlusIcon';
import MinusIcon from '../icons/MinusIcon';
import './ScoreDisplay.css'

export default function ScoreDisplay({score}: {score: number} ) {
  const [currentScore, setScore] = useState<number>(score);
  const [plusPressedState, setPlusPressedState] = useState<boolean>(false)
  const [minuspressedState, setMinusPressedState] = useState<boolean>(false)

  function updateScore(amount: number) {
    setScore((prevScore) => prevScore + amount);
  }

  function handlePlusClick() {
    if(!plusPressedState) {
      updateScore(1)
    } else if(plusPressedState) {
      updateScore(-1)
    }
    if(minuspressedState) {
      setMinusPressedState(!minuspressedState)
      updateScore(1)
    }
    setPlusPressedState(!plusPressedState)
  }

  function handleMinusClick() {
    if(!minuspressedState) {
      updateScore(-1)
    } else if(minuspressedState) {
      updateScore(1)
    }
    if(plusPressedState) {
      setPlusPressedState(!plusPressedState)
      updateScore(-1)
    }
    setMinusPressedState(!minuspressedState)
  }

  return (
  <div className='Score-buttons'>
    <button onClick={handlePlusClick} data-active={plusPressedState} className='Comment-score-up'><PlusIcon /></button>
    <span className='Comment-score'>{currentScore}</span> 
    <button onClick={handleMinusClick} data-active={minuspressedState} className='Comment-score-down'><MinusIcon /></button>
  </div>
  )
}