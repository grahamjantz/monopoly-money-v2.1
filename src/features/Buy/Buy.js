import React, { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import '../Buy/Buy.css'

import { useDispatch, useSelector } from 'react-redux'
import { buyProperty, selectCurrentPlayer } from '../PlayersList/PlayersListSlice'

const Buy = ({ setDisplayAction }) => {

    const dispatch = useDispatch();
    const currentPlayer = useSelector(selectCurrentPlayer)

    const [amount, setAmount] = useState('')

    const handleDone = () => {
        if (
            currentPlayer !== null && 
            amount > 0 && 
            currentPlayer.bank >= amount) {
            //add logic to move money from one player to another here in PlayersListSlice
            dispatch(buyProperty({amount: Number(amount)}))
        }
        setDisplayAction(false)
    }

  return (
    <div className='buy'>
        <AiOutlineClose className='buy-close-button' onClick={handleDone}/>
        <h2>Buy</h2>
        <div className='buy-header'>
            <h4>Player: <br/>{currentPlayer.name}</h4>
            <h4>Bank: <br/>${currentPlayer.bank}</h4>
        </div>
        <label htmlFor='amount'>Amount:</label>

        <div className='buy-input'>
            <input 
                type='number' 
                name='amount'
                min='0'
                value={amount} 
                onChange={(e) => setAmount(Math.round(e.target.value))} 
                placeholder='0'
            />
            <button onClick={handleDone}>{currentPlayer.bank > amount ? 'Done' : 'Go Back'}</button>
        </div>
        {
            currentPlayer && 
            currentPlayer.bank <= amount ? 
            <p>Invalid! Insufficient Funds!</p> : ''
        }
        {
            amount && amount < 0 ? <p>Invalid! Please enter positive number!</p> : ''
        }
    </div>
  )
}

export default Buy