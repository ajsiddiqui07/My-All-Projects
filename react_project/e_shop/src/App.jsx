import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { Route, Routes } from 'react-router-dom'
import Admin from './Components/Admin/Admin'
import Landing_page from './Components/Landing_page/Landig_page'
import User from './Components/User/Userlogin'
import Navbar from './Components/Templates/Navbar'
import AdminLogin from './Components/Admin/AdminLogin'
import UserRegister from './Components/User/Userregister'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/AdminLogin' element={<AdminLogin/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/' element={<Landing_page/>}></Route>
        <Route path='/user' element={<User/>}></Route>
        <Route path='/userregister' element={<UserRegister/>}></Route>
      </Routes>
    </>
  )
}

export default App
