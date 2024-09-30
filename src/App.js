import './App.css';
import { useEffect, useState } from 'react';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [guestFName, setGuestFName] = useState([]);
  const [guestLName, setGuestLName] = useState([]);

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
        attending: false,
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

      setTimeout(() => {
        setLoading(false);
        setGuests(allGuests);
      }, '2000');
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
    setGuests(
      guests.filter((guest) => guest.id !== id),
      deletedGuest,
    );
  }

  // Update API function
  async function updateGuests(id, newAttendingStat) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: newAttendingStat }),
    });
    const updatedGuest = await response.json();
    // FIX THIS CODE!!
    setGuests(
      guests.map((guest) =>
        guest.id === id
          ? { ...guest, attending: updatedGuest.attending }
          : guest,
      ),
    );
  }

  // Create new guests in the UI
  /*  function createNewGuests() {
    setGuests([
      ...guests,
      {
        firstName: guestFName,
        lastName: guestLName,
        id: guests.length > 0 ? guests[guests.length - 1].id + 1 : 1,
        attending: false,
      },
    ]);
  } */

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
            required
            value={guestFName}
            onChange={(event) => {
              setGuestFName(event.currentTarget.value);
            }}
          />
          <br />

          <label htmlFor="last_name"> Last name</label>
          <input
            id="last_name"
            required
            value={guestLName}
            onChange={(event) => {
              setGuestLName(event.currentTarget.value);
            }}
            onKeyDown={async (e) => {
              if (e.key === 'Enter') {
                await handelSubmit(e);
              }
            }}
          />
          <br />
        </form>
      </div>

      <section className="loading-section">
        {loading ? (
          <div>
            <br />
            <br />
            <h1>Loading...</h1>
            <div className="loader" />
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
                    checked={guest.attending}
                    onChange={async (event) => {
                      await updateGuests(guest.id, event.currentTarget.checked);
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
