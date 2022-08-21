import './Admin.css';
import {  useEffect } from 'react';

function Admin() {
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
    <div className="Admin">
      <header className="Admin-header">
        <a href='/add_admin' class='button'>Dar permisos de Administrador</a>
      </header>
    </div>
  );
}

export default Admin;
