import './App.css';
import { useEffect, useState } from 'react';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [guestFName, setGuestFName] = useState([]);
  const [guestLName, setGuestLName] = useState([]);
  const [attending, setAttending] = useState(false);

  function createNewGuests() {
    setGuests([
      ...guests,
      {
        firstName: guestFName,
        lastName: guestLName,
        id: guests.length > 0 ? guests[guests.length - 1].id + 1 : 1,
        attending: attending,
      },
    ]);
  }

  return (
    <main className="App">
      <div>
        <h1>Welcmoe to the exclusive Guest List</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            createNewGuests();
          }}
        >
          <label> First name</label>
          <input
            value={guestFName}
            onChange={(event) => {
              setGuestFName(event.currentTarget.value);
            }}
          />
          <br />

          <label> Last name</label>
          <input
            value={guestLName}
            onChange={(event) => {
              setGuestLName(event.currentTarget.value);
            }}
          />
          <br />

          <label> Attending?</label>
          <input
            type="checkbox"
            checked={attending}
            onChange={(event) => {
              setAttending(event.currentTarget.checked);
            }}
          />
          <button
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                createNewGuests();
              }
            }}
          >
            Add guest
          </button>
        </form>
      </div>
      <div className="guestContainer">
        {guests.map((guest) => {
          return (
            <div key={`guest-${guest.id}`} className="guestBlock">
              <h2>
                {guest.firstName} {guest.lastName}
              </h2>

              <p>guest number: {guest.id}</p>
              <p>guest attending? {JSON.stringify(guest.attending)}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
