import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import { randomArt } from './services/callApi.js'
import Banlist from './components/Banlist.jsx'


function App() {
    const [bannedArt,addBannedA] = useState([])
    const [bannedCulture,addBannedC] = useState([])
    const [bannedClass,addBannedCl] = useState([])
 
  useEffect(() => {
    const data = randomArt()

    if data.artist. 


  }, [])


  return (
    <>
      
      <Banlist 
        bannedA={bannedArt}
        bannedC={bannedCulture}
        bannedCl={bannedClass}
      ></Banlist>
      <button></button>//artist 
      <button></button>//culture
      <button></button>//class
      
      <button onClick={useEffect}>Shuffle</button>
    
    </>
  )
}

export default App
