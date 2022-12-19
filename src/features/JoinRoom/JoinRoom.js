import React, { useState } from 'react'

import './JoinRoom.css'

import { doc, getDoc } from 'firebase/firestore/lite'
import { db } from '../../utils/firebase'
import { useNavigate } from 'react-router'

const JoinRoom = () => {


  const navigate = useNavigate()

  const [roomCode, setRoomCode] = useState('')
  const [err, setErr] = useState(null)
  console.log(err)

  const fetchData = async () => {
    if (roomCode !== '') {
      const docRef = doc(db, 'rooms', roomCode.toUpperCase())
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        navigate(`/get-player-info?room_id=${roomCode.toUpperCase()}`)
        return docSnap.data()
      } else {
        setErr('err')
      }
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData()
  }

  const handleClickHome = () => {
    setErr(null)
    setRoomCode('')
    navigate('/')
  }

  return (
    <div className='join-room'>
    {err !== null ? (
      <div>
        <h5>Error! Invalid Room Code! Try Again!</h5>
        <button onClick={handleClickHome}>Home</button>
      </div>
    ) : (
          <form onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor='room-name'>Enter Room Code</label>
              <input name='room-name' type='text' onChange={(e) => setRoomCode(e.target.value)} value={roomCode}/>
  
              <input className='add-player-button' type='submit' value='Join'/>
          </form>
    )}
    </div>
  )
}

export default JoinRoom