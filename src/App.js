import './App.css';
import { useEffect, useState } from 'react';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [guestFName, setGuestFName] = useState([]);
  const [guestLName, setGuestLName] = useState([]);
  const [isAttending, setIsAttending] = useState(false);

  const baseUrl = 'http://localhost:4000';

  async function postGuests() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: guestFName,
        lastName: guestLName,
        attending: isAttending,
      }),
    }).catch((error) => {
      console.log(error);
    });
    const createdGuest = await response.json();
    console.log(createdGuest);
  }

  useEffect(() => {
    async function fetchGuests() {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      setGuests(allGuests);
    }
    fetchGuests().catch((error) => {
      console.log(error);
    });
  }, []);

  async function deleteGuestim() {
    const response = await fetch(`${baseUrl}/guests/24`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
  }

  function createNewGuests() {
    setGuests([
      ...guests,
      {
        firstName: guestFName,
        lastName: guestLName,
        id: guests.length > 0 ? guests[guests.length - 1].id + 1 : 1,
        isAttending: isAttending,
      },
    ]);
  }

  function deleteGuests() {
    const newGuests = [...guests];
    newGuests.pop();
    setGuests(newGuests);
  }

  async function handelSubmit(event) {
    event.preventDefault();
    await postGuests();
    setGuestLName('');
    setGuestFName('');
    setIsAttending(false);
  }

  return (
    <main className="App">
      <div>
        <h1>Welcmoe to the exclusive Guest List</h1>
        <h4>Enter a guest name and press Enter on the last input field</h4>
        <form onSubmit={handelSubmit}>
          <label htmlFor="first_name"> First name</label>
          <input
            id="first_name"
            value={guestFName}
            onChange={(event) => {
              setGuestFName(event.currentTarget.value);
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
              if (e.key === 'Enter') {
                createNewGuests();
              }
            }}
          />
          <br />

          <label htmlFor="is_attending"> Attending?</label>
          <input
            id="is_attending"
            aria-label="attending "
            type="checkbox"
            checked={isAttending}
            onChange={(event) => {
              setIsAttending(event.currentTarget.checked);
            }}
          />
          <button>Create User</button>
        </form>
        <button onClick={deleteGuests}>Delete the last guest</button>
      </div>
      <div className="guestContainer" data-test-id="guest">
        {guests.map((guest) => {
          return (
            <div key={`guest-${guest.id}`} className="guestBlock">
              <h2>
                {guest.firstName} {guest.lastName}
              </h2>

              <p>guest number: {guest.id}</p>
              <p>guest attending? {JSON.stringify(guest.isAttending)}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
