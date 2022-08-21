import './AddRoom.css';
import { Link, useSearchParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';

function AddRoom() {

  let [searchParams, setSearchParams] = useSearchParams();
  const [msg, setMsg] = useState();

  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status != 200) {
       window.location.href = '/login'
      }

      const data = await response.json()
      if (data.role != 'admin') {
        window.location.href = '/my_rooms'
      }

      let value = searchParams.get('retry')
      if (value != null && value == "true") {
        setMsg('Datos invalidos')
      }
    }
    init();
  }, []);
  return (
    <div className="AddRoom">
      <header className="AddRoom-header">
      <form action="/rooms" method="post">
          <div className='AddRoom-header'>
            <p className='AddRoom'>{msg}</p>
            <p>Ingresar fecha de inicio y fin del acto electoral</p>
            <label for="initDate"><b>Fecha y hora de inicio</b></label>
            <input type="text" placeholder="Inicio" name="initDate" required/>
            <label for="EndDate"><b>Fecha y hora de fin</b></label>
            <input type="text" placeholder="Fin" name="EndDate" required/>
            <button type="submit">Enviar</button>
            <a href='/admin' class='AddRoom-link'>Volver</a>
          </div>
        </form>      
      </header>
    </div>
  );
}

export default AddRoom;
