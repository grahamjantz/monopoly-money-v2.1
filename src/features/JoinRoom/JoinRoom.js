import React, { useState } from 'react'

import './JoinRoom.css'

import { doc, getDoc } from 'firebase/firestore/lite'
import { db } from '../../utils/firebase'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { addRoomId } from '../../AppSlice'

const JoinRoom = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [roomCode, setRoomCode] = useState('')

  const fetchData = async () => {
    if (roomCode !== '') {
      const docRef = doc(db, 'rooms', roomCode.toUpperCase())
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        dispatch(addRoomId(roomCode.toUpperCase()))
        return docSnap.data()
      }
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData()
    navigate(`/get-player-info?room_id=${roomCode.toUpperCase()}`)
  }

  return (
    <div className='join-room'>
        <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor='room-name'>Enter Room Code</label>
            <input name='room-name' type='text' onChange={(e) => setRoomCode(e.target.value)} value={roomCode}/>

            <input className='add-player-button' type='submit' value='Join'/>
        </form>
    </div>
  )
}

export default JoinRoom