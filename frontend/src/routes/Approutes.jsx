import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import Project from '../screens/Project'
const Approutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/project' element={<Project/>}></Route>

    </Routes>
    </BrowserRouter>
  )
}

export default Approutes