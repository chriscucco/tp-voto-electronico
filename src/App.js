import { useNavigate } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import { buttonWidth, topMargin } from './CommonStyles'
import Logo from './logo.png'

function App() {

  const navigate = useNavigate();

  return (
    <div>
      <Row gutter={[24, 24]} align='middle'>
        <Col span={24} align='middle'>
          <img src={Logo} alt="Logo"/>
        </Col>
        <Col span={24} align='middle'>
          <Button type="primary" style={{ width: buttonWidth }} onClick={() => navigate('/login')}>Ingresar</Button>
        </Col>
        <Col span={24} align='middle'>
          <Button type="primary" style={{ width: buttonWidth }} onClick={() => navigate('/users')}>Crear cuenta</Button>
        </Col>
      </Row>
    </div>
  );
}

export default App;
