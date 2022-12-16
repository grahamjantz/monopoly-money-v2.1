import React, { useState } from 'react'

import './StartingAmount.css'

import { db } from '../../utils/firebase'
import { doc, updateDoc } from 'firebase/firestore/lite'
import { useNavigate, useSearchParams } from 'react-router-dom'

const StartingAmount = () => {

  const [startingAmount, setStartingAmount] = useState(1500)
  const [acceptPrice, setAcceptPrice] = useState(true)
  
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const roomId = searchParams.get('room_id')

  // const getStartingAmount = async () => {
  //   const docRef = doc(db, 'rooms', roomId)
  //   const docSnap = await getDoc(docRef)

  //   if (docSnap.exists()) {
  //     setStartingAmount(docSnap.data().starting_amount)
  //   }
  // }

  // useEffect(() => {
  //   getStartingAmount()
  // }, [])

  const handleYes = async () => {
    setAcceptPrice(true)
      
    const docRef = doc(db, 'rooms', roomId)
    await updateDoc(docRef, {
      starting_amount: startingAmount
    })
    navigate(`/get-player-info?room_id=${roomId}`)
  }

  const handleNo = () => {
    setAcceptPrice(false)
  }

  const handleChange = (e) => {
    setStartingAmount(Math.round(e.target.value))
  }

  return (
    <div className='starting-amount'>
      <h4>Room ID: {roomId}</h4>
      <h4>Starting Amount: ${startingAmount}</h4>
      <p>Accept?</p>
      <div>
        {!acceptPrice ? <input type='number' min='0' placeholder='1500' onChange={handleChange}/> : ''}
      </div>
      <div>
        <button onClick={handleYes}>Yes</button>
        <button onClick={handleNo}>No</button>
      </div>
      {
          startingAmount && startingAmount <= 0 ? <p>Invalid! Please enter positive number!</p> : ''
      }
      {
        startingAmount && startingAmount < 1000 ? <p>Invalid! Please enter at least $1000 for starting amount</p> : ''
      }
    </div>
  )
}

export default StartingAmount