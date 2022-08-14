import { Link, useSearchParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';
import './Login.css'

function Login() {
  let [searchParams, setSearchParams] = useSearchParams();

  const [msg, setMsg] = useState();

  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status == 200) {
       window.location.href = '/home'
      }
      let value = searchParams.get('retry')
      if (value != null && value == "true") {
        setMsg('Usuario o contraseña invalido')
      }
    }
    init();
  }, []);

  return (
    <div className='Login'>
      <header className='Login-header'>
        <form action="/login" method="post">
          <div className='Login-header'>
            <p className='LoginAlert'>{msg}</p>
            <p>Ingresa usuario y contraseña para empezar</p>
            <label for="user_id"><b>Usuario</b></label>
            <input type="text" placeholder="Usuario" name="user_id" required/>
            <label for="password"><b>Contraseña</b></label>
            <input type="password" placeholder="Contraseña" name="password" required/>
            <button type="submit">Ingresar</button>
            <a href='/users' class='Login-link'>Crear cuenta</a>
          </div>
        </form>
      </header>
    </div>
  );
}

export default Login;
