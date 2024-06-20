import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import MyComponent from './components/HomePage.jsx';
import LoginPage from './components/LoginPage.jsx';
import CreateAccountPage from './components/CreateAccountPage.jsx';
import VerifyPage from './components/VerifyPage.jsx';
import AddPeople from './components/AddPeople.jsx';
function App() {

  return (
    <>
    <Routes>
        <Route path="/" element={<CreateAccountPage/>} />
        <Route path="/verify" element={<VerifyPage/>} />
        <Route path="/login" element={<LoginPage/>} />
    </Routes>
    </>
  )
}

export default App
