import React, { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import './Rent.css'

import { useDispatch, useSelector } from 'react-redux'
import { selectPlayersList, makePayment, selectCurrentPlayer } from '../PlayersList/PlayersListSlice'

const Rent = ({ setDisplayAction }) => {

    const dispatch = useDispatch();
    const playersList = useSelector(selectPlayersList);
    const currentPlayer = useSelector(selectCurrentPlayer)

    const [to, setTo] = useState(null);
    const [amount, setAmount] = useState('')

    const handleDone = () => {
        if (currentPlayer !== null && to !== null && amount > 0) {
            //add logic to move money from one player to another here in PlayersListSlice
            dispatch(makePayment({to: to, amount: Number(amount)}))
        }
        setDisplayAction(false)
    }

  return (
    <div className='rent'>
        <AiOutlineClose className='rent-close-button' onClick={handleDone}/>
        <h2>Pay Rent</h2> 
        <div className='rent-header'>
            <h4>From: <br/>{currentPlayer ? currentPlayer.name : ''}</h4>
            <h4>Bank: <br/>${currentPlayer.bank}</h4>
        </div>
        <div>
            <h4>To: {to ? to.name : ''}</h4>
            {playersList.slice(1).map((player) => {
                if (player.name !== currentPlayer.name) {
                    return (
                        <button 
                            key={player.piece} 
                            onClick={() => setTo(player)}
                        >
                            {player.name}
                        </button>
                    )
                }
                return ''
            })}
        </div>
        <label htmlFor='amount'>Amount:</label>
        <div className='rent-input'>
            <input type='number' name='amount' value={amount} onChange={(e) => setAmount(Math.round(e.target.value))} placeholder='0'/>
            <button onClick={handleDone}>Done</button>

        </div>
        {
            amount && amount < 0 ? <p>Invalid! Please enter positive number!</p> : ''
        }
    </div>
  )
}

export default Rent