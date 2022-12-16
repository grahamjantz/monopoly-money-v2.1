import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { getFirestore, query, where, onSnapshot, doc, updateDoc, collection, increment } from "firebase/firestore";
import { app } from '../../utils/firebase';

import './PlayerCard.css'

import Tax from '../Tax/Tax.js'

const db = getFirestore(app)

const PlayerCard = () => {

  const [players, setPlayers] = useState(null)
  const [playersListSorted, setPlayersListSorted] = useState(null)
  const [displayAction, setDisplayAction] = useState(false)
  const [currentAction, setCurrentAction] = useState('')
  const [amount, setAmount] = useState('')
  const [freeParking, setFreeParking] = useState(0)

  const [searchParams, setSearchParams] = useSearchParams()
  const roomId = searchParams.get('room_id')
  const playerId = searchParams.get('player_id')

  useEffect(() => {
    const q = query(collection(db, "rooms"), where("room_id", "==", roomId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const players = [];
      querySnapshot.forEach((doc) => {
          players.push(doc.data().players);
          setFreeParking(doc.data().free_parking)
      });
      setPlayers(players)
      const sort = players[0].sort((a,b) => b.net_worth - a.net_worth).sort((a, b) => b.active - a.active)
      setPlayersListSorted(sort)
    });
    return () => {
      unsubscribe()
    }
  }, [roomId])


  const handleClickGo = async () => {
    //players[0] is the players array stored in state pulled from db. This function iterates over that array, and if the player.player_id equals the playerId which is pulled from the url that players bank and net worth increase buy 200. This updated Array is then sent to the db overwriting the preivous players array with the new data which then gets updated in the fetchData() function above which updates the UI accordingly. Follow this paradigm for all transactions: 1. grab data from db 2. updated data in front end 3. send updated data to db
    players[0].map((player) => {
      if (player.player_id === playerId) {
        player.bank += 200
        player.net_worth += 200
        return player
      }
      return player
    })
    updatePlayersArray()
  }
  
  
  const handleClickTax = () => {
    displayAction === false ? setDisplayAction(true) : setDisplayAction(false)
    currentAction === '' ? setCurrentAction('Tax') : setCurrentAction('')
  }
  
  const handlePayTax = async (e) => {
    e.preventDefault()
    
    playersListSorted.map((player) => {
      if (player.player_id === playerId) {
        player.bank -= amount
        player.net_worth -= amount
        return player
      }
      return player
    })
    updateFreeParking()
    updatePlayersArray()
    resetStates()
  }

  const handleTogglePayout = () => {
    console.log(freeParking)
    playersListSorted.map((player) => {
      if (player.player_id === playerId) {
        player.bank += freeParking
        player.net_worth += freeParking
        return player
      }
      return player
    })
    setFreeParking(0)
    updatePlayersArray()
    updateFreeParking()
  }

  
  const resetStates = () => {
    setAmount('')
    setDisplayAction(false)
    setCurrentAction('')
  }
  
  const updatePlayersArray = async () => {
    const docRef = doc(db, 'rooms', roomId)
    
    await updateDoc(docRef, {
      'players': playersListSorted,
    })
  }

  const updateFreeParking = async () => {
    const docRef = doc(db, 'rooms', roomId)
    
    if (freeParking !== 0) {
      await updateDoc(docRef, {
        'free_parking': increment(amount)
      })
    } else {
      await updateDoc(docRef, {
        'free_parking': freeParking
      })
    }
  }

  const displayActionButton = (action) => {
    if (action === 'Tax') {
      return <Tax setAmount={setAmount} amount={amount} handlePayTax={handlePayTax}/>
    } else if (action === 'Rent') {
      // return <Rent setDisplayAction={setDisplayAction}/>
    } else if (action === 'Buy') {
      // return <Buy setDisplayAction={setDisplayAction}/>
    } else if (action === 'Sell') {
      // return <Sell setDisplayAction={setDisplayAction}/>
    } else if (action === 'Trade') {
      // return <Trade setDisplayAction={setDisplayAction}/>
    } else if (action === '') {
      return ''
    }
  }
  
  return (
    <div className='player-card'>
        {
          players !== null ? (
            <div className='leaderboard'>
              <h2>Leaderboard</h2>
              <ol>
                {playersListSorted.map((player) => {
                  return (
                    <li key={player.player_id}>
                      <h3>{player.name}</h3>
                      <h3>{player.net_worth}</h3>
                    </li>
                  )
                })}
              </ol>
            </div>
          ) : <p>loading...</p>
        }
{/**************** FREE PARKING DISPLAY ****************/}
        <div className='free-parking-display'>
          <div className='free-parking-sub-display'>
            <h3>Free Parking:</h3>
            <h3>${freeParking}</h3>
          </div>
            <button onClick={handleTogglePayout}>Pay Out</button>
        </div>

{/**************** FREE PARKING PAYOUT DISPLAY ****************/}
          {/* <div className={`free-parking-pay-out-display ${displayPayOut === true ? 'pay-out-active' : 'pay-out-inactive'}`}>
            <h3>Select player to receive payout:</h3>
            {players !== null ? (
              players[0].map((player) => {
                return (
                  <button key={player.player_id} onClick={handlePayOut}>
                    {player.name}
                  </button>
                )
              })
            ) : ''
            }
        </div> */}
        {playersListSorted !== null ? (
          playersListSorted.map((player) => {
            if (player.player_id === playerId) {
              return (
                <div key={player.player_id}className={`player-info ${player.net_worth <= 0 ? 'lost' : ''}`}>
                  <h3>{player.name}</h3>
                  <div className='player-stats'>
                    <h4>Bank: <br/>${player.bank}</h4>
                    <h4>Property Value: <br/> ${player.property_value}</h4>
                    <h4>Net Worth: <br/>${player.net_worth}</h4>
                  </div>
                  <div className='actions'>
                    <div className='action-buttons'>
                      <button className='go-button' onClick={handleClickGo}>GO</button>
                      <button className='tax-button' onClick={handleClickTax}>TAX</button>
                    </div>
                    {/* TAX ACTION */}
                    <div className={`${displayAction === true ? 'display-action-true' : 'display-action-false'}`}>
                      {currentAction === 'Tax' ? displayActionButton('Tax') : ''}
                    </div>
                    <div className='action-buttons'>
                      <button>RENT</button>
                      <button>BUY</button>
                    </div>
                    <div className='action-buttons'>
                      <button>SELL</button>
                      <button>TRADE</button>
                    </div>
                  </div>
                </div>
              )
            }
            return ''
          })
        ) : ''}
    </div>
  )
}

export default PlayerCard