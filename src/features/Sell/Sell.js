import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { app } from '../../utils/firebase'
import './Sell.css'

const db = getFirestore(app)

const Sell = ({ players, playerId, roomId, resetStates }) => {

    const [amount, setAmount] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        players[0].map((player) => {
            if (player.player_id === playerId && player.property_value >= amount) {
                player.bank += amount * 2
                player.property_value -= amount * 2
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
        setAmount('')
    }

  return (
    <div className='sell'>
        <h4>Sell</h4>
        {
            players[0].map((player) => {
                if (player.player_id === playerId) {
                    if (player.property_value <= 0) {
                        return <p key={player.player_id}>Invalid! Insufficient Funds!</p>
                    } else { 
                        return (
                            <form onSubmit={handleSubmit} key={player.player_id}>
                                <label htmlFor='amount'>Mortgage Amount:</label>
                                <input type='number' name='amount' value={amount} placeholder='0' onChange={(e) => setAmount(Math.round(e.target.value))}/>
    
                                <input type='submit' value='Done'/>
                                {player.property_value < amount ? (
                                    <p>Invalid! Insufficient Funds!</p>
                                ) : ''}
                            </form>
                        ) 
                    }
                }
                return ''
            })
        }
    </div>
  )
}

export default Sell