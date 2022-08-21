import './AddAdmin.css';
import { Link, useSearchParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';

function AddAdmin() {

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
        setMsg('Usuario invalido')
      }
    }
    init();
  }, []);
  return (
    <div className="AddAdmin">
      <header className="AddAdmin-header">
      <form action="/roles/add" method="post">
          <div className='AddAdmin-header'>
            <p className='AddAdminAlert'>{msg}</p>
            <p>Ingresar nombre de usuario o DNI del usuario a agregar como administrador</p>
            <label for="userInput"><b>Usuario o DNI</b></label>
            <input type="text" placeholder="Usuario o DNI" name="userInput" required/>
            <button type="submit">Enviar</button>
            <a href='/admin' class='AddAdmin-link'>Volver</a>
          </div>
        </form>      
      </header>
    </div>
  );
}

export default AddAdmin;
