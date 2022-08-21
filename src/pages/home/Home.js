import './Home.css';
import {  useEffect } from 'react';

function Home() {
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
    }
    init();
  }, []);
  return (
    <div className="Home">
      <header className="Home-header">
        <p>
          Seleccionar la forma de ingreso
        </p>
        <a href='/my_rooms' class='button'>Modo Usuario</a>
        <a href='/admin' class='button'>Modo Administrador</a>
      </header>
    </div>
  );
}

export default Home;
