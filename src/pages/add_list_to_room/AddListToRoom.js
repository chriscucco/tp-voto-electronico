import './AddListToRoom.css';
import { useSearchParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';

function AddListToRoom() {

  let [searchParams, setSearchParams] = useSearchParams();
  const [msg, setMsg] = useState();

  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status !== 200) {
       window.location.href = '/login'
      }

      const data = await response.json()
      if (data.role !== 'admin') {
        window.location.href = '/my_rooms'
      }

      let value = searchParams.get('retry')
      if (value != null && value === "true") {
        let retryMessage = searchParams.get('msg')
        setMsg('Error: ' + retryMessage)
      }
    }
    init();
  }, [searchParams]);
  return (
    <div className="AddListToRoom">
      <header className="AddListToRoom-header">
      <form action="/roomLists/add" method="post">
          <div className='AddListToRoom-header'>
            <p className='AddListToRoomAlert'>{msg}</p>
            <p>Ingresar los numeros de lista separados por coma</p>
            <label for="list_id"><b>Votantes</b></label>
            <input type="text" placeholder="Ej: 2,3,4..." name="list_id" required/>
            <label for="room_id"><b>Numero de acto electoral</b></label>
            <input type="text" placeholder="Acto electoral" name="room_id" required/>
            <button type="submit">Enviar</button>
            <a href='/admin' class='AddListToRoom-link'>Volver</a>
          </div>
        </form>      
      </header>
    </div>
  );
}

export default AddListToRoom;
