import {  useEffect } from 'react';

function MyRooms() {
  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status !== 200) {
       window.location.href = '/login'
      }

      const rooms = await fetch('/my_rooms/rooms')
      if (rooms.status !== 200) {
        window.location.href = '/home'
      }
      
      const processedRoom = await rooms.json()
      console.log(rooms)
      console.log(processedRoom)

      // await fetchRoom(1)


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
    <div>
        <p style={{ color: 'black', margin: 'auto'}}>
          Not Implemented
        </p>
    </div>
  );
}

export default MyRooms;
