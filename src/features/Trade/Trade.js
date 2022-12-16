import { doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../PlayerCard/PlayerCard'

import './Trade.css'

const Trade = ({ players, playerId, roomId, resetStates }) => {

    const [playerToTradeWith, setPlayerToTradeWith] = useState('')
    const [amountToTradeWith, setAmountToTradeWith] = useState('')
    const [amountToTradeAway, setAmountToTradeAway] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        players[0].map((player) => {
            if (player.player_id === playerId) {
                player.property_value -= amountToTradeAway
                player.net_worth -= amountToTradeAway
                player.property_value += amountToTradeWith
                player.net_worth += amountToTradeWith
                player.net_worth <= 0 ? player.active = false : player.active = true
                return player
            } else if (player.player_id === playerToTradeWith.player_id) {
                player.property_value -= amountToTradeWith
                player.net_worth -= amountToTradeWith
                player.property_value += amountToTradeAway
                player.net_worth += amountToTradeAway
                player.net_worth <= 0 ? player.active = false : player.active = true
                return player
            }
            return player
        })
        const docRef = doc(db, 'rooms', roomId)

        await updateDoc(docRef, {
            'players': players[0]
        })
        resetStates()
    }

  return (
    <div className='trade'>
        <h4>Trade</h4> 
        {
            players[0].map((player) => {
                if (player.player_id === playerId) {
                    if (player.property_value <=0) {
                        return <p key={player.player_id}>Invalid! <br/>Insufficient Funds for Trading!</p>
                    } else {
                        return (
                            <div className='trade-div' key={player.player_id}>
                                <p>Select Player to Trade With:</p>
                                    <ul>
                                        {players[0].map((player) => {
                                            if (player.player_id !== playerId) {
                                                return (
                                                    <li key={player.player_id} className={playerToTradeWith !== '' && player.player_id === playerToTradeWith ? 'selected' :''}>
                                                        <button onClick={() => setPlayerToTradeWith(player)}>{player.name}</button>
                                                    </li>
                                                )
                                            }
                                            return ''
                                        })}
                                    </ul>
                                    {playerToTradeWith !== '' ? (
                                        <form key={player.player_id} onSubmit={handleSubmit}>
                                            <label htmlFor='player-to-trade-with-prop-value'>Enter {playerToTradeWith.name}'s Property Value:</label>
                                            <input type='number' value={amountToTradeWith} name='player-to-trade-with-prop-value' onChange={(e) => setAmountToTradeWith(Number(e.target.value))}/>

                                            {
                                                amountToTradeWith === '' ? '' : (
                                                    <div>
                                                        <label htmlFor='amount-to-trade-away'>Enter Your Property Value:</label>
                                                        <input type='amount' value={amountToTradeAway} name='amount-to-trade-away' onChange={(e) => setAmountToTradeAway(Number(e.target.value))}/>
                                                        <input type='submit' value='Done'/>
                                                    </div>
                                                )
                                            }
                                        </form>
                                    ) : ''}
                            </div>
                        )
                    }
                }
                return ''
            })
        }
    </div>
  )
}

export default Trade