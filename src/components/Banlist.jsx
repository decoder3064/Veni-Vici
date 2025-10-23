import React from 'react';

const Banlist = (props) => {
  const { bannedA, bannedC, bannedCl, onRemoveBan } = props;

  return (
    <div className="banlist">
      <h2>Ban List</h2>
      
      <div className="ban-section">
        <h3>Banned Artists</h3>
        {bannedA.length === 0 ? (
          <p>None</p>
        ) : (
          <ul>
            {bannedA.map((item, index) => (
              <li key={index}>
                {item}
                <button onClick={() => onRemoveBan(item, 'artist')}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="ban-section">
        <h3>Banned Cultures</h3>
        {bannedC.length === 0 ? (
          <p>None</p>
        ) : (
          <ul>
            {bannedC.map((item, index) => (
              <li key={index}>
                {item}
                <button onClick={() => onRemoveBan(item, 'culture')}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="ban-section">
        <h3>Banned Classifications</h3>
        {bannedCl.length === 0 ? (
          <p>None</p>
        ) : (
          <ul>
            {bannedCl.map((item, index) => (
              <li key={index}>
                {item}
                <button onClick={() => onRemoveBan(item, 'class')}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Banlist;