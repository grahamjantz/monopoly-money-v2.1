import React, { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import '../Sell/Sell.css'

import { useDispatch, useSelector } from 'react-redux'
import { nextCard } from '../CurrentCard/CurrentCardSlice'
import { sell, selectCurrentPlayer } from '../PlayersList/PlayersListSlice'

const Sell = ({ setDisplayAction }) => {

    const dispatch = useDispatch();
    const currentPlayer = useSelector(selectCurrentPlayer)

    // const from = 'Bank'
    // const [to, setTo] = useState(null);
    const [amount, setAmount] = useState('')

    const handleDone = () => {
        if (
            currentPlayer !== null && 
            amount > 0 && 
            currentPlayer.property_value >= amount) {
            //add logic to move money from one player to another here in PlayersListSlice
            dispatch(sell({amount: Number(amount)}))
        }
        setDisplayAction(false)
        dispatch(nextCard('Main'))
    }

  return (
    <div className='sell'>
        <AiOutlineClose className='sell-close-button' onClick={handleDone}/>
        <h2>Sell</h2>
        <div className='sell-header'>
            <h4>Player: <br/>{currentPlayer.name}</h4>
            <h4>Property Value: <br/> ${currentPlayer.property_value}</h4>
        </div>
        <label htmlFor='amount'>Enter <strong>Mortgage </strong>Amount of Property To Be Sold:</label>

        <div className='sell-input'>
            <input 
                type='number' 
                name='amount' 
                value={amount} 
                onChange={(e) => setAmount(Math.round(e.target.value))} 
                placeholder='0'
            />

            <button onClick={handleDone}>{currentPlayer.property_value < amount || currentPlayer.property_value === 0 ? 'Go Back' : 'Done'}</button>
        </div>
        {
            currentPlayer && 
            currentPlayer.property_value === 0 ? 
            <p>Invalid! Nothing to Sell!</p> : ''
        }
        {
            currentPlayer.property_value < amount ?
            <p>Invalid! Insufficient Funds!</p> : ''
        }
        {
            amount && amount < 0 ? <p>Invalid! Please enter positive number!</p> : ''
        }
    </div>
  )
}

export default Sell