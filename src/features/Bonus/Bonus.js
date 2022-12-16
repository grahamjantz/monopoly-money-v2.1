import { doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../PlayerCard/PlayerCard'

const Bonus = ({ players, playerId, roomId, resetStates }) => {

    const [amount, setAmount] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (amount && amount > 0){
    
            players[0].map((player) => {
                if (player.player_id === playerId) {
                    player.bank += amount
                    player.net_worth += amount
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
        setAmount()
    }

  return (
    <div className='bonus'>
        <form onSubmit={handleSubmit}>
            <label htmlFor='amount'>Amount:</label>
            <input name='amount' value={amount} type='text' placeholder='0' 
            onChange={(e) => setAmount(Math.round(e.target.value))}/>

            <input type='submit' value='Done'/>
        </form>
        {amount <= 0 ? (
            <p>Invalid Amount!</p>
        ) : ''}
    </div>
  )
}

export default Bonus