import './App.css';
import { useEffect, useState } from 'react';

export default function App() {
  const [guestFName, setGuestFName] = useState([]);
  const [guestLName, setGuestLName] = useState([]);
  const [attending, setAttending] = useState(false);

  return (
    <div className="App">
      <h1>Welcmoe to the exclusive Guest List</h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <div>
          <label> First name</label>
          <input
            type="text"
            value={guestFName}
            onChange={(event) => setGuestFName(event.currentTarget.value)}
          />
          <hr />

          <label> Last name</label>
          <input
            type="text"
            value={guestLName}
            onChange={(event) => setGuestLName(event.currentTarget.value)}
          />
          <hr />

          <label> Attending?</label>
          <input
            type="checkbox"
            checked={attending}
            onChange={(event) => {
              setAttending(event.currentTarget.checked);
            }}
          />

          <button> Add guest</button>
          <button> Remove</button>
        </div>
      </form>
    </div>
  );
}
