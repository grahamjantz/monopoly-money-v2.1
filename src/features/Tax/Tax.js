import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import React, { useState, useEffect} from 'react'
import { db } from '../PlayerCard/PlayerCard'

const Tax = ({ players, playerId, roomId, resetStates}) => {

  const [amount, setAmount] = useState()
  let [freeParking, setFreeParking] = useState()

  useEffect(() => {
    const q = query(collection(db, "rooms"), where("room_id", "==", roomId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const players = [];
      querySnapshot.forEach((doc) => {
          players.push(doc.data().players);
          setFreeParking(doc.data().free_parking)
      });
      // setPlayers(players)
      // const sort = players[0].sort((a,b) => b.net_worth - a.net_worth).sort((a, b) => b.active - a.active)
      // setPlayersListSorted(sort)
    });
    return () => {
      unsubscribe()
    }
  }, [roomId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    players[0].map((player) => {
      if (player.player_id === playerId && player.bank >= amount) {
        setFreeParking(freeParking += amount)
        player.bank -= amount
        player.net_worth -= amount
        player.net_worth <= 0 ? player.active = false : player.active = true
        return player
      } else {
        setAmount(0)
      }
      return player
    })
    const docRef = doc(db, 'rooms', roomId)

    await updateDoc(docRef, {
      'players': players[0]
    })
    await updateDoc(docRef, {
      'free_parking': freeParking
    })
    resetStates()
    
    }

  return (
    <div className='tax'>
        <form onSubmit={handleSubmit}>
            <label htmlFor='amount'>Enter Amount:</label>
            <input type='number' name='amount' placeholder='0' value={amount} onChange={(e) => setAmount(Math.round(e.target.value))}/>
            <input type='submit' value='Done'/>
        </form>
        {players[0].map((player) => {
          if (player.player_id === playerId && player.bank < amount) {
            return (
              <p>Invalid! Insufficient Funds!</p>
            )
          }
          return ''
        })}
    </div>
  )
}

export default Tax