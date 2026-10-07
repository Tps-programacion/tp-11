import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from '../context/UserContext';
import { GameProvider } from '../context/GameContext';

import Home from '../views/home/Home';
import GameBoard from '../views/gameBoard/GameBoard';

export default function App() {
  return (
    <UserProvider>
      <GameProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/play" element={<GameBoard />} />
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </UserProvider>
  );
}