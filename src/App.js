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

  function deleteGuests() {
    const newGuests = [...guests];
    newGuests.pop();
    setGuests(newGuests);
  }
  //console.log(guests);

  return (
    <main className="App">
      <div>
        <h1>Welcmoe to the exclusive Guest List</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setGuestLName('');
            setGuestFName('');
          }}
        >
          <label htmlFor="first_name"> First name</label>
          <input
            id="first_name"
            value={guestFName}
            onChange={(event) => {
              setGuestFName(event.currentTarget.value);
              event.currentTarget.value = '';
            }}
          />
          <br />

          <label htmlFor="last_name"> Last name</label>
          <input
            id="last_name"
            value={guestLName}
            onChange={(event) => {
              setGuestLName(event.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') createNewGuests();
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
          <button>Add guest</button>
          <button onClick={deleteGuests}>Delete the last guest</button>
        </form>
      </div>
      <div className="guestContainer" data-test-id="guest">
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
