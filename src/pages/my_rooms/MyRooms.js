import './MyRooms.css';
import {  useEffect } from 'react';

function MyRooms() {
  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status != 200) {
       window.location.href = '/login'
      }

      await fetchRoom(1)
    }
    init();
  }, []);
  
  const fetchRoom = async (roomId) => {
    console.log("Fetching room")
    const response = await fetch(`http://localhost:8001/rooms/${roomId}`);
    const room = await response.json()
    console.log(room);
  }

  return (
    <div className="MyRooms">
      <header className="MyRooms-header">
        <p>
          Not Implemented
        </p>
      </header>
    </div>
  );
}

export default MyRooms;
