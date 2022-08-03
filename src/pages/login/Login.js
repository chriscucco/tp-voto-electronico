import { Link } from 'react-router-dom';
import './Login.css'

function Login() {
  return (
    <div className='Login'>
      <header className='Login-header'>
        <form action="/login" method="post">
          <div className='Login-header'>
            <p>Ingresa usuario y contraseña para empezar</p>
            <label for="user_id"><b>Usuario</b></label>
            <input type="text" placeholder="Usuario" name="user_id" required/>
            <label for="password"><b>Contraseña</b></label>
            <input type="password" placeholder="Contraseña" name="password" required/>
            <button type="submit">Login</button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default Login;
