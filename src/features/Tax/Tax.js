import { doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../PlayerCard/PlayerCard'

const Tax = ({ players, playerId, roomId, resetStates}) => {

  const [amount, setAmount] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    players[0].map((player) => {
      if (player.player_id === playerId) {
        player.bank -= amount
        player.net_worth -= amount
        player.net_worth <= 0 ? player.active = false : player.active = true
        return player
      }
      return player
    })
    
    const docRef = doc(db, 'rooms', roomId)

    await updateDoc(docRef, {
      'players': players[0]
    })
    await updateDoc(docRef, {
      'free_parking': amount
    })
    resetStates()
    }

  return (
    <div className='tax'>
        <form onSubmit={handleSubmit}>
            <label htmlFor='amount'>Enter Amount:</label>
            <input type='number' name='amount' placeholder='0' value={amount} onChange={(e) => setAmount(Number(Math.round(e.target.value)))}/>
            <input type='submit' value='Done'/>
        </form>
    </div>
  )
}

export default Tax