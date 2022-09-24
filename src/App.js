import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

function App() {

  const navigate = useNavigate();

  return (
    <div>
        <Button className='primary' onClick={() => navigate('/login')}>Ingresar</Button>
        <Button className='primary' onClick={() => navigate('/users')}>Crear cuenta</Button>
    </div>
  );
}

export default App;
