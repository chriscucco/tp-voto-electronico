import {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

function Admin() {

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status !== 200) {
       navigate('/login')
      }

      const data = await response.json()
      if (data.role !== 'admin') {
        navigate('/my_rooms')
      }
    }
    init();
  }, [navigate]);
  return (
    <div>
        <Button onClick={() => navigate('/add_admin')}>Dar permisos de Administrador</Button>
        <Button onClick={() => navigate('/add_room')}>Crear nuevo acto electoral</Button>
        <Button onClick={() => navigate('/add_list')}>Crear nueva lista</Button>
        <Button onClick={() => navigate('/add_candidate')}>Crear nuevo candidato</Button>
        <Button onClick={() => navigate('/add_voters')}>Agregar votantes a acto electoral</Button>
        <Button onClick={() => navigate('/add_list_to_room')}>Agregar listas a acto electoral</Button>
        <Button onClick={() => navigate('/home')}>Volver</Button>
    </div>
  );
}

export default Admin;
