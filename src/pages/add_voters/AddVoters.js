import './AddVoters.css';
import { Link, useSearchParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';

function AddVoters() {

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
        let retryMessage = searchParams.get('msg')
        setMsg('Error: ' + retryMessage)
      }
    }
    init();
  }, []);
  return (
    <div className="AddVoters">
      <header className="AddVoters-header">
      <form action="/voters/add" method="post">
          <div className='AddVoters-header'>
            <p className='AddVotersAlert'>{msg}</p>
            <p>Ingresar DNI de los votantes a agregar separados por coma</p>
            <label for="voters"><b>Votantes</b></label>
            <input type="text" placeholder="Ej: 40128001,18995293..." name="voters" required/>
            <label for="room_id"><b>Numero de acto electoral</b></label>
            <input type="text" placeholder="Acto electoral" name="room_id" required/>
            <button type="submit">Enviar</button>
            <a href='/admin' class='AddVoters-link'>Volver</a>
          </div>
        </form>      
      </header>
    </div>
  );
}

export default AddVoters;
