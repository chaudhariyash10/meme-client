import './App.css';
import React from 'react';
import SwitchTabs from './SwitchTabs';
import Login from './Login';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className='background'>  
      <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path = "/memes"element={<SwitchTabs />} />        
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
