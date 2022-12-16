import React, { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import './Trade.css'

import { useDispatch, useSelector } from 'react-redux'
import { selectPlayersList, trade, selectCurrentPlayer } from '../PlayersList/PlayersListSlice'

const Trade = ({ setDisplayAction }) => {

    const dispatch = useDispatch()
    const playersList = useSelector(selectPlayersList)
    const currentPlayer = useSelector(selectCurrentPlayer)

    const [pTwoName, setPTwoName] = useState(null);
    const [pOnePropVal, setPOnePropVal] = useState('')
    const [pTwoPropVal, setPTwoPropVal] = useState('')

    const handleDone = () => {
      if (
        currentPlayer !== null && 
        pOnePropVal >= 0 && 
        currentPlayer.property_value > 0 &&
        pOnePropVal <= currentPlayer.net_worth && 
        pOnePropVal <= currentPlayer.property_value && 

        pTwoName !== null && 
        pTwoPropVal >= 0 && 
        pTwoName.property_value > 0 && 
        pTwoPropVal <= pTwoName.net_worth &&
        pTwoPropVal <= pTwoName.property_value 
        ) {
        dispatch(trade({
          currentPlayer: currentPlayer,
          pOnePropVal: Number(pOnePropVal),
          pTwoName: pTwoName,
          pTwoPropVal: Number(pTwoPropVal)
        }))
    }
        setDisplayAction(false)
        setPTwoName(null)
        setPOnePropVal('')
        setPTwoPropVal('')
    }

    const returnErrMessageInsufficientFunds = () => {
        return <p className='errMessage'>Invalid! Insufficient Funds!</p>
    }

  return (
    <div className='trade'>
        <AiOutlineClose className='trade-close-button' onClick={handleDone}/>
        <h2>Trade</h2> 
        <div className='player-divs'>
            <div className='p-one-div'>
                <div className='p-header'>
                    {
                        currentPlayer ? (
                            <h4>From: {playersList.slice(1).map((player) => {
                                if(player.name === currentPlayer.name) {
                                    return (
                                        <div key={player.piece}>
                                            <button>
                                                {player.name}
                                            </button>
                                            <h4>Amount Available for Trade: <br/>${player.property_value}</h4>
                                        </div>
                                    )
                                }
                                return ''
                            })}</h4>
                            ) : <h4>Please Select Player!</h4>
                    }
                </div>
                <label htmlFor='p-one-amount'>{currentPlayer !== null ? currentPlayer.name : ''} Trade Amount:</label>
                <input 
                    type='number' 
                    name='p-one-amount' 
                    value={pOnePropVal} 
                    onChange={(e) => setPOnePropVal(Math.round(e.target.value))} 
                />
                {
                    currentPlayer !== null && 
                    currentPlayer.property_value === 0 ?
                    returnErrMessageInsufficientFunds() :
                    ''
                }
                {
                    pOnePropVal !== '' &&
                    currentPlayer !== null &&
                    pOnePropVal > currentPlayer.property_value ?
                    returnErrMessageInsufficientFunds():
                    ''
                }
                {
                    pOnePropVal && pOnePropVal < 0 ? <p>Invalid! Please enter positive number!</p> : ''
                }
            </div>
            <hr />
            <div className='p-two-div'>
                <div className='p-header'>
                    {
                        pTwoName ? (
                            <h4>To: {pTwoName ? pTwoName.name : ''}</h4>
                            ) : <h4>Please Select Player!</h4>
                        }
                    <div className='p-buttons'>
                        {playersList.slice(1).map((player) => {
                            if(player.name !== currentPlayer.name) {
                                return (
                                    <div key={player.piece}>
                                        <button onClick={() => setPTwoName(player)}>
                                            {player.name}
                                        </button>
                                        <h4>Amount Available for Trade: <br />${pTwoName ? pTwoName.property_value : ''}</h4>
                                    </div>
                                )
                            }
                            return ''
                        })}
                    </div>
                </div>
                <label htmlFor='p-two-amount'>{pTwoName !== null ? pTwoName.name : ''} Trade Amount:</label>

                <input 
                    type='number' 
                    name='p-two-amount' 
                    value={pTwoPropVal} 
                    onChange={(e) => setPTwoPropVal(Math.round(e.target.value))} 
                />
                {
                    pTwoName !== null && 
                    pTwoName.property_value === 0 ?
                    returnErrMessageInsufficientFunds() :
                    ''
                }
                {
                    pTwoPropVal !== '' &&
                    pTwoName !== null &&
                    pTwoPropVal > pTwoName.property_value ?
                    returnErrMessageInsufficientFunds():
                    ''
                }
                {
                    pTwoPropVal && pTwoPropVal < 0 ? <p>Invalid! Please enter positive number!</p> : ''
                }
            </div>
            <hr/>
        </div>
        <button onClick={handleDone}>Done</button>
    </div>
  )
}

export default Trade