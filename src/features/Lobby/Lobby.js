import React, { useEffect, useState } from 'react'

import './Lobby.css'

import { getFirestore, onSnapshot, collection, where, query } from 'firebase/firestore'
import { app } from '../../utils/firebase';
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom';

const db = getFirestore(app)

const Lobby = () => {
  const navigate = useNavigate()

  const [players, setPlayers] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const roomId = searchParams.get('room_id')
  const playerId = searchParams.get('player_id')

  
  useEffect(() => {
   const fetchQuery = () => {
     const q = query(collection(db, "rooms"), where('room_id', '==', roomId))
     const unsub = onSnapshot(q, (querySnapshot) => {
       const players = []
       querySnapshot.forEach((doc) => {
         players.push(doc.data().players)
       })
       setPlayers(players[0])
     })
     //THIS FUNC IS TO SATISFY UNSUB NOT BEING CALLED WHICH WOULD BREAK THE BUILD
     let func = () => {
      unsub()
     }
     func = ''
     return func
     //END OF POINTLESS FUNC
   }
  fetchQuery()
 }, [roomId])

  const handleDone = () => {
    navigate(`/player-card?room_id=${roomId}&player_id=${playerId}`)
  }
  
  return (
    <div className='lobby'>
      <h4>Lobby</h4>
      <ul>
        {players !== null ? (
          players.map((player) => {
            return (
              <li key={player.player_id} >
                <h5>{player.name}</h5>
                <h5>{player.piece}</h5>
                <h5>${player.net_worth}</h5>
              </li>
            )
          })
        ) : ''}
      </ul>
      <button onClick={handleDone}>Done</button>
    </div>
  )
}

export default Lobby