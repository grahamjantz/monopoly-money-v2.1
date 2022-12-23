import React from 'react'
import './InitializeApp.css'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore/lite'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addRoomId } from '../../AppSlice'
import { db } from '../../utils/firebase'


const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

const generateRoomId = () => {
    let id = ''
    const ranIndex = () => {
        return Math.floor(Math.random() * 26)
    }

    for (let i = 0; i < 4; i++) {
            id += letters[ranIndex()]
        }   
        return id
}

const InitializeApp = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleHostRoom = async () => {
        const roomId = generateRoomId()

        await setDoc(doc(db, 'rooms', roomId), {
            players: [],
            starting_amount: 1500,
            max_player_count: 8,
            room_id: roomId,
            free_parking: 0,
            timestamp: serverTimestamp()
        })  
        dispatch(addRoomId(roomId))
        navigate(`/starting-amount?room_id=${roomId}`)
    }

    const handleJoinRoom = async () => {
        navigate('/join-room')
    }

  return (
    <div className='initialize-app'>
        <h2>Welcome!</h2>
        <h4>This web app is designed to replace paper Monopoly money. Please follow the set up instructions to begin using the app.</h4>
        <button onClick={handleHostRoom}>Host Room</button>
        <button onClick={handleJoinRoom}>Join Room</button>
        <h5>For instructions please click <a href='https://github.com/grahamjantz/monopoly-money-v2.1' rel="noreferrer" target='_blank'>here</a></h5>
    </div>
  )
}

export default InitializeApp