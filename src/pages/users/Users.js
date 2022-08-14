import { Link, useSearchParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';
import './Users.css'

function Users() {
    let [searchParams, setSearchParams] = useSearchParams();

  const [msg, setMsg] = useState();

  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status == 200) {
       window.location.href = '/'
      }
      let value = searchParams.get('retry')
      if (value != null && value == "true") {
        setMsg('Error en los datos ingresados')
      }
    }
    init();
  }, []);

  return (
    <div className='Users'>
      <header className='Users-header'>
        <form action="/users" method="post">
          <div className='Users-header'>
            <p className='UsersAlert'>{msg}</p>
            <p>Ingresa tus datos para registrarte</p>
            <label for="user_id"><b>Usuario</b></label>
            <input type="text" placeholder="Usuario" name="user_id" required/>
            <label for="dni"><b>Numero de DNI</b></label>
            <input type="text" placeholder="DNI" name="dni" required/>
            <label for="name"><b>Nombre</b></label>
            <input type="text" placeholder="Nombre" name="name" required/>
            <label for="last_name"><b>Apellido</b></label>
            <input type="text" placeholder="Apellido" name="last_name" required/>
            <label for="password"><b>Contraseña</b></label>
            <input type="password" placeholder="Contraseña" name="password" required/>
            <button type="submit">Crear Cuenta</button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default Users