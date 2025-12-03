import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'
import SignUp_FoodPartner from '../pages/SignUp_FoodPartner'
import { Login_FoodPartner } from '../pages/Login_FoodPartner'
import Home from '../pages/general/Home'
import CreateFood from '../pages/food-partner/CreateFood'
import Profile from '../pages/food-partner/Profile'
import Save from '../pages/Save'

const AppRoutes = () => {
  
  return (
    <Router>
      <Routes>
        <Route path='/user/signup' element={ <SignUp />} />
        <Route path='/user/login' element={ <Login /> } />
        <Route path='/food-partner/signup' element={ <SignUp_FoodPartner /> } />
        <Route path='/food-partner/login' element={ <Login_FoodPartner /> } />
        <Route path='/' element={ <Home /> } />
        <Route path='/create-food' element={ <CreateFood /> } />
        <Route path="/food/partner/:id" element={<Profile />} />
        <Route path="/save" element={<Save />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes