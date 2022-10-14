import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

function Home() {

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
      <header>
        <p>
          Seleccionar la forma de ingreso
        </p>
        <Button onClick={() => navigate('/my_rooms')}>Modo Usuario</Button>
        <Button className='primary' onClick={() => navigate('/admin')}>Modo Administrador</Button>
      </header>
    </div>
  );
}

export default Home;
