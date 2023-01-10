import React from 'react';
import { Route, Routes } from 'react-router';

import './App.css';
import GetPlayerInfo from './features/GetPlayerInfo/GetPlayerInfo';
import InitializeApp from './features/InitializeApp/InitializeApp';
import JoinRoom from './features/JoinRoom/JoinRoom';
import Lobby from './features/Lobby/Lobby';
import PlayerCard from './features/PlayerCard/PlayerCard';
import StartingAmount from './features/StartingAmount/StartingAmount';
import Header from './features/Header/Header'
import Footer from './features/Footer/Footer'
import EndGame from './features/EndGame/EndGame';

function App() {
  return (
    <div>
      <Header />
      <div className="App">
        <Routes>
          <Route path='/' element={<InitializeApp />}></Route>
          <Route path='/starting-amount' element={<StartingAmount />}></Route>
          <Route path='/join-room' element={<JoinRoom />}></Route>
          <Route path='/get-player-info' element={<GetPlayerInfo />}></Route>
          <Route path='/lobby' element={<Lobby />}></Route>
          <Route path='/player-card' element={<PlayerCard />}></Route>
          <Route path='/end-game' element={<EndGame />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
