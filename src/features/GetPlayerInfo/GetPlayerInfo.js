import React, { useEffect, useState } from 'react'

import './GetPlayerInfo.css'

import { arrayUnion, doc, updateDoc } from 'firebase/firestore/lite'
import { db } from '../../utils/firebase'
import { useNavigate, useSearchParams } from 'react-router-dom'

const GetPlayerInfo = () => {

  const navigate = useNavigate()
  
  const [name, setName] = useState('')
  const [piece, setPiece] = useState()
  const [options, setOptions] = useState([])
  const [startingAmount, setStartingAmount] = useState(1500)

  const [searchParams, setSearchParams] = useSearchParams()

  const roomId = searchParams.get('room_id')

  useEffect(() => {
    setOptions([
      {value: 'Racecar', text: 'Racecar'},
      {value: 'Top Hat', text: 'Top Hat'},
      {value: 'Dog', text: 'Dog'},
      {value: 'Thimble', text: 'Thimble'},
      {value: 'Boat', text: 'Boat'},
      {value: 'Shoe', text: 'Shoe'},
      {value: 'Iron', text: 'Iron'},
      {value: 'Wagon', text: 'Wagon'},
    ])
    setStartingAmount(1500)
  }, [])

  
  // const roomId = useSelector(selectRoomId)
  // useEffect(() => {
  //   const fetchOptions = async () => {
  //     const docRef = doc(db, 'rooms', roomId)
  //     const docSnap = await getDoc(docRef)
  
  //     if (docSnap.exists()) {
  //       // console.log(docSnap.data().piece_options)
  //       // setOptions(docSnap.data().piece_options)
  //       setStartingAmount(docSnap.data().starting_amount)
  //       setOptions([
  //         {value: 'Racecar', text: 'Racecar'},
  //         {value: 'Top Hat', text: 'Top Hat'},
  //         {value: 'Dog', text: 'Dog'},
  //         {value: 'Thimble', text: 'Thimble'},
  //         {value: 'Boat', text: 'Boat'},
  //         {value: 'Shoe', text: 'Shoe'},
  //         {value: 'Iron', text: 'Iron'},
  //         {value: 'Wagon', text: 'Wagon'},
  //       ])
  //     }
  //   }
    
  //   fetchOptions()
  // }, [roomId])

  const generatePlayerId = () => {
    let id;
    for (let i=0; i<8; i++) {
      id = Math.floor(Math.random() * 10000000).toString(26).toUpperCase()
    }
    return id
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (name !== '' && piece !== '' && piece !== '--Please Select Piece--') {
      const playerId = generatePlayerId()
      const docRef = doc(db, 'rooms', roomId)

      const data = {
        name: name,
        piece: piece,
        player_id: playerId,
        bank: startingAmount,
        property_value: 0,
        net_worth: startingAmount,
        active: true
      }

      await updateDoc(docRef, {
        'players': arrayUnion(data)
      })
      navigate(`/lobby?room_id=${roomId}&player_id=${playerId}`)
    }
  }

  return (
    <div className='get-player-names'>
      <h4>Enter Player Info:</h4>
      <form className='get-player-names-form' onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor='name'>Enter Name: </label>
        <input name='name' type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name}/>

        <label htmlFor='piece-select'>Select Piece</label>
        <select name='piece-select' onChange={(e) => setPiece(e.target.value)} value={piece}>
          <option defaultValue='defaultValue'>--Please Select Piece--</option>
          {options !== null ? (
            options.map((option) => {
              return (
                <option key={option.value}>{option.value}</option>
              )
            })
          ) : ''}
        </select>
        <input className='add-player-button' type='submit' value='Add Player'/>
      </form>
    </div>
  )
}

export default GetPlayerInfo