import './App.css';
import { useEffect, useState } from 'react';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [guestFName, setGuestFName] = useState([]);
  const [guestLName, setGuestLName] = useState([]);
  const [isAttending, setIsAttending] = useState(false);
  const [loading, setLoading] = useState(true);

  const baseUrl = 'http://localhost:4000';

  // POST Create users

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
    setGuests([...guests, createdGuest]);
  }

  // Show users GET
  useEffect(() => {
    async function fetchGuests() {
      const response = await fetch(`${baseUrl}/guests/`);
      const allGuests = await response.json();
      setGuests(allGuests);
      setLoading(false);
    }
    fetchGuests().catch((error) => {
      console.log(error);
    });
  }, []);

  // DELETE !!
  async function deleteGuestim(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    setGuests(guests.filter((guest) => guest.id !== id));
  }

  // Update API function
  async function updateGuests({ id }) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: isAttending }),
    });
    const updatedGuest = await response.json();
    setGuests([...guests, updatedGuest]);
  }

  // Create new guests in the UI
  function createNewGuests() {
    setGuests([
      ...guests,
      {
        firstName: guestFName,
        lastName: guestLName,
        id: guests.length > 0 ? guests[guests.length - 1].id + 1 : 1,
        isAttending: false,
      },
    ]);
  }

  async function handelSubmit(event) {
    event.preventDefault();
    await postGuests();
    setGuestLName('');
    setGuestFName('');
  }

  return (
    <main className="App">
      <div>
        <h1>Welcmoe to the fun Guest List</h1>
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

          <button id="create">Create User</button>
        </form>
      </div>

      <section>
        {loading ? (
          <div>
            <br />
            <br />
            <h1>Loading the Guest List...</h1>
          </div>
        ) : (
          <div className="guestContainer" data-test-id="guest">
            {guests.map((guest) => {
              return (
                <div key={`guest-${guest.id}`} className="guestBlock">
                  <h2>
                    {guest.firstName} {guest.lastName}
                  </h2>

                  <p>guest number: {guest.id}</p>
                  <label htmlFor="is_attending"> Attending?</label>
                  <input
                    id="is_attending"
                    aria-label="attending"
                    type="checkbox"
                    checked={guest.isAttending}
                    onChange={async (event) => {
                      setIsAttending(event.currentTarget.checked);
                      await updateGuests(event.currentTarget.checked);
                    }}
                  />
                  <button
                    className="delete"
                    onClick={() => deleteGuestim(guest.id)}
                  >
                    Delete guest
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
