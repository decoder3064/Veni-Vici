import { useState, useEffect } from 'react'
import './App.css'
import { randomArt } from './services/callApi.js'
import Banlist from './components/Banlist.jsx'

function App() {
  const [currentArt, setCurrentArt] = useState(null);
  const [bannedArt, setBannedArt] = useState([])
  const [bannedCulture, setBannedCulture] = useState([])
  const [bannedClass, setBannedClass] = useState([])

  useEffect(() => {
    fetchValidArt();
  }, [])

  const handleRemoveBan = (value, type) => {
  if (type === 'artist') {
    setBannedArt(bannedArt.filter(item => item !== value));
  } else if (type === 'culture') {
    setBannedCulture(bannedCulture.filter(item => item !== value));
  } else if (type === 'class') {
    setBannedClass(bannedClass.filter(item => item !== value));
  }
};

  const isValid = (data) => {
    const artist = data.people && data.people.length > 0 ? data.people[0].name : null;
    const culture = data.culture || null;
    const classification = data.classification || null;

    if (artist && bannedArt.includes(artist)) {
      return false
    }
    if (culture && bannedCulture.includes(culture)) {
      return false
    }
    if (classification && bannedClass.includes(classification)) {
      return false
    }
    return true
  }

  const fetchValidArt = async () => {
    let art = null;
    let attempts = 0;

    while (!art && attempts < 20) {
      const data = await randomArt();
      
      if (data && isValid(data)) {
        art = data;
      }
      attempts++;
    }

    if (art) {
      setCurrentArt(art)
    } else {
      alert("Too many filters! Try removing some from the ban list.")
    }
  }

  const handleShuffle = () => {
    fetchValidArt();
  };

  const handleBan = (value, type) => {
    if (type === 'artist') {
      setBannedArt([...bannedArt, value]);
    } else if (type === 'culture') {
      setBannedCulture([...bannedCulture, value]);
    } else if (type === 'class') {
      setBannedClass([...bannedClass, value]);
    }
  };

  return (
  <div className="app-container">
    <h1 className="app-header">Art Discovery</h1>

    <div className="banlist-container">
      <Banlist 
        bannedA={bannedArt}
        bannedC={bannedCulture}
        bannedCl={bannedClass}
        onRemoveBan={handleRemoveBan}  
      />
    </div>

    <div className="art-display">
      {currentArt ? (
        <div className="art-card">
          <h2 className="art-title">{currentArt.title}</h2>
          <img 
            className="art-image" 
            src={currentArt.primaryimageurl} 
            alt={currentArt.title} 
          />
          <div className="art-info">
            <p className="art-detail">
              <strong>Artist:</strong> {currentArt.people?.[0]?.name || "Unknown"}
            </p>
            <p className="art-detail">
              <strong>Culture:</strong> {currentArt.culture || "Unknown"}
            </p>
            <p className="art-detail">
              <strong>Classification:</strong> {currentArt.classification || "Unknown"}
            </p>
          </div>

          <div className="ban-buttons">
            <button 
              className="btn ban-btn" 
              onClick={() => handleBan(currentArt.people?.[0]?.name, 'artist')}
            >
              Ban Artist
            </button>
            <button 
              className="btn ban-btn" 
              onClick={() => handleBan(currentArt.culture, 'culture')}
            >
              Ban Culture
            </button>
            <button 
              className="btn ban-btn" 
              onClick={() => handleBan(currentArt.classification, 'class')}
            >
              Ban Classification
            </button>
          </div>
        </div>
      ) : (
        <div className="loading">Loading artwork...</div>
      )}

      <button className="btn shuffle-btn" onClick={handleShuffle}>
        🔀 Shuffle
      </button>
    </div>
  </div>
  )
}

export default App
