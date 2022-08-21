import './MyRooms.css';
import {  useEffect } from 'react';

function MyRooms() {
  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status != 200) {
       window.location.href = '/login'
      }
    }
    init();
  }, []);
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
