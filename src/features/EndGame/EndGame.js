import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { app } from '../../utils/firebase'
import './EndGame.css'
import { doc, getDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(app)

const EndGame = () => {

    const [players, setPlayers] = useState([])

    const [searchParams, setSearchParams] = useSearchParams()
    const roomId = searchParams.get('room_id')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchQuery = async () => {
            const docRef = doc(db, "rooms", roomId);
            const docSnap = await getDoc(docRef);
        
            if (docSnap.exists()) {
                const sort = docSnap.data().players.sort((a,b) => b.net_worth - a.net_worth).sort((a, b) => b.active - a.active)
                setPlayers(sort)
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }
        }
        fetchQuery()
    }, [roomId])

    // useEffect(() => {
    //     const fetchQuery =() => {
    //         const q = query(collection(db, "rooms"), where("room_id", "==", roomId));
    //         const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         const players = [];
    //         querySnapshot.forEach((doc) => {
    //             console.log(doc.data())
    //             // players.push(doc.data().players);
    //         });
    //         // setPlayers(players)
    //         // const sort = players[0].sort((a,b) => b.net_worth - a.net_worth).sort((a, b) => b.active - a.active)
    //         });
    //     }
    //     fetchQuery()
    // }, [roomId])

    const handleClickHome = () => {
        navigate('/')
    }

    console.log(players)

  return (
    <div className='end-game'>
        {players[0] ? (
            <h2>Winner: {players[0].name}</h2>
        ) : ''}
        <ul>
            {players !== [] ? (
                players.map((player) => {
                    return (
                        <li key={player.player_id}>
                            <h3>{player.name}</h3>
                            <h4>${player.net_worth}</h4>
                        </li>
                    )
                })
            ) : ''}
        </ul>
        <button onClick={handleClickHome}>Return to home</button>
    </div>
  )
}

export default EndGame