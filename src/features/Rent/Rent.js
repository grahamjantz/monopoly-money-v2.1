import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { app } from '../../utils/firebase'

import './Rent.css'

const Rent = ({ players, playerId, roomId, resetStates }) => {

    const db = getFirestore(app)

    const [ownerId, setOwnerId] = useState('')
    const [amount, setAmount] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (amount > 0) {
            players[0].map((player) => {
                if (player.player_id === playerId && player.bank > amount) {
                    player.bank -= amount
                    player.net_worth -= amount
                    player.net_worth <= 0 ? player.active = false : player.active = true
                    players[0].map((player) => {
                        if (player.player_id === ownerId) {
                            player.bank += Number(amount)
                            player.net_worth += Number(amount)
                            player.net_worth <= 0 ? player.active = false : player.active = true
                            return player
                        }
                        return player
                    })
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
    }

  return (
    <div className='rent'>
        <h4>Pay to:</h4>
        <ul>
            {players[0].map((player) => {
                if (player.player_id !== playerId) {
                    return (
                        <li key={player.player_id} className={ownerId && player.player_id === ownerId ? 'selected' :''}>
                            <button onClick={() => {setOwnerId(player.player_id)}}>{player.name}</button>
                        </li>
                        )
                    }
                    return ''
            })}
        </ul>
            {
                ownerId !== '' ? (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='amount'>Enter Amount</label>
                        <input type='text' name='amount' value={amount} placeholder='0' onChange={(e) => setAmount(Math.round(e.target.value))}/>

                        <input type='submit' value='Done'/>
                    </form>
                ) : ''
            }
            {players[0].map((player) => {
                if (player.player_id === playerId) {
                    if (player.bank < amount) {
                        return (
                            <p key={player.player_id}>Invalid! Insufficient Funds!</p>
                        )
                    }
                }
                return ''
            })}
            {amount <= 0 ? (
                <p>Invalid Amount!</p>
            ) : ''}
    </div>
  )
}

export default Rent