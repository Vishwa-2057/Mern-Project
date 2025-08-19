import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import GamesList from './pages/GameList';
import UsersList from './pages/UserList';
import CreateGame from './pages/CreateGame';
import CreateUser from './pages/CreateUser';
import EditGame from './pages/EditGame';
import EditUser from './pages/EditUser';

function App() {
  return (
    <div className="App">
      <MenuBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/games-list" element={<GamesList />}></Route>
        <Route path="/create-game" element={<CreateGame />}></Route>
        <Route path="/users-list" element={<UsersList key={Date.now()}/>}></Route>
        <Route path="/create-user" element={<CreateUser />}></Route>
        <Route path="/update-game/:id" element={<EditGame />}></Route>
        <Route path="/edit-user/:id" element={<EditUser />}></Route>
      </Routes>
    </div>
  );
}

export default App;
