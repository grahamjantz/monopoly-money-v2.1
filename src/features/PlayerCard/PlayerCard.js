import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { getFirestore, query, where, onSnapshot, doc, updateDoc, collection, deleteDoc } from "firebase/firestore";
import { app } from '../../utils/firebase';

import './PlayerCard.css'

import Tax from '../Tax/Tax.js'
import Rent from '../Rent/Rent.js'
import Buy from '../Buy/Buy.js'
import Sell from '../Sell/Sell.js'
import Trade from '../Trade/Trade.js'
import Bonus from '../Bonus/Bonus.js';

export const db = getFirestore(app)

const PlayerCard = () => {

  const navigate = useNavigate()

  const [players, setPlayers] = useState(null)
  const [playersListSorted, setPlayersListSorted] = useState(null)
  const [displayAction, setDisplayAction] = useState(false)
  const [currentAction, setCurrentAction] = useState('')
  const [freeParking, setFreeParking] = useState(0)
  const [displayEndGame, setDisplayEndGame] = useState(false)

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
  
  
  const handleClickBonus = () => {
    displayAction === false ? setDisplayAction(true) : setDisplayAction(false)
    currentAction === '' ? setCurrentAction('Bonus') : setCurrentAction('')
  }

  const handleClickTax = () => {
    displayAction === false ? setDisplayAction(true) : setDisplayAction(false)
    currentAction === '' ? setCurrentAction('Tax') : setCurrentAction('')
  }
  
  
    
    const handleTogglePayout = async () => {
      playersListSorted.map((player) => {
        if (player.player_id === playerId) {
          player.bank += freeParking
          player.net_worth += freeParking
          return player
        }
        return player
      })
      updatePlayersArray()
      const docRef = doc(db, 'rooms', roomId)
      
      await updateDoc(docRef, {
        'free_parking': 0
      })
    }
    
  const handleClickRent = async () => {
    displayAction === false ? setDisplayAction(true) : setDisplayAction(false)
    currentAction === '' ? setCurrentAction('Rent') : setCurrentAction('')
  }
  
  const handleClickBuy = async () => {
    displayAction === false ? setDisplayAction(true) : setDisplayAction(false)
    currentAction === '' ? setCurrentAction('Buy') : setCurrentAction('')
  }

  const handleClickSell = () => {
    displayAction === false ? setDisplayAction(true) : setDisplayAction(false)
    currentAction === '' ? setCurrentAction('Sell') : setCurrentAction('')
  }

  const handleClickTrade = () => {
    displayAction === false ? setDisplayAction(true) : setDisplayAction(false)
    currentAction === '' ? setCurrentAction('Trade') : setCurrentAction('')
  }

  const handleClickEndGame = async () => {
    displayEndGame === false ? setDisplayEndGame(true) : setDisplayEndGame(false)
  }

  const handleEndGameYes = async () => {
    navigate(`/end-game?room_id=${roomId}`)
  }
  
  const resetStates = () => {
    setDisplayAction(false)
    setCurrentAction('')
  }
  
  const updatePlayersArray = async () => {
    const docRef = doc(db, 'rooms', roomId)
    
    await updateDoc(docRef, {
      'players': playersListSorted,
    })
  }

  const displayActionButton = (action) => {
    if (action === '') {
      return ''
    } else if (action === 'Tax') {
      return <Tax players={players} playerId={playerId} roomId={roomId} resetStates={resetStates}/>
    } else if (action === 'Rent') {
      return <Rent players={players} playerId={playerId} roomId={roomId} resetStates={resetStates}/>
    } else if (action === 'Buy') {
      return <Buy players={players} playerId={playerId} roomId={roomId} resetStates={resetStates}/>
    } else if (action === 'Sell') {
      return <Sell players={players} playerId={playerId} roomId={roomId} resetStates={resetStates}/>
    } else if (action === 'Trade') {
      return <Trade players={players} playerId={playerId} roomId={roomId} resetStates={resetStates}/>
    } else if (action === 'Bonus') {
      return <Bonus players={players} playerId={playerId} roomId={roomId} resetStates={resetStates}/>
    } 
  }
  
  return (
    <div className='player-card'>
{/**************** LEADERBOARD ****************/}
        {
          players !== null ? (
            <div className='leaderboard'>
              <h2>Leaderboard</h2>
              <ol>
                {playersListSorted.map((player) => {
                  return (
                    <li key={player.player_id} className={player.active === false ? 'lost' : ''}>
                      <h3>{player.name}</h3>
                      <h3>${player.net_worth}</h3>
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
            <button onClick={handleTogglePayout}>CLAIM</button>
        </div>

{/**************** PLAYER CARD DISPLAY ****************/}
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

{/**************** ACTION BUTTONS ROW 1 ****************/}
                  <div className='actions'>
                    <div className='action-buttons'>
                      <button className='go-button' onClick={handleClickGo}>PASS GO</button>
                    </div>
                    <div className='action-buttons'>
                      <button onClick={handleClickBonus}>BONUS</button>
                      <button className='tax-button' onClick={handleClickTax}>TAX</button>
                    </div>
                    {/* BONUS ACTION */}
                    <div className={`${displayAction === true ? 'display-action-true' : 'display-action-false'}`}>
                      {currentAction === 'Bonus' ? displayActionButton('Bonus') : ''}
                    </div>
                    {/* TAX ACTION */}
                    <div className={`${displayAction === true ? 'display-action-true' : 'display-action-false'}`}>
                      {currentAction === 'Tax' ? displayActionButton('Tax') : ''}
                    </div>

{/**************** ACTION BUTTONS ROW 2 ****************/}
                    <div className='action-buttons'>
                      <button onClick={handleClickRent}>RENT</button>
                      <button onClick={handleClickBuy}>BUY</button>
                    </div>
                    {/* RENT ACTION */}
                    <div className={`${displayAction === true ? 'display-action-true' : 'display-action-false'}`}>
                      {currentAction === 'Rent' ? displayActionButton('Rent') : ''}
                    </div>
                    {/* BUY ACTION */}
                    <div className={`${displayAction === true ? 'display-action-true' : 'display-action-false'}`}>
                      {currentAction === 'Buy' ? displayActionButton('Buy') : ''}
                    </div>

{/**************** ACTION BUTTONS ROW 3 ****************/}
                    <div className='action-buttons'>
                      <button onClick={handleClickSell}>SELL</button>
                      <button onClick={handleClickTrade}>TRADE</button>
                    </div>

                    {/* SELL ACTION */}
                    <div className={`${displayAction === true ? 'display-action-true' : 'display-action-false'}`}>
                      {currentAction === 'Sell' ? displayActionButton('Sell') : ''}
                    </div>
                    {/* TRADE ACTION */}
                    <div className={`${displayAction === true ? 'display-action-true' : 'display-action-false'}`}>
                      {currentAction === 'Trade' ? displayActionButton('Trade') : ''}
                    </div>
                  </div>
                </div>
              )
            }
            return ''
          })
        ) : ''}
        <div>
          <button className='end-button' onClick={handleClickEndGame}>END GAME</button>
          {
            displayEndGame === false ? '' : (
              <div>
                <p>Are you sure?</p>
                <button onClick={handleEndGameYes}>YES</button>
                <button onClick={() => setDisplayEndGame(false)}>NO</button>
              </div>
            )
          }
        </div>
    </div>
  )
}

export default PlayerCard